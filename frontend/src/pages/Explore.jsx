import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import CropperModal from '../components/CropperModal'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Explore = () => {
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  function handleCropSave(params) {
    alert('well done')
    handleCloseModal()
  }

  return (
    <article style={{ padding: '100px' }}>
      <h1>Explore page</h1>
      <div className="">
        <Link to="/">Visit Our Homepage</Link>
        <br />
        <br />
        <div>
          <button onClick={handleOpenModal}>Open cropper</button>
          <CropperModal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            handleCropSave={handleCropSave}
            className="crop-modal"
            modalMsg="some text"
            displayButton={true}
            buttonClass="close-modal"
            buttonText="OK"
          />
        </div>
      </div>
    </article>
  )
}

export default Explore
