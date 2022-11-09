import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import EasyCropperModal from '../components/EasyCropperModal'
import { SnapACatLogo } from '../assets/images'
import { deleteIcon, galleryIcon } from '../assets/icons'
import exifr from 'exifr'
import BasicModal from '../components/BasicModal'

const Spot = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  const [sendingFile, setSendingFile] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const [selectedFile, setSelectedFile] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [catName, setCatName] = useState('')
  const [comment, setComment] = useState('')
  const [gps, setGps] = useState({})
  const [showLocation, setShowLocation] = useState(true)

  const getExif = async ({
    target: {
      files: [file],
    },
  }) => {
    if (file && file.name) {
      let output = await exifr.parse(file)

      if (
        Number.isFinite(Number(output.longitude)) &&
        Number.isFinite(Number(output.latitude))
      ) {
        setGps({ longitude: output.longitude, latitude: output.latitude })
      } else {
        setGps({ longitude: 'undefined', latitude: 'undefined' })
      }
    }
  }

  const onSelectFile = (event) => {
    // console.log('event.target.files', event.target.files)
    // console.log('event.target.files[0]', event.target.files[0])
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
    setGps({})
    handleCloseModal()
  }

  const handleCropDelete = async () => {
    setCroppedImage(null)
    setGps({})
    setShowLocation(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSendingFile(true)
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
    formData.append('longitude', gps.longitude)
    formData.append('latitude', gps.latitude)
    let checkShowLocation =
      typeof gps.longitude === 'number' &&
      typeof gps.latitude === 'number' &&
      showLocation === true
        ? true
        : false
    formData.append('showLocation', checkShowLocation)

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
      isMounted && setGps({})
      setSendingFile(false)
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
          <h1>Snap a cat</h1>
          <form onSubmit={handleSubmit}>
            {!croppedImage ? (
              <>
                <div className="file-upload-container">
                  <div className="file-upload-container--button-wrapper">
                    <label
                      htmlFor="imageUpload"
                      className="file-upload-container--label"
                    >
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
                            getExif(event)
                            onSelectFile(event)
                            handleOpenModal()
                          }}
                        />
                      </button>
                      Add a photo
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
                      onClick={handleCropDelete}
                      tabIndex="0"
                    >
                      <img src={deleteIcon} alt="Delete cropped image" />
                    </div>
                  </div>
                </output>
                {/* <div className="form-group">
                  <label htmlFor="catName">Add a cat name (or nickname)</label>
                  <input
                    type="text"
                    id="catName"
                    // placeholder="Add a cat name (or nickname)"
                    onChange={(e) => setCatName(e.target.value)}
                    value={catName}
                  />
                </div> */}
                <div className="form-group">
                  <label htmlFor="comment">Add a comment</label>
                  <input
                    type="text"
                    id="comment"
                    // placeholder="Add a comment"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="show-location" className="location-switch">
                    {typeof gps.latitude !== 'number' ||
                    typeof gps.longitude !== 'number' ? (
                      <p>No location data available for this picture</p>
                    ) : (
                      <>
                        <p className="location-switch--text">
                          Make location visible
                        </p>
                        <div className="location-switch-checkbox-wrapper">
                          <input
                            id="show-location"
                            type="checkbox"
                            className="location-switch--checkbox"
                            onChange={(e) => {
                              setShowLocation(e.target.checked)
                            }}
                            checked={showLocation}
                          />
                          <span className="location-switch--slider"></span>
                        </div>
                      </>
                    )}
                  </label>
                </div>
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
              buttonText="Crop"
              setCroppedImage={setCroppedImage}
            />
          </form>
        </section>
      </section>
      {sendingFile && (
        <BasicModal
          openModal={sendingFile}
          handleCloseModal={() => sendingFile(false)}
          className="sending-file-modal confirmation-modal"
          modalMsg="File uploading"
          displayButton={false}
          displayAnimation={true}
        ></BasicModal>
      )}
    </main>
  )
}

export default Spot
