import { catMainLogo } from '../assets/images'

const Home = () => {
  return (
    <main id="home-page">
      <section className="hero-container">
        <div className="hero-title-container">
          <h1>
            <span className="Marcel">Marcel</span>
            <span className="outdoor-cat"> the outdoor cat</span>
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
