import React from "react";
import { YMaps, Map, withYMaps, Placemark } from "react-yandex-maps";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/IconButton";
import MapSlider from "../../../components/map/MapSlider";
import ReferenceCard from "../../../components/map/ReferenceCard";
import Header from "../../../components/main/Header";
import MinusIcon from "../../../components/icons/MinusIcon";
import PlusIcon from "../../../components/icons/PlusIcon";

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

const  getTagsTemplate = (data: any) => {
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
  icon: string;
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

export default function Maps(props: Props) {
  const theme = useTheme();

  const mapRef = React.useRef(null);

  // @ts-ignore
  return (
    <Box sx={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Header stepProgress={3}/>
      <MapSlider />
      <ReferenceCard
        isExpanded={true}
        address = "ул. Ленина, 1"
        price = {1000000}
        buildingType = "Современное жилье"
        floors = {22}
        walls = "панель"

        floor = {1}
        area = {100}
        kitchenArea = {10}
        hasBalcony = {true}
        toMetro = {10}
        repairType = "муниципальный ремонт"
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
          icon={<PlusIcon/>}
        />
        <ZoomButton
          onClick={() => mapRef.current.setZoom(mapRef.current.getZoom() - 1)}
          icon={<MinusIcon/>}
        />
      </Box>

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
}
