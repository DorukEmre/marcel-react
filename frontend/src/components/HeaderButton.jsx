import { NavLink } from 'react-router-dom'

const HeaderButton = (props) => {
  let activeClassName = 'active'

  return (
    <li className="header-item">
      <NavLink
        to={props.url}
        className={({ isActive }) => (isActive ? activeClassName : undefined)}
      >
        {({ isActive }) => {
          const imgsrc = isActive
            ? props.activeImageSrc
            : props.inactiveImageSrc

          const underline = isActive ? activeClassName : undefined
          return (
            <>
              <img src={imgsrc} alt={props.imgalt} className="nav-icon" />
              <p>{props.name}</p>
              <span className={underline}></span>
            </>
          )
        }}
      </NavLink>
    </li>
  )
}

export default HeaderButton
