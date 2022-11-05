import { closeIcon } from '../assets/icons'

const CatInfoBox = ({ info, handleClose }) => {
  return (
    <div className="cat-info">
      <div className="cat-info--header-container">
        <div className="cat-info--header-text">
          <p className="cat-info--catName">{info.catName}</p>
          <p className="cat-info--caption">{info.caption}</p>
        </div>
        <button
          className="cat-info--close-button close-button"
          onClick={handleClose}
        >
          <img src={closeIcon} alt="" height="24px" width="24px" />
        </button>
      </div>
      <div className="cat-info--image-container">
        <img
          src={
            info.imageUrl.slice(0, 49) +
            '/w_200,h_200,c_scale' +
            info.imageUrl.slice(49)
          }
          alt=""
          height="200"
          width="200"
        />
      </div>
    </div>
  )
}

export default CatInfoBox
