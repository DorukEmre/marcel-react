import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Collapsible from 'react-collapsible'
import {
  closeIcon,
  commentIcon,
  likeFalseIcon,
  likeTrueIcon,
  sendCommentIcon,
} from '../assets/icons'
import Comments from '../components/Comments'

const Feed = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
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
    let isMounted = true
    // To cancel our request, when the Component unmounts (useful if we have pending requests when Component unmounts)
    const controller = new AbortController()

    const getPosts = async () => {
      try {
        const response = await axiosPrivate.get('/api/feed', {
          // To cancel request if we need to
          signal: controller.signal,
        })
        isMounted && setPosts(response.data)
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

    getPosts()

    // Clean up function, abort pending requests when the Component unmounts
    return () => {
      isMounted = false
      controller.abort()
    }
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

                  <Link
                    to={`/posts/${post._id}`}
                    className="card--image-container"
                  >
                    <img className="" src={post.imageUrl} />
                  </Link>

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
                    <Collapsible
                      trigger={
                        <>
                          <p className="caption">{post.caption}</p>
                          <button className="open-comments" data-id={post._id}>
                            <img
                              src={commentIcon}
                              alt=""
                              height="24px"
                              width="24px"
                            />
                          </button>
                        </>
                      }
                      triggerWhenOpen={
                        <>
                          <p className="caption">{post.caption}</p>
                          <button className="close-button" data-id={post._id}>
                            <img
                              src={closeIcon}
                              alt=""
                              height="24px"
                              width="24px"
                            />
                          </button>
                        </>
                      }
                    >
                      <Comments data-id={post._id} />
                    </Collapsible>
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
