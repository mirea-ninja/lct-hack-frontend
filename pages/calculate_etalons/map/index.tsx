import React from "react";
import { YMaps, Map, withYMaps, Placemark } from "react-yandex-maps";
import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/IconButton";
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

type Props = {};

class TemplateProvider extends React.Component {
  constructor() {
    // @ts-ignore
    super();
    this.state = { template: null };
  }

  componentDidMount() {
    // Ждём загрузки модуля
    const interval = setInterval(() => {
      if (!this.state.ready) {
        // Когда загрузился модуль
        if (this.props.ymaps.hasOwnProperty("Map")) {
          const MyBalloonContentLayout =
            this.props.ymaps.templateLayoutFactory.createClass(
              '<div class="popover-content">$[properties.content]</div>'
            );
          this.setState({ template: MyBalloonContentLayout, ready: true });
          clearInterval(interval);
        }
      }
    }, 300);
  }

  render() {
    // @ts-ignore
    return this.props.children({ template: this.state.template });
  }
}

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

type ZoomButtonProps = {
  onClick: () => void;
  icon: JSX.Element;
};

const ZoomButton = (props: ZoomButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        color: theme.palette.primary.main,
        padding: "5px",
        "&:hover": {
          background: "transparent",
        },
      }}
      onClick={props.onClick}
    >
      {props.icon}
    </Button>
  );
};

const Maps = observer(({}: Props) => {
  const theme = useTheme();
  const store = useStore();
  const apiClient = useApiClient();

  console.log("MAPS LOADED WITH STATE:", toJS(store.queryGetData));

  // Запрос в парсер (parser в api)
  const { mutate, isLoading, isError, isSuccess } = useMutation({
    mutationFn: async (query: SearchBase) => {
      console.log("QUERY", query);
      const response = await apiClient.parser.parseParsePost(query);
      console.log("RESPONSE", response);

      return { subqueryGuid: query.subqueryId, response };
    },
    onSuccess: (data) => {
      console.log("SUCCESS DATA: ", data)
      
      const subquery = store.queryGetData?.subQueries.find(
        (subquery) => subquery.guid === data.subqueryGuid
      );
      if (subquery) {
        subquery.analogs = data.response.data;
        console.log("UPDATED SUBQUERY", toJS(store.queryGetData));
      }
    },
  });

  const mapRef = React.useRef(null);

  React.useEffect(() => {
    console.log("STORE: ", store);
    if (store.queryGetData?.subQueries) {
      for (const subQuery of store.queryGetData.subQueries) {
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

          mutate(data);
        }
      }
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
        address="ул. Ленина, 1"
        price={1000000}
        buildingType="Современное жилье"
        floors={22}
        walls="панель"
        floor={1}
        area={100}
        kitchenArea={10}
        hasBalcony={true}
        toMetro={10}
        repairType="муниципальный ремонт"
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

      <MapFilter />

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
            {({ template }) => (
              <Map
                instanceRef={mapRef}
                defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                width="100%"
                height="100vh"
                options={{
                  suppressMapOpenBlock: true,
                  suppressObsoleteBrowserNotifier: true,
                }}
              >
                <Placemark
                  geometry={[55.8, 37.6]}
                  properties={{
                    content: getTagsTemplate({
                      title: "Ватутина, 24",
                      subtitle: "244 054 ₽ м²",
                      tags: [
                        "1 этаж",
                        "S 45 м²",
                        "S кухня 10 м²",
                        "нет балкона",
                        "10 мин. до метро",
                        "муниципальный ремонт",
                      ],
                    }),
                    title: "Ватутина, 24",
                  }}
                  options={{
                    // Применяем шаблон
                    balloonContentLayout: template,
                    balloonPanelMaxMapArea: 0,

                    iconLayout: "default#image",
                    iconImageHref: "/placemark.svg",
                    iconImageSize: [18, 22],
                  }}
                  modules={["geoObject.addon.balloon"]}
                />
              </Map>
            )}
          </ConnectedTemplateProvider>
        </YMaps>
      </Box>
    </Box>
  );
});

export default Maps;
