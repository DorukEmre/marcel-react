import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { profileInactive } from '../assets/nav_icons'
import { addPhoto } from '../assets/icons'
import EasyCropperModal from '../components/EasyCropperModal'

const ProfileMe = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

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

  const handleCropCancel = async () => {
    setSelectedFile(null)
    setCroppedImage(null)
    handleCloseModal()
  }

  const handleCropSave = async (e) => {
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

    try {
      // axios.post(url[, data[, config]])
      // const response = await axiosPrivate.post(
      //   'api/profile/changePicture',
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //     signal: controller.signal,
      //   },
      // )
      // console.log('response?.data', response?.data)

      isMounted && setSelectedFile(null)
      isMounted && setCroppedImage(null)
      handleCloseModal()
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
    }
  }

  return (
    <main id="my-profile-page">
      <section className="profile-pic-header-container">
        <h1>User name</h1>
        <div className="profile-pic-image-container">
          <img src={profileInactive} alt="profile-pic" height="200" />
          <div className="file-upload-container--button-wrapper">
            <label htmlFor="imageUpload">
              <button
                htmlFor="imageUpload"
                id="custom-file-upload-button"
                type="button"
              >
                <img
                  src={addPhoto}
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
            </label>
          </div>
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
          buttonText="Save"
          setCroppedImage={setCroppedImage}
        />
      </section>
      <section className="my-pictures">My pictures</section>
      <section className="my-groups">My groups</section>
    </main>
  )
}

export default ProfileMe
