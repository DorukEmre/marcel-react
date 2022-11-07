import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useState } from 'react'
import Card from './Card'

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
  // console.log(props.posts)
  const cards = props.posts.map((post, index) => {
    let componentProps = {
      key: index,
      postId: post._id,
      catName: post.catName,
      username: post.user.username,
      profilePicUrl: post.user.profilePicUrl,
      imageUrl: post.imageUrl,
      imageXY: 800,
      greatCat: post.greatCat,
      caption: post.caption,
      handleToggleLike: props.handleToggleLike,
      currentUserId: props.currentUserId,
      getComments: getComments,
      allComments: allComments,
      setAllComments: setAllComments,
    }
    if (index === props.posts.length - 2) {
      return <Card ref={props.lastPostRef} {...componentProps} />
    }
    return <Card {...componentProps} />
  })
  // console.log(cards)

  return <>{cards}</>
}

export default Posts
