const StepSettingsBar = (props) => {
  return(
    <div className="settings-bar">
      <h1 className="u-margin-bottom-medium heading-1">Step Settings</h1>
      <ul className="settings-bar__links">
        <div className={`settings-bar__links--link ${props.progress===1 ? 'active' : ''}`} onClick={() => props.selectProgress(1)}><p className="copy__para--medium">Delivery Window</p></div>
        <div className={`settings-bar__links--link ${props.progress===2 ? 'active' : ''}`} onClick={() => props.selectProgress(2)}><p className="copy__para--medium">Schedule Days</p></div>
        <div className={`settings-bar__links--link ${props.progress===3 ? 'active' : ''}`} onClick={() => props.selectProgress(3)}><p className="copy__para--medium">Assign to</p></div>
        <div className={`settings-bar__links--link ${props.progress===4 ? 'active' : ''}`} onClick={() => props.selectProgress(4)}><p className="copy__para--medium">Approve Before Sending</p></div>
        <div className={`settings-bar__links--link ${props.progress===5 ? 'active' : ''}`} onClick={() => props.selectProgress(5)}><p className="copy__para--medium">Unsubscribe Link</p></div>
      </ul>
    </div>
  )
}

export default StepSettingsBar
