import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  closeIcon,
  commentIcon,
  likeFalseIcon,
  likeTrueIcon,
  sendMessageIcon,
} from '../assets/icons'

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      catName: 'Kandinsky',
      user: { username: 'Bob' },
      _id: '63454b056ca805a1ed32063e',
      imageUrl:
        'https://res.cloudinary.com/dgphdac21/image/upload/v1665485572/n1ktk1gkeixs8xbn0k0r.png',
      greatCat: ['a', 'b', 'c'],
      caption: 'What a cutie',
    },
  ])
  const user = { id: '633b49bfe168285a6a1ce74d' }

  useEffect(() => {
    axios
      .get('/feed')
      .then((res) => {
        console.log('axios res.data back', res.data)
        setPosts(res.data)
      })
      .catch((err) => console.log('axios err.response', err.response))
  }, [])

  return (
    <main id="feed-page">
      <div className="">
        <ul className="cards-container">
          {posts
            ? posts.map((post) => (
                <li className="card" key={post._id}>
                  <section className="card--title-container">
                    <h4>
                      {post.catName} by {post.user.username}
                    </h4>
                  </section>
                  <a
                    href={`/posts/${post._id}`}
                    className="card--image-container"
                  >
                    <img className="" src={post.imageUrl} />
                  </a>
                  <section className="card--like-container">
                    <form
                      className="like-button"
                      action={`/posts/likePost/${post._id}?_method=PUT`}
                      method="POST"
                    >
                      <button className="like-button" type="submit">
                        {post.greatCat.find((x) => x == user.id) !=
                        undefined ? (
                          <img
                            className=""
                            src={likeTrueIcon}
                            height="24px"
                            width="24px"
                          />
                        ) : (
                          <img
                            className=""
                            src={likeFalseIcon}
                            height="24px"
                            width="24px"
                          />
                        )}
                      </button>
                    </form>
                    <span className="like-number">{post.greatCat.length}</span>
                  </section>
                  <section className="card--comments-container">
                    <p className="caption">{post.caption}</p>
                    <button className="open-comments" data-id={post._id}>
                      <img
                        src={commentIcon}
                        alt=""
                        height="24px"
                        width="24px"
                      />
                    </button>
                  </section>
                </li>
              ))
            : ''}
        </ul>
      </div>
    </main>
  )
}

export default Feed
