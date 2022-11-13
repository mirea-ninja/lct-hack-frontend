import { Placemark } from "react-yandex-maps";
export enum CustomPlacemarkType {
  HIDDEN = 0,
  ANALOG = 1,
  ETALON = 2,
}

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

export interface CustomPlacemarkProps {
  type: CustomPlacemarkType;
  coords: number[];
  title: string;
  subtitle: string;
  tags: string[];
  template: any;
  iconTemplate: any;
  iconShape: any;
}

export default function CustomPlacemark(props: CustomPlacemarkProps) {
  return (
    <Placemark
      geometry={[props.coords[0], props.coords[1]]}
      properties={{
        content: getTagsTemplate({
          title: props.title,
          subtitle: "",
          tags: props.tags,
        }),
        title: props.title,
      }}
      options={{
        // Применяем шаблон
        balloonContentLayout: props.template,
        balloonPanelMaxMapArea: 0,

        iconLayout:
          props.type != CustomPlacemarkType.ANALOG
            ? "default#image"
            : props.iconTemplate,
        iconImageHref:
          props.type == CustomPlacemarkType.ETALON
            ? "/etalon-placemark.svg"
            : props.type == CustomPlacemarkType.HIDDEN
            ? "/placemark.svg"
            : "/selected-placemark.svg",

        iconImageSize: [18, 22],
        iconImageOffset: [-9, -22],
      }}
      modules={["geoObject.addon.balloon"]}
    />
  );
}
