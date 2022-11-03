import React from "react";
import {
    YMaps,
    YMapsApi,
    Map,
    Circle,
    Polygon,
    withYMaps,
    Placemark,
    Rectangle,
} from "react-yandex-maps";
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import styles from "../../styles/Map.module.scss";
import {MapSlider} from "./MapSlider";
import {ReferenceCard} from "./ReferenceCard";

type Props = {};


class TemplateProvider extends React.Component {
    constructor() {
        // @ts-ignore
        super();
        this.state = {template: null};
    }

    componentDidMount() {
        console.log("TemplateProvider componentDidMount", this.props.ymaps);
        // @ts-ignore
        this.setState({
            template: this.props.ymaps.templateLayoutFactory.createClass(
                '<div class="popover top">' +
                '<a class="close" href="#">&times;</a>' +
                '<div class="arrow"></div>' +
                '<div class="popover-inner">' +
                '$[[properties.content observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
                '</div>' +
                '</div>',
                {
                    build: function () {
                        this.constructor.superclass.build.call(this);
                    }
                }
            ),
        });


        // @ts-ignore
        const MyBalloonContentLayout = this.props.ymaps.templateLayoutFactory.createClass(
            '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
            '<div class="popover-content">$[properties.balloonContent]</div>'
        )


        // // Создание метки с пользовательским макетом балуна.
        // // @ts-ignore
        // const myPlacemark = this.props.ymaps.Placemark([55.8, 37.6], {
        //     balloonContent: 'Содержимое балуна',
        //     balloonHeader: 'Заголовок',
        //     balloonFooter: 'Подвал'
        // }, {
        //     balloonContentLayout: MyBalloonContentLayout,
        //     balloonPanelMaxMapArea: 0
        // });
        //
        // // @ts-ignore
        // this.props.ymaps.geoObjects.add(myPlacemark);
    }


    render() {
        // @ts-ignore
        return this.props.children({template: this.state.template});
    }
}

const ConnectedTemplateProvider = withYMaps(TemplateProvider, true, [
    'templateLayoutFactory',
]);


export default function Maps(props: Props) {
    const [open, setOpen] = React.useState(false);
    const [ymaps, setYmaps] = React.useState<any>();


    const theme = useTheme();

    // @ts-ignore
    return (
        <Box>
            <MapSlider/>
            <ReferenceCard/>

            {/* Map */}
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    zIndex: 0,
                }}
            >
                <YMaps onLoad={(ymaps: any) => console.log('loaded YMaps', ymaps)} instanceRef={(ref: any) => {
                    console.log('instanceRef YMaps', ref);
                }}>
                    <ConnectedTemplateProvider>
                        {({template}) => (
                            <Map

                                defaultState={{center: [55.75, 37.57], zoom: 9}}
                                width="100%"
                                height="100vh"
                                options={{
                                    suppressMapOpenBlock: true,
                                    suppressObsoleteBrowserNotifier: true,
                                }}
                            >
                                <Placemark
                                    geometry={[55.75, 37.57]}
                                    properties={{
                                        balloonContent: 'Содержимое балуна',
                                        balloonHeader: 'Заголовок',
                                        balloonFooter: 'Подвал',
                                        content: '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
                                            '<div class="popover-content">$[properties.balloonContent]</div>'
                                    }}

                                    options={{
                                        balloonContentLayout: template,
                                        iconLayout: template,


                                    }}
                                    // Load balloon addon for all geo objects
                                    modules={['geoObject.addon.balloon']}
                                />
                            </Map>
                        )}
                    </ConnectedTemplateProvider>
                </YMaps>
            </Box>
        </Box>
    );
}
