import React from "react";
import {
  YMaps,
  Map as Ymap,
  withYMaps,
  Placemark,
  Circle,
} from "react-yandex-maps";
import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import MapSlider from "../../../components/map/MapSlider";
import ReferenceCard from "../../../components/map/ReferenceCard";
import Header from "../../../components/main/Header";
import MinusIcon from "../../../components/icons/MinusIcon";
import PlusIcon from "../../../components/icons/PlusIcon";
import MapFilter from "../../../components/map/MapFilter";
import { Modal } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useStore } from "../../../logic/DataStore";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { SearchBase } from "../../../apiConnection/parser/models/search-base";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApiClient } from "../../../logic/ApiClientHook";
import { TemplateProvider } from "../../../components/map/TemplateProvider";
import { ZoomButton } from "../../../components/map/ZoomButton";
import { Button } from "@mui/material";
import { ApartmentBase } from "../../../apiConnection/parser/models/apartment-base";
import { ApartmentGet, SubQueryGet } from "../../../apiConnection/gen";
import { CustomPlacemarkType } from "../../../components/map/CustomPlacemark";
import CustomPlacemark from "../../../components/map/CustomPlacemark";
import { AdjustmentGet } from "../../../apiConnection/gen/models/adjustment-get";

type Props = {};

const ConnectedTemplateProvider = withYMaps(TemplateProvider, true, [
  "templateLayoutFactory",
]);

const getTagTemplate = (tag: string) => {
  return `<div class="popover-tag">${tag}</div>`;
};

const getTagsTemplate = (data: any) => {
  const { title, subtitle, tags } = data;
  return `<div class="popover">
                <div class="popover-header">
                    <div class="popover-title">${title}</div>
                    <div class="popover-subtitle">${subtitle}</div>
                </div>
                <div class="popover-body">
                    <div class="popover-tags">
                        ${tags.map(getTagTemplate).join("")}
                    </div>
                </div>
            </div>`;
};

const getSubqueryByGuid = (guid: string, subqueries: SubQueryGet[]) => {
  return subqueries.find((subquery) => subquery.guid === guid);
};

const getOnlyValidAnalogs = (analogs: ApartmentBase[] | ApartmentGet[]) => {
  return analogs.filter((analog) => {
    return (
      analog.lat !== null &&
      analog.lon !== null &&
      analog.rooms !== null &&
      analog.segment !== null &&
      analog.floors !== null &&
      analog.walls !== null &&
      analog.floor !== null &&
      analog.apartmentArea !== null &&
      analog.kitchenArea !== null &&
      analog.distanceToMetro !== null &&
      analog.quality !== null
    );
  });
};

const getDistance = (
  a: { lat: number; lon: number },
  b: { lat: number; lon: number }
) => {
  const R = 6372795; // радиус Земли в метрах
  const lat1 = a.lat;
  const lat2 = b.lat;
  const lon1 = a.lon;
  const lon2 = b.lon;
  const cl1 = Math.cos((lat1 * Math.PI) / 180);
  const cl2 = Math.cos((lat2 * Math.PI) / 180);
  const sl1 = Math.sin((lat1 * Math.PI) / 180);
  const sl2 = Math.sin((lat2 * Math.PI) / 180);
  const delta = lon2 - lon1;
  const cdelta = Math.cos((delta * Math.PI) / 180);
  const sdelta = Math.sin((delta * Math.PI) / 180);

  const y = Math.sqrt(
    Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2)
  );
  const x = sl1 * sl2 + cl1 * cl2 * cdelta;
  const ad = Math.atan2(y, x);
  const dist = ad * R; // Расстояние между двумя координатами в метрах
  return Math.abs(dist);
};

function getAnalogsBySubquery(
  subquery: SubQueryGet,
  isSelected: boolean
): ApartmentGet[] {
  const analogs = isSelected
    ? subquery.selectedAnalogs
    : subquery.analogs!.filter(
        (analog) => !subquery.selectedAnalogs!.includes(analog)
      );

  const analogsJs = toJS(analogs)!;

  if (isSelected) {
    return [analogsJs[0]];
  } else {
    return analogs;
  }
}

const getApartmentTags = (analog: ApartmentBase | ApartmentGet) => {
  return [
    `${analog.floor} этаж`,
    `S ${analog.apartmentArea} м²`,
    `S кухня ${analog.kitchenArea} м²`,
    analog.hasBalcony ? "есть балкон" : "нет балкона",
    `${analog.distanceToMetro} мин. до метро`,
    analog.quality,
  ];
};

const Maps = observer(({}: Props) => {
  const store = useStore();
  const apiClient = useApiClient();

  const [selectedSubQuery, setSelectedSubQuery] = React.useState<string | null>(
    null
  );

  // Настройки карты
  const [showEtalon, setShowEtalon] = React.useState(true);
  const [showAnalogs, setShowAnalogs] = React.useState(true);
  const [showSearchArea, setShowSearchArea] = React.useState(true);
  const [showHiddenAnalogs, setShowHiddenAnalogs] = React.useState(true);

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  console.log("MAPS LOADED WITH STATE:", toJS(store.queryGetData));

  const mapRef = React.useRef(null);

  const caclAnalogs = useMutation({
    mutationFn: (params: { queryId: string; subqueryId: string }) => {
      return apiClient.subqueryApi.calculateAnalogsApiQueryIdSubquerySubidCalculateAnalogsPost(
        params.queryId,
        params.subqueryId
      );
    },
    onSuccess(data) {
      console.log(data.data);
      store.queryGetData = data.data;
    },
  });

  // Обновление карты (получение аналогов)
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: async (query: SearchBase[]) => {
      const result = [];
      const analogAdj = new Map<string, AdjustmentGet | undefined>();

      for (let i = 0; i < query.length; i++) {
        // Список всех аналогов для подзапроса
        let analogsResult = [];
        // Список выбранных аналогов для подзапроса (по которым будет строиться карта, только валидные)
        let selectedAnalogsResult = [];

        const item = query[i];

        // Парсинг аналогов. В момент парсинга парсер отправляет их на удалённый сервер и сохраняет для указанного подзапроса.
        const res = await apiClient.parser.parseParsePost(item);

        // Получаем аналоги с удалённого сервера
        const analogsRes =
          await apiClient.subqueryApi.getAnalogsApiQueryIdSubquerySubidAnalogsGet(
            item.queryId,
            item.subqueryId
          );

        let analogs = analogsRes.data;

        const filteredAnalogs = getOnlyValidAnalogs(analogs);

        const validAnalogs = filteredAnalogs.filter((analog) => {
          const standartObject = store.queryGetData?.subQueries.find(
            (subquery) => subquery.guid === item.subqueryId
          )?.standartObject;

          const distance = getDistance(
            { lat: analog.lat, lon: analog.lon },
            { lat: standartObject.lat, lon: standartObject.lon }
          );

          return distance <= 1000;
        });

        analogsResult.push(analogs);
        selectedAnalogsResult.push(validAnalogs);

        if (selectedAnalogsResult.length > 0) {
          // Выбираем аналоги на удалённом сервере. Выбранные аналоги будут использоваться для рассчётов
          await apiClient.subqueryApi.setAnalogsApiQueryIdSubquerySubidUserAnalogsPost(
            item.queryId,
            item.subqueryId,
            { guids: validAnalogs.map((el) => el.guid) }
          );
        }

        let queryGet =
          await apiClient.subqueryApi.calculateAnalogsApiQueryIdSubquerySubidCalculateAnalogsPost(
            item.queryId,
            item.subqueryId
          );

        analogs =
          getSubqueryByGuid(item.subqueryId, queryGet.data.subQueries)
            ?.analogs || analogs;

        selectedAnalogsResult =
          getSubqueryByGuid(item.subqueryId, queryGet.data.subQueries)
            ?.selectedAnalogs || selectedAnalogsResult;

        result.push({
          queryGuid: item.queryId,
          subqueryGuid: item.subqueryId,
          analogs: analogs,
          selectedAnalogs: selectedAnalogsResult,
        });
      }

      return result;
    },

    onSuccess: (data) => {
      const subqueries = store.queryGetData?.subQueries;

      if (subqueries) {
        data.forEach((item) => {
          const subquery = getSubqueryByGuid(item.subqueryGuid, subqueries);

          if (subquery) {
            subquery.analogs = item.analogs;
            subquery.selectedAnalogs = item.selectedAnalogs;
          }
        });
      }

      console.log("UPDATED SUBQUERY", toJS(store.queryGetData));
    },
    onError: (error) => {
      console.log("ERROR", error);
      setErrorMessage(error.response.data.errors);
    },
  });

  React.useEffect(() => {
    if (store.queryGetData === null) return;

    if (store.isAnalogsLoaded) {
      const subQeuryToSelect = store.queryGetData.subQueries[0].guid;
      
      // Возможно, что у подзапроса нет аналогов (поиск аналогв не был завершен/произведен
      // при предыдущем поиске). В таком случае их надо получить
      const subquery = getSubqueryByGuid(
        subQeuryToSelect!,
        store.queryGetData?.subQueries
      );
      
      setSelectedSubQuery(subQeuryToSelect);
      
      if (subquery !== undefined && subquery.analogs !== undefined) {
        if (subquery.analogs.length > 0) return;
      }
    }

    const subqieries = store.queryGetData.subQueries;

    if (subqieries.length == 0) {
      return;
    }

    const subquery = subqieries[0];
    setSelectedSubQuery(subquery.guid);

    const dataToQuery = [];

    for (const subQuery of subqieries) {
      const standartObject = subQuery.standartObject;
      if (standartObject) {
        const data = {
          address: standartObject.address,
          floors: standartObject.floors,
          rooms: standartObject.rooms,
          segment: standartObject.segment.toLowerCase(),
          walls: standartObject.walls!.toLowerCase(),
          radius: 1500,
          queryId: store.queryGetData.guid,
          subqueryId: subQuery.guid,
        };

        dataToQuery.push(data);
      }
    }

    mutate(dataToQuery);
    store.isAnalogsLoaded = true;
  }, [store.queryGetData]);

  console.log(getAnalogsBySubquery);

  // @ts-ignore
  return (
    <Box sx={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Modal
        open={isLoading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,

            background: "#FFFFFF",

            boxShadow: "0px 0px 23px rgba(5, 4, 39, 0.05)",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <CircularProgress />
          </Box>
          <Typography variant="h6" id="modal-modal-title" component="div">
            Ищем аналоги по вашему запросу. Это может занять какое-то время.
            Пожалуйста, подождите.
          </Typography>
        </Box>
      </Modal>

      {/* Всплывающее окно для отображения ошибок */}
      <Modal
        open={errorMessage != null}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => {
          setErrorMessage(null);
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,

            background: "#FFFFFF",

            boxShadow: "0px 0px 23px rgba(5, 4, 39, 0.05)",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <Typography variant="h6" id="modal-modal-title" component="div">
            {errorMessage}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setErrorMessage(null);
              }}
              sx={{
                boxShadow: "none",

                "&:hover": {
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                },
              }}
            >
              Закрыть
            </Button>
          </Box>
        </Box>
      </Modal>

      <Header stepProgress={3} />

      {/* Выдвижная панель слева со списком подзапросов и аналогов для них */}
      {(isSuccess || store.isAnalogsLoaded) &&
        store.queryGetData!.subQueries.map(
          (subQuery) =>
            subQuery.guid === selectedSubQuery && (
              <MapSlider
                onSelectedSubQueryChange={(guid) => {
                  setSelectedSubQuery(guid);
                }}
                selectedSubQuery={subQuery}
              />
            )
        )}

      {/* Карточка справа с информацией об эталонном объекте */}
      {(isSuccess || store.isAnalogsLoaded) &&
        store.queryGetData!.subQueries.map(
          (subQuery) =>
            subQuery.guid === selectedSubQuery && (
              <ReferenceCard
                isExpanded={true}
                address={subQuery.standartObject?.address}
                price={(
                  subQuery.selectedAnalogs.reduce((acc, item) => {
                    return acc + item.adjustment?.priceFinal;
                  }, 0) / subQuery.selectedAnalogs.length
                ).toFixed(0)}
                buildingType={subQuery.standartObject?.segment}
                floors={subQuery.standartObject?.floors}
                walls={subQuery.standartObject?.walls}
                floor={subQuery.standartObject?.floor}
                area={subQuery.standartObject?.apartmentArea}
                kitchenArea={subQuery.standartObject?.kitchenArea}
                hasBalcony={subQuery.standartObject?.hasBalcony}
                toMetro={subQuery.standartObject?.distanceToMetro}
                repairType={subQuery.standartObject?.quality}
              />
            )
        )}

      {/* Кнопки зума (+/-) справа экрана */}
      <Box
        sx={{
          position: "absolute",
          top: "57%",
          right: "30px",
          transform: "translateY(-50%)",
          zIndex: 1000,

          background: "#FFFFFF",
          boxShadow: "0px 0px 23px rgba(5, 4, 39, 0.05)",
          borderRadius: "10px",

          display: "flex",
          flexDirection: "column",
          gap: "5px",
          padding: "5px",

          minWidth: "40px",
          minHeight: "80px",
        }}
      >
        <ZoomButton
          onClick={() => mapRef.current.setZoom(mapRef.current.getZoom() + 1)}
          icon={<PlusIcon />}
        />
        <ZoomButton
          onClick={() => mapRef.current.setZoom(mapRef.current.getZoom() - 1)}
          icon={<MinusIcon />}
        />
      </Box>

      <MapFilter
        setShowEtalon={setShowEtalon}
        setShowAnalogs={setShowAnalogs}
        setShowSearchArea={setShowSearchArea}
        setShowHiddenAnalogs={setShowHiddenAnalogs}
      />

      {/* Map */}
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: "calc(100vh - 64px)",
          zIndex: 0,
        }}
      >
        <YMaps>
          <ConnectedTemplateProvider>
            {({ template, iconTemplate, iconShape }) => (
              <Ymap
                instanceRef={mapRef}
                defaultState={{
                  center: [
                    store.queryGetData?.subQueries[0]?.standartObject!.lat,
                    store.queryGetData?.subQueries[0]?.standartObject!.lon,
                  ],
                  zoom: 14,
                }}
                width="100%"
                height="100vh"
                options={{
                  suppressMapOpenBlock: true,
                  suppressObsoleteBrowserNotifier: true,
                }}
              >
                {/* Плейсмарки скрытых аналогов */}
                {(isSuccess || store.isAnalogsLoaded) &&
                  showHiddenAnalogs &&
                  getAnalogsBySubquery(
                    getSubqueryByGuid(
                      selectedSubQuery!,
                      store.queryGetData!.subQueries
                    )!,
                    false
                  ).map(
                    (analog) =>
                      analog && (
                        <CustomPlacemark
                          coords={[analog!.lat, analog!.lon]}
                          type={CustomPlacemarkType.HIDDEN}
                          title={analog.address}
                          subtitle={`${analog.price} ₽`}
                          tags={getApartmentTags(analog)}
                          template={template}
                          iconTemplate={iconTemplate}
                          iconShape={iconShape}
                        />
                      )
                  )}

                {/* Плейсмарк эталонного объекта */}
                {(isSuccess || store.isAnalogsLoaded) &&
                  showEtalon &&
                  store.queryGetData!.subQueries.map(
                    (subQuery) =>
                      subQuery.guid === selectedSubQuery && (
                        <CustomPlacemark
                          coords={[
                            subQuery.standartObject!.lat,
                            subQuery.standartObject!.lon,
                          ]}
                          type={CustomPlacemarkType.ETALON}
                          title={subQuery.standartObject!.address}
                          subtitle=""
                          tags={getApartmentTags(subQuery.standartObject!)}
                          template={template}
                          iconTemplate={iconTemplate}
                          iconShape={iconShape}
                        />
                      )
                  )}

                {/* Отрисовка маркера после подсчёта формы. Маркер для валидных аналогов */}
                {iconShape &&
                  iconShape.length &&
                  (isSuccess || store.isAnalogsLoaded) &&
                  showAnalogs &&
                  getSubqueryByGuid(
                    selectedSubQuery!,
                    store.queryGetData!.subQueries
                  )?.selectedAnalogs?.map(
                    (analog) =>
                      analog && (
                        <Placemark
                          geometry={[analog!.lat, analog!.lon]}
                          properties={{
                            content: getTagsTemplate({
                              title: analog!.address.replace("Москва, ", ""),
                              subtitle: `${analog.price} ₽`,
                              tags: getApartmentTags(analog),
                            }),
                            title: analog.address!.replace("Москва, ", ""),
                          }}
                          options={{
                            // Применяем шаблон
                            balloonContentLayout: template,
                            balloonPanelMaxMapArea: 0,

                            iconLayout: iconTemplate,
                            iconShape: {
                              type: "Rectangle",
                              coordinates: iconShape,
                            },
                          }}
                          modules={["geoObject.addon.balloon"]}
                        />
                      )
                  )}

                {/* Тоже маркер для валидных аналогов */}
                {!iconShape &&
                  (isSuccess || store.isAnalogsLoaded) &&
                  showAnalogs &&
                  getSubqueryByGuid(
                    selectedSubQuery!,
                    store.queryGetData!.subQueries
                  )?.selectedAnalogs?.map((analog) => (
                    <Placemark
                      geometry={[analog!.lat, analog!.lon]}
                      properties={{
                        content: getTagsTemplate({
                          title: analog!.address.replace("Москва, ", ""),
                          subtitle: "",
                          tags: getApartmentTags(analog),
                        }),
                        title: analog!.address.replace("Москва, ", ""),
                      }}
                      options={{
                        // Применяем шаблон
                        balloonContentLayout: iconTemplate,
                        balloonPanelMaxMapArea: 0,

                        iconLayout: iconTemplate,
                      }}
                      modules={["geoObject.addon.balloon"]}
                    />
                  ))}

                {/* Отображение поисковой области */}
                {(isSuccess || store.isAnalogsLoaded) && showSearchArea && (
                  <>
                    <Circle
                      geometry={[
                        [
                          getSubqueryByGuid(
                            selectedSubQuery,
                            store.queryGetData!.subQueries
                          ).standartObject.lat,
                          getSubqueryByGuid(
                            selectedSubQuery,
                            store.queryGetData!.subQueries
                          ).standartObject.lon,
                        ],
                        1000,
                      ]}
                      options={{
                        fillOpacity: 0,
                        // rgba(3, 140, 210, 0.2);
                        strokeColor: "#0385d2",
                        strokeOpacity: 0.3,
                        strokeWidth: 3,

                        strokeStyle: "10 10",
                      }}
                    />
                    <Circle
                      geometry={[
                        [
                          getSubqueryByGuid(
                            selectedSubQuery,
                            store.queryGetData!.subQueries
                          ).standartObject.lat,
                          getSubqueryByGuid(
                            selectedSubQuery,
                            store.queryGetData!.subQueries
                          ).standartObject.lon,
                        ],
                        1500,
                      ]}
                      options={{
                        fillOpacity: 0,
                        // rgba(3, 140, 210, 0.2);
                        strokeColor: "#FF4F4F",
                        strokeOpacity: 0.3,
                        strokeWidth: 3,

                        strokeStyle: "10 10",
                      }}
                    />
                  </>
                )}
              </Ymap>
            )}
          </ConnectedTemplateProvider>
        </YMaps>
      </Box>
    </Box>
  );
});

export default Maps;
