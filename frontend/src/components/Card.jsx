import React, { useState } from 'react'
import Collapsible from 'react-collapsible'
import { Link } from 'react-router-dom'
import {
  closeIcon,
  commentIcon,
  likeFalseIcon,
  likeTrueIcon,
  menuIcon,
  locationOffIcon,
  locationOnIcon,
} from '../assets/icons'
import { profileInactive } from '../assets/nav_icons'
import Comments from '../components/Comments'
import MenuPopper from './MenuPopper'

const Card = React.forwardRef((props, ref) => {
  // const [anchorPopper, setAnchorPopper] = useState(null)
  // const [openMenuPopper, setOpenMenuPopper] = useState(false)

  // const handleOpenMenu = (event) => {
  //   setAnchorPopper(event.currentTarget)
  //   setOpenMenuPopper((prev) => !prev)
  // }

  return (
    <li className="card" ref={typeof ref !== 'undefined' ? ref : null}>
      {props.ownProfile ? (
        <>
          <button
            aria-describedby="menu"
            type="button"
            onClick={(e) => props.handleToggleLocation(e, props.postId)}
            className={`toggle-location-button ${
              props.showLocation ? 'location-on' : 'location-off'
            }`}
          >
            <img
              src={props.showLocation ? locationOnIcon : locationOffIcon}
              alt=""
              height="24px"
              width="24px"
            />
          </button>
          <p className="toggle-location-tooltip">
            {props.showLocation
              ? 'Click to hide location on map'
              : 'Click to show location on map'}
          </p>
        </>
      ) : (
        <section className="card--header-container">
          <div className="card--header-text">
            <Link
              to={`../../profile/${props.user._id}`}
              className="card--username-wrapper"
            >
              <img
                src={
                  typeof props.user.profilePicUrl !== 'undefined'
                    ? `${props.user.profilePicUrl.slice(
                        0,
                        49,
                      )}/w_72,h_72,c_scale${props.user.profilePicUrl.slice(49)}`
                    : profileInactive
                }
                alt="user profile picture"
                className="card--username--avatar"
              />
              <span className="card--username--name">
                {props.user.username}
              </span>
            </Link>
          </div>

          {/* <button
            aria-describedby="menu"
            type="button"
            onClick={handleOpenMenu}
            className="popup-menu-button icon-button"
          >
            <img src={menuIcon} alt="" height="24px" width="24px" />
          </button>
          <MenuPopper
            anchorPopper={anchorPopper}
            openMenuPopper={openMenuPopper}
            id="menu"
            className="card-popup-menu"
          /> */}

          {typeof props.handleClose !== 'undefined' ? (
            <button
              className="card--close-button close-button icon-button"
              onClick={props.handleClose}
            >
              <img src={closeIcon} alt="" height="24px" width="24px" />
            </button>
          ) : null}
        </section>
      )}

      <section className="card--image-container">
        <img
          className=""
          src={`${props.imageUrl.slice(0, 49)}/w_${props.imageXY},h_${
            props.imageXY
          },c_scale${props.imageUrl.slice(49)}`}
          alt="cat picture"
          loading="lazy"
        />
      </section>

      <section className="card--like-container">
        <form
          className="like-button icon-button"
          onClick={(e) => props.handleToggleLike(e, props.postId)}
        >
          <button className="like-button icon-button">
            {props.greatCat.find((x) => x == props.currentUserId) !=
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
        <span className="like-number">{props.greatCat.length}</span>
      </section>

      <section className="card--comments-container">
        <Collapsible
          trigger={
            <>
              <p className="caption">{props.caption}</p>
              <button
                className="open-comments icon-button"
                data-id={props.postId}
              >
                <img src={commentIcon} alt="" height="24px" width="24px" />
              </button>
            </>
          }
          triggerWhenOpen={
            <>
              <p className="caption">{props.caption}</p>
              <button
                className="close-button icon-button"
                data-id={props.postId}
              >
                <img src={closeIcon} alt="" height="24px" width="24px" />
              </button>
            </>
          }
          onOpening={() => {
            props.getComments(props.postId)
          }}
        >
          <Comments
            postId={props.postId}
            comments={
              props.allComments &&
              props.allComments.find((obj) => obj.postId === props.postId)
                ? props.allComments.find((obj) => obj.postId === props.postId)
                    .comments
                : []
            }
            setAllComments={props.setAllComments}
          />
        </Collapsible>
      </section>
    </li>
  )
})

export default Card
