import { useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { sendCommentIcon } from '../assets/icons'

const Comments = (props) => {
  const axiosPrivate = useAxiosPrivate()
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let isMounted = true
    const controller = new AbortController()

    // console.log(newComment)

    try {
      const response = await axiosPrivate.post(
        `api/posts/createComment/${props.postId}`,
        JSON.stringify({ newComment }),
        {
          signal: controller.signal,
        },
      )
      // console.log('response?.data', response?.data)

      isMounted &&
        props.setAllComments((oldComments) =>
          oldComments.map((obj) =>
            obj.postId === props.postId
              ? { ...obj, comments: response.data }
              : obj,
          ),
        )

      isMounted && setNewComment('')
    } catch (err) {
      console.log(err)
    }

    return () => {
      isMounted = false
      controller.abort()
    }
  }

  return (
    <section className="comments-container">
      <ul className="comments-list">
        {props.comments &&
          props.comments.map((comment) => (
            <li className="comments-line" key={comment._id}>
              <div>
                <em className="userName">{comment.user.username}: </em>
                <span className="comment">{comment.comment}</span>
              </div>
            </li>
          ))}
      </ul>
      <form className="create-comment" onSubmit={handleSubmit}>
        <label htmlFor="comment--textarea" className="create-comment--label">
          <textarea
            rows="2"
            className="create-comment--textarea"
            id="comment--textarea"
            placeholder="Add a comment"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            required
          />
        </label>

        <button className="send-button">
          <img className="" src={sendCommentIcon} height="24px" width="24px" />
        </button>
      </form>
    </section>
  )
}

export default Comments
