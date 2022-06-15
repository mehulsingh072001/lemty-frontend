const BasicFields = ({prospect, setProspect}) => {
  return(
    <>
      <div className="item">
        <label htmlFor="">First Name</label>
        <input type="text" defaultValue={prospect.firstName} onChange={(e) => setProspect({...prospect, firstName: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Last Name</label>
        <input type="text" defaultValue={prospect.lastName} onChange={(e) => setProspect({...prospect, lastName: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Email</label>
        <input type="text" defaultValue={prospect.prospectEmail} onChange={(e) => setProspect({...prospect, prospectEmail: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Phone no.</label>
        <input type="text"  defaultValue={prospect.prospectMobileNumber} onChange={(e) => setProspect({...prospect, prospectMobileNumber: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Company</label>
        <input type="text" defaultValue={prospect.prospectCompany} onChange={(e) => setProspect({...prospect, prospectCompany: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Tags</label>
        <input type="text" />
      </div>
      <div className="item">
        <label htmlFor="">List</label>
        <input type="text" defaultValue={prospect.prospectList} onChange={(e) => setProspect({...prospect, prospectList: e.target.value})}/>
      </div>
    </>
  )
}

export default BasicFields
