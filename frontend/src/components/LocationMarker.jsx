import { pinIcon } from '../assets/icons'

const LocationMarker = ({ lat, lng, imageUrl, onClick }) => {
  return (
    <div className="marker-container" onClick={onClick}>
      <img src={pinIcon} className="marker-container--icon" alt="" />
      <img src={imageUrl} className="marker-container--cat" alt="" />
    </div>
  )
}

export default LocationMarker
