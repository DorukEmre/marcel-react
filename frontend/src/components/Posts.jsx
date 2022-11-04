import { Link } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Collapsible from 'react-collapsible'
import {
  closeIcon,
  commentIcon,
  likeFalseIcon,
  likeTrueIcon,
} from '../assets/icons'
import Comments from '../components/Comments'
import { useState } from 'react'

const Posts = (props) => {
  const axiosPrivate = useAxiosPrivate()
  const [allComments, setAllComments] = useState([])

  const getComments = async (postId) => {
    let isMounted = true
    const controller = new AbortController()

    try {
      const response = await axiosPrivate.get(
        `api/posts/getComments/${postId}`,
        {
          signal: controller.signal,
        },
      )
      // console.log('comments', response.data)

      if (allComments.find((obj) => obj.postId === postId)) {
        isMounted &&
          setAllComments((oldComments) =>
            oldComments.map((obj) =>
              obj.postId === postId ? { ...obj, comments: response.data } : obj,
            ),
          )
      } else {
        isMounted &&
          setAllComments([...allComments, { postId, comments: response.data }])
      }
    } catch (err) {
      console.error('getComments err', err)
      // navigate('/login', { state: { from: location }, replace: true })
    }

    return () => {
      isMounted = false
      controller.abort()
    }
  }

  return props.posts.map((post) => (
    <li className="card" key={post._id}>
      <section className="card--title-container">
        <h4>
          {post.catName} by {post.user.username}
        </h4>
      </section>

      <Link to={`/posts/${post._id}`} className="card--image-container">
        <img
          className=""
          src={
            post.imageUrl.slice(0, 49) +
            '/w_800,h_800,c_scale' +
            post.imageUrl.slice(49)
          }
        />
      </Link>

      <section className="card--like-container">
        <form
          className="like-button"
          onClick={(e) => props.handleToggleLike(e, post._id)}
        >
          <button className="like-button">
            {post.greatCat.find((x) => x == props.currentUserId) !=
            undefined ? (
              <img className="" src={likeTrueIcon} height="24px" width="24px" />
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
                <img src={commentIcon} alt="" height="24px" width="24px" />
              </button>
            </>
          }
          triggerWhenOpen={
            <>
              <p className="caption">{post.caption}</p>
              <button className="close-button" data-id={post._id}>
                <img src={closeIcon} alt="" height="24px" width="24px" />
              </button>
            </>
          }
          onOpening={() => {
            getComments(post._id)
          }}
        >
          <Comments
            postId={post._id}
            comments={
              allComments && allComments.find((obj) => obj.postId === post._id)
                ? allComments.find((obj) => obj.postId === post._id).comments
                : []
            }
            setAllComments={setAllComments}
          />
        </Collapsible>
      </section>
    </li>
  ))
}

export default Posts
