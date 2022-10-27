import { Link, useNavigate } from 'react-router-dom'

const HeaderButton = (props) => {
  return (
    <li
      className={`${props.name} header-item ${props.isActive}`}
      onClick={props.handleClick}
    >
      <Link to={props.url} className={props.isActive}>
        <img src={props.imgsrc} alt={props.imgalt} className="nav-icon" />
        <p>{props.name}</p>
      </Link>
    </li>
  )
}

export default HeaderButton
