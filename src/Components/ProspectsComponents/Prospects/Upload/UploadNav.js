const UploadNav = (props) => {
  return(
    <nav class="nav">
      <div className="col-1">

        {props.progress === 1 ? 
          <button onClick={props.toggleUpload} className="btn-back"><i class="fas fa-chevron-left"></i></button>
            :
          <button onClick={props.prevStep} className="btn-back"><i class="fas fa-chevron-left"></i></button>
        }

        <div className="import-head">
          <i className="fas fa-file-csv"></i>
          <h1 className="copy__para--big">Import from csv file</h1>
        </div>
      </div>
      <div className="col-2">
        {props.progress === 2 ? 
          <button className="btn" onClick={props.nextStep}>Next</button> :
        null
        }
        {
          props.progress === 3 ? 
            <button className="btn" onClick={props.importProspect}>Import Prospects</button>
          :
            null
        }
        <button onClick={() => props.toggleHome()} className="btn-close">&times;</button>
      </div>
    </nav>
  )
}

export default UploadNav
