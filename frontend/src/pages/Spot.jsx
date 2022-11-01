import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import EasyCropperModal from '../components/EasyCropperModal'
import { SnapACatLogo } from '../assets/images'
import { deleteIcon, galleryIcon } from '../assets/icons'

const Spot = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  const modalRef = useRef()

  const [catName, setCatName] = useState('')
  const [comment, setComment] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const [croppedImage, setCroppedImage] = useState(null)

  const onSelectFile = (event) => {
    // console.log('event.target.files', event.target.files)
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.addEventListener('load', () => {
        setSelectedFile(reader.result)
      })
    }
  }

  const handleCropSave = async () => {
    setSelectedFile(null)
    handleCloseModal()
  }

  const handleCropCancel = async () => {
    setSelectedFile(null)
    setCroppedImage(null)
    handleCloseModal()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let isMounted = true
    const controller = new AbortController()
    const formData = new FormData()
    // formData.append(name, value)
    await fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        // console.log(blob)
        formData.append('file', blob)
      })
    // formData.append('file', croppedImage)
    formData.append('catName', catName)
    formData.append('comment', comment)

    try {
      // axios.post(url[, data[, config]])
      const response = await axiosPrivate.post(
        'api/posts/createPost',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          signal: controller.signal,
        },
      )
      // console.log('response?.data', response?.data)

      isMounted && setCatName('')
      isMounted && setComment('')
      isMounted && setCroppedImage(null)
      navigate('/feed')
    } catch (err) {
      console.error('Login again err', err)
      if (!err?.response) {
        console.log('No Server Response')
      } else if (err.response?.status === 403) {
        navigate('/login', { state: { from: location }, replace: true })
      } else {
        console.log('Request failed')
      }
    }

    return () => {
      isMounted = false
      controller.abort()
      navigate('/feed')
    }
  }

  return (
    <main id="spot-page">
      <section className="spot-container">
        <section className="form-panel">
          <h2>Snap a cat</h2>
          <form onSubmit={handleSubmit}>
            {!croppedImage ? (
              <>
                <div className="file-upload-container">
                  <div className="file-upload-container--button-wrapper">
                    <label htmlFor="imageUpload">
                      <button
                        htmlFor="imageUpload"
                        id="custom-file-upload-button"
                        type="button"
                      >
                        <img
                          src={galleryIcon}
                          className="custom-file-upload-button--image"
                        />
                        <input
                          type="file"
                          id="imageUpload"
                          className="custom-file-upload-button--input"
                          accept="image/*"
                          tabIndex="-1"
                          required
                          onChange={(event) => {
                            onSelectFile(event)
                            handleOpenModal()
                          }}
                        />
                      </button>
                      Add a file
                    </label>
                  </div>
                  <div className="file-upload-container--spot-logo-container">
                    <img src={SnapACatLogo} alt="cat logo" />
                  </div>
                  <div className="file-upload-container--right"></div>
                </div>
              </>
            ) : (
              <>
                <output id="crop-thumbnail-container" htmlFor="imageUpload">
                  <div className="crop-thumbnail--wrapper">
                    <img
                      src={croppedImage}
                      alt="Cropped image"
                      className="crop-thumbnail--image"
                    />
                    <div
                      className="crop-thumbnail--delete"
                      onClick={() => setCroppedImage(null)}
                      tabindex="0"
                    >
                      <img src={deleteIcon} alt="Delete cropped image" />
                    </div>
                  </div>
                </output>
                <div className="form-group">
                  <label htmlFor="catName">Add a cat name (or nickname)</label>
                  <input
                    type="text"
                    id="catName"
                    // placeholder="Add a cat name (or nickname)"
                    onChange={(e) => setCatName(e.target.value)}
                    value={catName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Add a comment</label>
                  <input
                    id="comment"
                    // placeholder="Add a comment"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                </div>
                <div className="form-group file-upload-wrapper"></div>
                <button>Submit</button>
              </>
            )}
            <EasyCropperModal
              image={selectedFile}
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              handleCropSave={handleCropSave}
              handleCropCancel={handleCropCancel}
              className="crop-modal"
              modalMsg="some text"
              displayButton={true}
              buttonClass="close-modal"
              buttonText="OK"
              setCroppedImage={setCroppedImage}
            />
          </form>
        </section>
      </section>
    </main>
  )
}

export default Spot
