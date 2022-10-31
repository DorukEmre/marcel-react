import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { MarcelFileUpload, SnapACatLogo } from '../assets/images'
import EasyCropperModal from '../components/EasyCropperModal'
import { deleteIcon } from '../assets/icons'

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
      isMounted && croppedImage(null)
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        console.log('No Server Response')
      } else {
        console.log('Request failed')
      }
    }

    return () => {
      isMounted = false
      controller.abort()
    }
  }

  return (
    <main id="spot-page">
      <section className="spot-container">
        <div className="spot-logo-container">
          <img src={SnapACatLogo} alt="cat logo" />
        </div>
        <section className="form-panel">
          <h2>Snap a cat</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="catName">
                Name of the cat (or your best nickname)
              </label>
              <input
                type="text"
                id="catName"
                placeholder="Name"
                onChange={(e) => setCatName(e.target.value)}
                value={catName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comment">Add a comment</label>
              <textarea
                id="comment"
                placeholder="Add a comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
            </div>

            <div className="form-group file-upload-wrapper">
              <div>
                {!croppedImage && (
                  <>
                    <label htmlFor="imageUpload">Add a file</label>
                    <button
                      htmlFor="imageUpload"
                      id="custom-file-upload"
                      type="button"
                    >
                      <img
                        src={MarcelFileUpload}
                        alt=""
                        height="75"
                        width="75"
                      />
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        tabIndex="-1"
                        required
                        onChange={(event) => {
                          onSelectFile(event)
                          handleOpenModal()
                        }}
                      />
                    </button>
                  </>
                )}
              </div>
              <output id="cropped-image-list" htmlFor="imageUpload">
                {croppedImage && (
                  <>
                    <img
                      src={croppedImage}
                      alt="Cropped image"
                      height="100"
                      width="100"
                    />
                    <div
                      className="delete-crop"
                      onClick={() => setCroppedImage(null)}
                    >
                      <img src={deleteIcon} alt="" height="24px" width="24px" />
                    </div>
                  </>
                )}
              </output>
            </div>
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

            <button>Submit</button>
          </form>
        </section>
      </section>
    </main>
  )
}

export default Spot
