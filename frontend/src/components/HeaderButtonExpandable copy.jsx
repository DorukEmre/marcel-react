import { useState } from 'react'
import { Link } from 'react-router-dom'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

const HeaderButtonExpandable = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = (e) => {
    setAnchorEl(null)
  }

  let activeClassName = 'active'

  const imgsrc = props.isProfileActive
    ? props.activeImageSrc
    : props.inactiveImageSrc

  const getClassName = props.isProfileActive ? activeClassName : undefined

  return (
    <li className="header-item after">
      <div
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleOpen}
        className="header-item--div"
      >
        <>
          <img src={imgsrc} alt={props.imgalt} className="nav-icon" />
          <p className={getClassName}>{props.name}</p>
          <span className={getClassName}></span>
        </>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        // hideBackdrop={true}
        // disableScrollLock={true}
        // BackdropProps={{ invisible: true }}
        // componentsProps={{ backdrop: { invisible: true } }}
        // BackdropProps={{ style: { backgroundColor: 'white' } }}
      >
        <MenuItem onClick={handleClose} component={Link} to={`${props.url}/me`}>
          My profile
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to={`${props.url}/settings`}
        >
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </li>
  )
}

export default HeaderButtonExpandable
