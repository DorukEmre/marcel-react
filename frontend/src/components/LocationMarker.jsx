import { Icon } from '@iconify/react'
import catIcon from '@iconify/icons-mdi/cat'

const LocationMarker = ({ lat, lng, onClick }) => {
  return (
    <div className="location-marker" onClick={onClick}>
      <Icon icon={catIcon} className="location-icon" />
    </div>
  )
}

export default LocationMarker
