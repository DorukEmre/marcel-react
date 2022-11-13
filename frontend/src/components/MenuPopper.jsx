import Popper from '@mui/material/Popper'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useState } from 'react'

const MenuPopper = ({ post, currentUserId, ...props }) => {
  const axiosPrivate = useAxiosPrivate()

  const handleHidePost = async (e, postId) => {
    e.preventDefault()
    let isMounted = true
    const controller = new AbortController()

    try {
      const response = await axiosPrivate.put(
        `api/posts/hidePost/${postId}`,
        JSON.stringify({ currentUserId }),
        {
          signal: controller.signal,
        },
      )
      // console.log('response.status', response.status)

      isMounted &&
        props.setPosts((oldPosts) =>
          oldPosts.filter((oldPost) => oldPost._id !== postId),
        )

      if (props.handleClose) props.handleClose() // close CatInfoBox
      props.setOpenMenuPopper((prev) => !prev)
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

  const handleBlockUser = async (e, postId) => {
    e.preventDefault()
    let isMounted = true
    const controller = new AbortController()

    try {
      let blockedUser = post.user
      const response = await axiosPrivate.put(
        `api/profile/blockUser/`,
        JSON.stringify({ currentUserId, blockedUser }),
        {
          signal: controller.signal,
        },
      )
      // console.log('response.status', response.status)

      isMounted &&
        props.setPosts((oldPosts) =>
          oldPosts.filter((oldPost) => oldPost.user._id !== blockedUser._id),
        )

      if (props.handleClose) props.handleClose() // close CatInfoBox
      props.setOpenMenuPopper((prev) => !prev)
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

  const handleReportPost = (e) => {
    console.log(e.target)
  }

  return (
    <Popper
      id={props.id}
      className={props.className}
      open={props.openMenuPopper}
      anchorEl={props.anchorPopper}
      placement="bottom-end"
      disablePortal={true}
      modifiers={[
        {
          name: 'preventOverflow',
          enabled: true,
        },
      ]}
    >
      <button
        className="card--popup-menu--link"
        onClick={(e) => handleHidePost(e, post._id)}
        tabIndex="0"
      >
        Hide post
      </button>
      <button
        className="card--popup-menu--link"
        onClick={(e) => handleBlockUser(e, post._id)}
        tabIndex="0"
      >
        Block user
      </button>
      {/* <button
        className="card--popup-menu--link"
        onClick={(e) => handleReportPost(e, post._id)}
        tabIndex="0"
      >
        Report
      </button> */}
    </Popper>
  )
}

export default MenuPopper
