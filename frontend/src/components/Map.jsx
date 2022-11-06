import { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import CatInfoBox from './CatInfoBox'

const Map = ({
  catsWithLocation,
  setCatsWithLocation,
  center,
  zoom,
  currentUserId,
}) => {
  const [catInfo, setCatInfo] = useState(null)

  const URLKey =
    process.env.NODE_ENV === 'production'
      ? import.meta.env.VITE_GM_KEY_PROD
      : import.meta.env.VITE_GM_KEY_DEV

  const handleClose = () => {
    setCatInfo(null)
  }

  // console.log(catsWithLocation)
  const markers = catsWithLocation.map((cat, index) => {
    return (
      <LocationMarker
        key={index}
        lat={cat.latitude}
        lng={cat.longitude}
        imageUrl={cat.imageUrl}
        onClick={() => setCatInfo(cat)}
      />
    )
  })

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: URLKey }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={{ mapId: 'e3380fc948889a8' }}
      >
        {markers}
      </GoogleMapReact>
      {catInfo && (
        <CatInfoBox
          post={catInfo}
          setCatInfo={setCatInfo}
          setCatsWithLocation={setCatsWithLocation}
          handleClose={handleClose}
          currentUserId={currentUserId}
        />
      )}
    </div>
  )
}

Map.defaultProps = {
  center: {
    lat: 51.507543,
    lng: -0.084638,
  },
  zoom: 11,
}

export default Map
