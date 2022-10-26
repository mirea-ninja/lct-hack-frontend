import React from "react"
import { YMaps, Map } from "react-yandex-maps"

type Props = {}

export default function MapsPage({}: Props) {
  return (
    <YMaps>
      <Map
        defaultState={{
          center: [55.751574, 37.573856],
          zoom: 9,
        }}
        width={"80%"}
        height={"80%"}
      />
      <Circle fillColor="red" center={{ lat: 50, lon: 50 }} radius={300} />
      <Polyline
        strokeColor="green"
        strokeWidth
        points={[
          { lat: 50, lon: 50 },
          { lat: 50, lon: 20 },
          { lat: 20, lon: 20 },
        ]}
      />
    </YMaps>
  )
}
