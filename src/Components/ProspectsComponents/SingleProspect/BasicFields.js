const BasicFields = ({prospect, setProspect}) => {
  return(
    <>
      <div className="item">
        <label htmlFor="">First Name</label>
        <input type="text" value={prospect.firstName} onChange={(e) => setProspect({...prospect, firstName: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Last Name</label>
        <input type="text" value={prospect.lastName}/>
      </div>
      <div className="item">
        <label htmlFor="">Email</label>
        <input type="text" value={prospect.prospectEmail}/>
      </div>
      <div className="item">
        <label htmlFor="">Phone no.</label>
        <input type="text"  value={prospect.prospectMobileNumber}/>
      </div>
      <div className="item">
        <label htmlFor="">Company</label>
        <input type="text" value={prospect.prospectCompany}/>
      </div>
      <div className="item">
        <label htmlFor="">Tags</label>
        <input type="text" />
      </div>
      <div className="item">
        <label htmlFor="">List</label>
        <input type="text" value={prospect.prospectList}/>
      </div>
    </>
  )
}

export default BasicFields
