import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { catBullet } from '../assets/icons'

const Groups = () => {
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()

  const [ownedGroups, setOwnedGroups] = useState([])
  const [memberGroups, setMemberGroups] = useState([])

  const [joinGroupCode, setJoinGroupCode] = useState()
  const [newGroupName, setNewGroupName] = useState()

  useEffect(() => {
    let isMounted = true
    // To cancel our request, when the Component unmounts (useful if we have pending requests when Component unmounts)
    const controller = new AbortController()

    const getGroups = async () => {
      try {
        const response = await axiosPrivate.get('/api/groups', {
          // To cancel request if we need to
          signal: controller.signal,
        })
        console.log('response.data', response.data)
        const { ownedGroups, memberGroups } = response.data
        isMounted && setOwnedGroups(ownedGroups)
        isMounted && setMemberGroups(memberGroups)
      } catch (err) {
        console.error('Login again err', err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getGroups()

    // Clean up function, abort pending requests when the Component unmounts
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])
  console.log('ownedGroups, memberGroups', ownedGroups, memberGroups)

  // const handleJoinGroupSubmit = async (e) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log('e.target', e.target.className)
    let isMounted = true
    const controller = new AbortController()

    let submitUrl =
      e.target.className === 'join-group-form'
        ? '/api/groups/joinGroup'
        : '/api/groups/createGroup'

    let submitData =
      e.target.className === 'join-group-form' ? joinGroupCode : newGroupName

    try {
      const response = await axiosPrivate.post(
        submitUrl,
        JSON.stringify({ submitData }),
        {
          // To cancel request if we need to
          signal: controller.signal,
        },
      )
      console.log('response?.data', response?.data)
      const { ownedGroups, memberGroups } = response.data
      isMounted && setOwnedGroups(ownedGroups)
      isMounted && setMemberGroups(memberGroups)

      e.target.className === 'join-group-form'
        ? setJoinGroupCode('')
        : setNewGroupName('')
    } catch (err) {
      console.log('err.', err.response)
      // if (!err?.response) {
      //   setErrMsg('No Server Response')
      // } else if (err.response?.status === 409) {
      //   setErrMsg(err.response.data.message)
      // } else {
      //   setErrMsg('Request failed')
      // }
      // errRef.current.focus()
    }

    return () => {
      isMounted = false
      controller.abort()
    }
  }

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
          <form className="join-group-form" onSubmit={handleSubmit}>
            <label htmlFor="join-group-code">
              <input
                type="text"
                name="join-group-code"
                id="join-group-code"
                onChange={(e) => setJoinGroupCode(e.target.value)}
                value={joinGroupCode}
                placeholder="Group code"
                required
              />
            </label>
            <button className="groups--button join-group-button">
              Request to join group
            </button>
          </form>
        </section>

        <section className="groups-card groups--create">
          <h2>Create a new group</h2>
          <form className="create-group-form" onSubmit={handleSubmit}>
            <label htmlFor="create-new-group">
              <input
                type="text"
                id="create-new-group"
                placeholder="Group name"
                onChange={(e) => setNewGroupName(e.target.value)}
                value={newGroupName}
                required
              />
              <p className="restrictions">(Max 20 characters)</p>
            </label>
            <button className="groups--button create-new-group-button">
              Create group
            </button>
          </form>
        </section>

        <section className="groups-card groups--manage">
          <h2>Manage your groups</h2>
          <p>List of groups:</p>
          <ul className="groups-list">
            {ownedGroups &&
              ownedGroups.map((ownedGroup) => (
                <li className="groups-list-item" key={ownedGroup._id}>
                  <Link to={`/groups/${ownedGroup._id}`}>
                    {ownedGroup.groupName}
                  </Link>
                  <span>Owner</span>
                </li>
              ))}
            {memberGroups &&
              memberGroups.map((memberGroup) => (
                <li className="groups-list-item" key={memberGroup._id}>
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
