const WhichEmail = ({selectedEmail, setSelectedEmail, creds}) => {
  return(
    <div className="assign">
      <h3 className="assign__heading">Email Sent from the selected email</h3>
      <form className="assign__form" action="">
        <select value={selectedEmail} onChange={(e) => setSelectedEmail(e.target.value)}>
          <option value="">None</option>
          {
            creds.map((d, i) => 
                <option key={i} value={d.email}>{d.email}</option>
            )
          }
        </select>
      </form>
    </div>
  )
}

export default WhichEmail
