const UploadModalBar = (props) => {
  return(
    <div className="upload-bar">
      <div className={`upload-bar__item ${props.progress===1 ? 'active heading-3' : 'heading-3-light'}`}>
        <div className="bullet"></div>
        <p>Select CSV</p>
      </div>
      <div className={`upload-bar__item ${props.progress===2 ? 'active heading-3' : 'heading-3-light'}`}>
        <div className="bullet"></div>
        <p>Map Columns</p>
      </div>
      <div className={`upload-bar__item ${props.progress===3 ? 'active heading-3' : 'heading-3-light'}`}>
        <div className="bullet"></div>
        <p>Select List</p>
      </div>
    </div>
  )
}

export default UploadModalBar
