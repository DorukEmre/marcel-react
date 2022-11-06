import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { profileInactive } from '../assets/nav_icons'
import { addPhoto } from '../assets/icons'
import EasyCropperModal from '../components/EasyCropperModal'
import useAuth from '../hooks/useAuth'

const ProfileMe = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  const [selectedFile, setSelectedFile] = useState(null)

  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => setOpenModal(false)

  const [croppedImage, setCroppedImage] = useState(null)
  const [profilePicUrl, setProfilePicUrl] = useState(null)
  const [username, setUsername] = useState(null)

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

  const handleCropSave = async (e, croppedImage) => {
    e.preventDefault()
    let isMounted = true
    const controller = new AbortController()

    // console.log(croppedImage)
    const formData = new FormData()
    await fetch(croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        // console.log(blob)
        formData.append('file', blob)
      })
    // formData.append(name, value)

    try {
      // axios.post(url[, data[, config]])
      const response = await axiosPrivate.put(
        'api/profile/updatePicture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          signal: controller.signal,
        },
      )
      console.log('response?.data', response?.data)

      isMounted && setSelectedFile(null)
      isMounted && setCroppedImage(null)
      isMounted && setProfilePicUrl(response.data.profilePicUrl)
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

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getMyProfile = async () => {
      try {
        const response = await axiosPrivate.get('/api/profile/getMyProfile', {
          signal: controller.signal,
        })
        const { username, profilePicUrl } = response.data
        // console.log('response.data', response.data)
        isMounted && setProfilePicUrl(profilePicUrl)
        isMounted && setUsername(username)
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
    }
    getMyProfile()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <main id="my-profile-page">
      <section className="profile-pic-header-container">
        <h1>{username}</h1>

        <div className="add-profile-pic-container">
          <div className="profile-pic-image-container">
            <div className="profile-pic-image-container--image">
              <img
                src={
                  profilePicUrl
                    ? profilePicUrl.slice(0, 49) +
                      '/w_300,h_300,c_scale' +
                      profilePicUrl.slice(49)
                    : profileInactive
                }
                alt="profile-pic"
                height="150"
              />
            </div>
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
          {!profilePicUrl ? <p>Add a profile picture</p> : null}
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
      <section className="my-pictures"></section>
      <section className="my-groups"></section>
    </main>
  )
}

export default ProfileMe
