import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Posts from '../components/Posts'
import useAuth from '../hooks/useAuth'

const Feed = () => {
  const { auth } = useAuth()
  // console.log('auth on Feed', auth)
  const currentUserId = auth.userId

  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const [posts, setPosts] = useState([
    {
      catName: 'Kandinsky',
      user: { username: 'Bob' },
      _id: '63454b056ca805a1ed32063e',
      imageUrl:
        'https://res.cloudinary.com/dgphdac21/image/upload/v1667597856/yzah7nzvpbwazuh7wc1p.jpg',
      greatCat: ['a', 'b', 'c'],
      caption: 'What a cutie',
    },
  ])

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

  const handleToggleLike = async (e, postId) => {
    e.preventDefault()
    let isMounted = true
    const controller = new AbortController()

    try {
      const response = await axiosPrivate.put(
        `api/posts/likePost/${postId}`,
        JSON.stringify({ currentUserId }),
        {
          signal: controller.signal,
        },
      )
      // console.log('response?.data', response?.data)
      const { updatedPost } = response.data

      isMounted &&
        setPosts((oldPosts) =>
          oldPosts.map((post) =>
            post._id === updatedPost._id
              ? { ...post, greatCat: updatedPost.greatCat }
              : post,
          ),
        )
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
    <main id="feed-page">
      <div className="">
        <ul className="cards-container">
          {posts ? (
            <Posts
              posts={posts}
              currentUserId={currentUserId}
              handleToggleLike={handleToggleLike}
            />
          ) : (
            <p>Can't connect to server</p>
          )}
        </ul>
      </div>
    </main>
  )
}

export default Feed
