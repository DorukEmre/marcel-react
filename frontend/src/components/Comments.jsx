import { useState } from 'react'
import { axiosPrivate } from '../api/axios'
import { sendCommentIcon } from '../assets/icons'

const Comments = () => {
  const [comments, setComments] = useState([
    {
      _id: 1,
      user: { username: 'Greg' },
      comment: 'Good cat',
    },
    {
      _id: 2,
      user: { username: 'Greg' },
      comment: 'Good cat',
    },
  ])
  let post
  // axios get comments
  //
  // modal.querySelector('.create-comment--textarea').value = ''
  // const postId = this.dataset.id
  // const response = await fetch(`posts/getComments/${postId}`)
  // const data = await response.json()
  // const { post, comments } = data

  // axios post comments
  // `posts/createComment/${postId}`

  function handleSubmit(e) {
    e.preventDefault()
    let isMounted = true
    const controller = new AbortController()
  }

  return (
    <section className="comments-container">
      <ul className="comments-list">
        {comments &&
          comments.map((comment) => (
            <li className="comments-line" key={comment._id}>
              <div>
                <em className="userName">{comment.user.username}: </em>
                <span className="comment">{comment.comment}</span>
              </div>
            </li>
          ))}
      </ul>
      <form className="create-comment" onClick={handleSubmit}>
        <label htmlFor="comment" className="create-comment--label">
          <textarea
            rows="2"
            className="create-comment--textarea"
            id="comment"
            name="comment"
            placeholder="Add a comment"
            autoFocus
            required
          ></textarea>
        </label>

        <button className="send-button">
          <img className="" src={sendCommentIcon} height="24px" width="24px" />
        </button>
      </form>
    </section>
  )
}

export default Comments
