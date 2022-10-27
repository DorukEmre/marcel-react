import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { MarcelFileUpload, SnapACatLogo } from '../assets/images'

const Spot = () => {
  return (
    <main id="spot-page">
      <section className="spot-container">
        <div className="spot-logo-container">
          <img src={SnapACatLogo} alt="cat logo" />
        </div>
        <section className="form-panel">
          <h2>Snap a cat</h2>
          <form
            action="/posts/createPost"
            encType="multipart/form-data"
            method="POST"
          >
            <div className="form-group">
              <label htmlFor="catName">
                Name of the cat (or your best nickname)
              </label>
              <input
                type="text"
                id="catName"
                name="catName"
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="comment">Add a comment</label>
              <textarea
                id="comment"
                name="comment"
                placeholder="Add a comment"
              ></textarea>
            </div>

            <div className="form-group file-upload-wrapper">
              <div>
                <label htmlFor="imageUpload">Add a file</label>
                <button
                  htmlFor="imageUpload"
                  id="custom-file-upload"
                  type="button"
                >
                  <img src={MarcelFileUpload} alt="" height="75" width="75" />
                  <input
                    type="file"
                    id="imageUpload"
                    name="file"
                    accept="image/*"
                    tabIndex="-1"
                  />
                </button>
              </div>
              <output id="file-list" htmlFor="imageUpload"></output>
            </div>

            <button type="submit" value="Upload">
              Submit
            </button>
          </form>
        </section>
      </section>
    </main>
  )
}

export default Spot
