const CatInfoBox = ({ info }) => {
  return (
    <div className="cat-info">
      <ul>
        <li>
          <strong>{info.catName}</strong>
        </li>
        <li>
          <em>{info.caption}</em>
        </li>
        {/*  */}
        <img src={info.imageUrl make to image size} alt="" height="200" width="200" />
        {/*  */}
      </ul>
    </div>
  )
}

export default CatInfoBox
