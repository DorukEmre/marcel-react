import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { catBullet } from '../assets/icons'

const Groups = () => {
  // Fetch  ownedGroups & memberGroups
  let ownedGroups, memberGroups

  return (
    <main id="groups-page">
      <div className="groups-container">
        <section className="groups--title">
          <h1>Join or create a group</h1>
          <div className="bullet-point">
            <img src={catBullet} alt="" height="24" width="24" />
            <p>
              Form groups with your friends and share your pictures with them.
            </p>
          </div>
          <div className="bullet-point">
            <img src={catBullet} alt="" height="24" width="24" />
            <p>
              Groups allow you to share the locations of your cat spottings.
            </p>
          </div>
          <p className="notice">
            <span>Notice:</span> Every member of your groups will be able to see
            the location of the pictures you share.
          </p>
        </section>

        <section className="groups-card groups--join">
          <h2>Join an existing group</h2>
          <p>
            Type in the group code <span>(example: London#1234)</span>
          </p>
          <form className="join-group-form" action="/joinGroup" method="get">
            <label htmlFor="join-group-code">
              <input
                name="join-group-code"
                id="join-group-code"
                type="text"
                placeholder="Group code"
                required
              />
            </label>
            <button className="groups--button join-group-button" type="submit">
              Request to join group
            </button>
          </form>

          <dialog className="join-group-modal" id="join-group-modal">
            <div>
              <p>
                Create group '<span className="new-group-name"></span>'?
              </p>
              <div>
                <button className="cancel-join-group">Cancel</button>
                <form className="join-group-form" action="" method="post">
                  <button className="confirm-join-group">
                    Request to join group
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </section>

        <section className="groups-card groups--create">
          <h2>Create a new group</h2>
          <form
            className="create-group-form"
            action="/groups/createGroup"
            encType="application/x-www-form-urlencoded"
            method="post"
          >
            <label htmlFor="create-group-name">
              <input
                name="create-group-name"
                id="create-group-name"
                type="text"
                placeholder="Group name"
                required
              />
              <p className="restrictions">(Max 20 characters)</p>
            </label>
            <button
              className="groups--button create-group-button"
              type="submit"
            >
              Create group
            </button>
          </form>

          <dialog className="create-group-modal" id="create-group-modal">
            <div>
              <p>
                Create group '<span className="new-group-name"></span>'?
              </p>
              <div>
                <button className="cancel-new-group">Cancel</button>
                <button className="confirm-new-group">OK</button>
              </div>
            </div>
          </dialog>
        </section>

        <section className="groups-card groups--manage">
          <h2>Manage your groups</h2>
          <p>List of groups:</p>
          <ul className="groups-list">
            {ownedGroups &&
              ownedGroups.map((ownedGroup) => (
                <li className="groups-list-item">
                  <Link to={`/groups/${ownedGroup._id}`}>
                    {ownedGroup.groupName}
                  </Link>
                  <span>Owner</span>
                </li>
              ))}
            {memberGroups &&
              memberGroups.map((memberGroup) => (
                <li className="groups-list-item">
                  <Link to={`/groups/${memberGroup._id}`}>
                    {memberGroup.groupName}
                  </Link>
                  <span>Member</span>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default Groups
