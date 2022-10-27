import { useEffect } from 'react'
import { catMainLogo } from '../assets/images'

const Home = () => {
  // useEffect(() => {
  //   setCategories((prevCategories) =>
  //     prevCategories.map((categ) => ({ ...categ, active: false })),
  //   )
  // }, [])

  return (
    <main id="home-page">
      <section className="hero-container">
        <div className="hero-title-container">
          <h1>
            Marcel <span>the outdoor cat</span>
          </h1>
        </div>
        <div className="hero-image-container">
          <img src={catMainLogo} alt="cat logo" />
        </div>
      </section>
    </main>
  )
}

export default Home
