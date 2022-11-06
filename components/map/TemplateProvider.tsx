import React from "react";

type Props = {};

// export const TemplateProvider = (props: Props) => {
//   const [template, setTemplate] = React.useState(null);
//   const [ready, setReady] = React.useState(false);

//   React.useEffect(() => {
//     // Ждём загрузки модуля
//     const interval = setInterval(() => {
//       if (!ready) {
//         // Когда загрузился модуль
//         // @ts-ignore
//         if (props.ymaps.hasOwnProperty("Map")) {
//           // @ts-ignore
//           const MyBalloonContentLayout =
//             props.ymaps.templateLayoutFactory.createClass(
//               '<div class="popover-content">$[properties.content]</div>'
//             );
//           setTemplate(MyBalloonContentLayout);
//           setReady(true);
//           clearInterval(interval);
//         }
//       }
//     }, 300);
//   }, []);

//   // @ts-ignore
//   return props.children({ template: template });
// };

export class TemplateProvider extends React.Component {
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