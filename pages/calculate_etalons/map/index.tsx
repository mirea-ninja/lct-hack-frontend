import React from "react";
import { YMaps, Map, withYMaps, Placemark, Circle } from "react-yandex-maps";
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
import { ApartmentGet } from "../../../apiConnection/gen";

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

const getSubqueryByGuid = (guid: string, subqueries: any[]) => {
  return subqueries.find((subquery) => subquery.guid === guid);
};

const getOnlyValidAnalogs = (analogs: ApartmentBase[] | ApartmentGet[]) => {
  return analogs.filter((analog) => {
    return (
      analog.address !== null &&
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

const Maps = observer(({}: Props) => {
  const theme = useTheme();
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

  const [hiddenAnalogs, setHiddenAnalogs] = React.useState<any[]>([]);

  console.log("MAPS LOADED WITH STATE:", toJS(store.queryGetData));

  const mapRef = React.useRef(null);

  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: async (query: SearchBase[]) => {
      const result = [];

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

        const analogs = analogsRes.data;
        const validAnalogs = getOnlyValidAnalogs(analogs);

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
    if (store.queryGetData?.subQueries) {
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
    }
  }, [store.queryGetData]);

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

      {isSuccess && (
        <MapSlider
        // data={store.queryGetData}
        // onSliderChange={(value) => {
        //   store.setQueryGetData(value);
        // }}
        />
      )}
      <ReferenceCard
        isExpanded={true}
        address={store.queryGetData?.subQueries[0]?.standartObject?.address}
        price={store.queryGetData?.subQueries[0]?.standartObject?.m2price}
        buildingType={store.queryGetData?.subQueries[0]?.standartObject?.segment}
        floors={store.queryGetData?.subQueries[0]?.standartObject?.floors}
        walls={store.queryGetData?.subQueries[0]?.standartObject?.walls}
        floor={store.queryGetData?.subQueries[0]?.standartObject?.floor}
        area={store.queryGetData?.subQueries[0]?.standartObject?.apartmentArea}
        kitchenArea={store.queryGetData?.subQueries[0]?.standartObject?.kitchenArea}
        hasBalcony={store.queryGetData?.subQueries[0]?.standartObject?.hasBalcony}
        toMetro={store.queryGetData?.subQueries[0]?.standartObject?.distanceToMetro}
        repairType={store.queryGetData?.subQueries[0]?.standartObject?.quality}
      />

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
              <Map
                instanceRef={mapRef}
                defaultState={{
                  center: [
                    store.queryGetData?.subQueries[0]?.standartObject!.lat,
                    store.queryGetData?.subQueries[0]?.standartObject!.lon],
                  zoom: 14
                }}
                width="100%"
                height="100vh"
                options={{
                  suppressMapOpenBlock: true,
                  suppressObsoleteBrowserNotifier: true,
                }}
              >
                {isSuccess &&
                  showAnalogs &&
                  getSubqueryByGuid(
                    selectedSubQuery,
                    store.queryGetData!.subQueries
                  ).analogs.map(
                    (analog: {
                      lat: number;
                      lon: number;
                      address: any;
                      price: any;
                      floor: any;
                      apartmentArea: any;
                      kitchenArea: any;
                      hasBalcony: any;
                      distanceToMetro: any;
                      quality: any;
                    }) => (
                      <Placemark
                        geometry={[analog.lat, analog.lon]}
                        properties={{
                          content: getTagsTemplate({
                            title: analog.address,
                            subtitle: `${analog.price} ₽`,
                            tags: [
                              `${analog.floor} этаж`,
                              `S ${analog.apartmentArea} м²`,
                              `S кухня ${analog.kitchenArea} м²`,
                              analog.hasBalcony ? "есть балкон" : "нет балкона",
                              `${analog.distanceToMetro} мин. до метро`,
                              analog.quality,
                            ],
                          }),
                          title: analog.address,
                        }}
                        options={{
                          // Применяем шаблон
                          balloonContentLayout: template,
                          balloonPanelMaxMapArea: 0,

                          iconLayout: "default#image",
                          iconImageHref: "/placemark.svg",
                          iconImageSize: [18, 22],
                          iconImageOffset: [-9, -22],
                        }}
                        modules={["geoObject.addon.balloon"]}
                      />
                    )
                  )}

                {isSuccess &&
                  showEtalon &&
                  store.queryGetData!.subQueries.map(
                    (subQuery) =>
                      subQuery.guid === selectedSubQuery && (
                        <Placemark
                          geometry={[
                            subQuery.standartObject!.lat,
                            subQuery.standartObject!.lon,
                          ]}
                          properties={{
                            content: getTagsTemplate({
                              title: subQuery.standartObject!.address,
                              subtitle: "",
                              tags: [
                                `${subQuery.standartObject!.floor} этаж`,
                                `S ${
                                  subQuery.standartObject!.apartmentArea
                                } м²`,
                                `S кухня ${
                                  subQuery.standartObject!.kitchenArea
                                } м²`,
                                subQuery.standartObject!.hasBalcony
                                  ? "есть балкон"
                                  : "нет балкона",
                                `${
                                  subQuery.standartObject!.distanceToMetro
                                } мин. до метро`,
                                subQuery.standartObject!.quality,
                              ],
                            }),
                            title: subQuery.standartObject!.address,
                          }}
                          options={{
                            // Применяем шаблон
                            balloonContentLayout: template,
                            balloonPanelMaxMapArea: 0,

                            iconLayout: "default#image",
                            iconImageHref: "/etalon-placemark.svg",

                            iconImageSize: [18, 22],
                            iconImageOffset: [-9, -22],
                          }}
                          modules={["geoObject.addon.balloon"]}
                        />
                      )
                  )}

                {/* Отрисовка маркера после подсчёта формы */}
                {iconShape && iconShape.length && (
                  <Placemark
                    geometry={[55.8, 37.6]}
                    properties={{
                      content: getTagsTemplate({
                        title: "Адрес",
                        subtitle: "",
                        tags: [
                          ` этаж`,
                          `S м²`,
                          `S кухня м²`,
                          "есть балкон",
                          "нет балкона",
                          `мин. до метро`,
                          "qweqwe",
                        ],
                      }),
                      title: "Адрес",
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
                )}

                {!iconShape && (
                  <Placemark
                    geometry={[55.8, 37.6]}
                    properties={{
                      content: getTagsTemplate({
                        title: "Адрес",
                        subtitle: "",
                        tags: [
                          ` этаж`,
                          `S м²`,
                          `S кухня м²`,
                          "есть балкон",
                          "нет балкона",
                          `мин. до метро`,
                          "qweqwe",
                        ],
                      }),
                      title: "Адрес",
                    }}
                    options={{
                      // Применяем шаблон
                      balloonContentLayout: template,
                      balloonPanelMaxMapArea: 0,

                      iconLayout: iconTemplate,
                    }}
                    modules={["geoObject.addon.balloon"]}
                  />
                )}

                {isSuccess && showSearchArea && (
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
                      strokeColor: "#0385d2",
                      strokeOpacity: 0.3,
                      strokeWidth: 3,

                      strokeStyle: "10 10",
                    }}
                  />
                )}
              </Map>
            )}
          </ConnectedTemplateProvider>
        </YMaps>
      </Box>
    </Box>
  );
});

export default Maps;
