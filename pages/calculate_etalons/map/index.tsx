import React from "react";
import {
    YMaps,
    Map,
    withYMaps,
    Placemark,
} from "react-yandex-maps";
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";

import MapSlider from "../../../components/map/MapSlider";
import ReferenceCard from "../../../components/map/ReferenceCard";
import Header from "../../../components/main/Header"


type Props = {};


class TemplateProvider extends React.Component {
    constructor() {
        // @ts-ignore
        super();
        this.state = {template: null};
    }

    componentDidMount() {
        // Ждём загрузки модуля
        const interval = setInterval(() => {
            if (!this.state.ready) {
                // Когда загрузился модуль
                if (this.props.ymaps.hasOwnProperty('Map')) {
                    const MyBalloonContentLayout = this.props.ymaps.templateLayoutFactory.createClass(
                        '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
                        '<div class="popover-content">$[properties.balloonContent]</div>'
                    )
                    this.setState({template: MyBalloonContentLayout, ready: true})
                    clearInterval(interval)
                }
            }
        }, 300);
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
    const theme = useTheme();

    // @ts-ignore
    return (
        <Box sx={{overflowX: "hidden", overflowY: "hidden"}}>
            <Header/>
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
                <YMaps>
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
                                    geometry={[55.8, 37.6]}
                                    properties={{
                                        balloonContent: 'Содержимое балуна',
                                        balloonHeader: 'Заголовок',
                                        balloonFooter: 'Подвал'
                                    }}


                                    options={{
                                        // Применяем шаблон
                                        balloonContentLayout: template,
                                        balloonPanelMaxMapArea: 0,

                                        iconLayout: 'default#image',
                                        iconImageHref: '/placemark.svg',
                                        iconImageSize: [18, 22],
                                    }}
                                    modules={["geoObject.addon.balloon"]}/>
                            </Map>
                        )}
                    </ConnectedTemplateProvider>
                </YMaps>
            </Box>
        </Box>
    );
}
