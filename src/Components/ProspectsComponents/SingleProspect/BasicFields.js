const BasicFields = ({prospect, setProspect}) => {
  return(
    <>
      <div className="item">
        <label htmlFor="">First Name</label>
        <input type="text" value={prospect.firstName} onChange={(e) => setProspect({...prospect, firstName: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Last Name</label>
        <input type="text" value={prospect.lastName} onChange={(e) => setProspect({...prospect, lastName: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Email</label>
        <input type="text" value={prospect.prospectEmail} onChange={(e) => setProspect({...prospect, prospectEmail: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Phone no.</label>
        <input type="text"  value={prospect.prospectMobileNumber} onChange={(e) => setProspect({...prospect, prospectMobileNumber: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Company</label>
        <input type="text" value={prospect.prospectCompany} onChange={(e) => setProspect({...prospect, prospectCompany: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Tags</label>
        <input type="text" />
      </div>
      <div className="item">
        <label htmlFor="">List</label>
        <input type="text" value={prospect.prospectList} onChange={(e) => setProspect({...prospect, prospectList: e.target.value})}/>
      </div>
    </>
  )
}

export default BasicFields
