const SuccessfullUpload = ({toggleHome, uploadResponse}) => {
  return(
    <div className="upload-successfull">
      <nav className="upload-successfull__nav">
        <div className="upload-successfull__nav--heading">
          <i className="fas fa-file-csv"></i>
          <h1>Import from CSV File</h1>
        </div>
        <button onClick={() => toggleHome()} className="btn-close">&times;</button>
      </nav>

      <div className="upload-successfull__container">
        <div className="upload-successfull__container--heading">
          <div className="row">
            <i className="fas fa-check"></i> 
            <h1 className="heading-1">Import was successfull</h1>
          </div>
          <p className="copy__para--medium">Your Prospects have been imported.</p>
        </div>
        <div className="upload-successfull__container--prospects">
          <p className="copy__para--medium"><strong>{uploadResponse.prospects.length}</strong> Not Contacted</p>
          <p className="copy__para--medium"><strong>{uploadResponse.failedProspects.length}</strong> Failed Prospects(s)</p>
          <button className="btn-tertiary">View all Prospects</button>
        </div>
        <div className="upload-successfull__container--pick-campaign">
          <h2 className="heading-2">Add these Prospects to a Cadence</h2>
          <div className="row">
            <i className="fas fa-long-arrow-right"></i>
            <button className="btn-tertiary">Pick Campaign</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessfullUpload;
