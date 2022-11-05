import { useState } from 'react'
import GoogleMapReact from 'google-map-react'

const Map = ({ center, zoom }) => {
  const URLKey =
    process.env.NODE_ENV === 'production'
      ? import.meta.env.VITE_GM_KEY_PROD
      : import.meta.env.VITE_GM_KEY_DEV

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: URLKey }}
        defaultCenter={center}
        defaultZoom={zoom}
      ></GoogleMapReact>
    </div>
  )
}

Map.defaultProps = {
  center: {
    lat: 51.4569,
    lng: -0.0963,
  },
  zoom: 14,
}

export default Map
