const AdditionalFields = ({prospect, setProspect}) => {
  return(
    <>
      <div className="item">
        <label htmlFor="">Account</label>
        <input type="text" defaultValue={prospect.prospectAccount} onChange={(e) => setProspect({...prospect, prospectAccount: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Title</label>
        <input type="text" defaultValue={prospect.prospectTitle} onChange={(e) => setProspect({...prospect, prospectTitle: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Department</label>
        <input type="text" defaultValue={prospect.prospectDepartment} onChange={(e) => setProspect({...prospect, prospectDepartment: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Company Email</label>
        <input type="text" defaultValue={prospect.prospectCompanyEmail} onChange={(e) => setProspect({...prospect, prospectCompanyEmail: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Company Phone-no</label>
        <input type="text" defaultValue={prospect.prospectCompanyPhone} onChange={(e) => setProspect({...prospect, prospectCompanyPhone: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Company Domain</label>
        <input type="text" defaultValue={prospect.prospectCompanyDomain} onChange={(e) => setProspect({...prospect, prospectCompanyDomain: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">LinkedIn URL</label>
        <input type="text" defaultValue={prospect.prospectLinkedinUrl} onChange={(e) => setProspect({...prospect, prospectLinkedinUrl: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Twitter-ID</label>
        <input type="text" defaultValue={prospect.prospectTwitterUrl} onChange={(e) => setProspect({...prospect, prospectTwitterUrl: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">City</label>
        <input type="text" defaultValue={prospect.prospectCity} onChange={(e) => setProspect({...prospect, prospectCity: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Location</label>
        <input type="text" defaultValue={prospect.prospectLocation} onChange={(e) => setProspect({...prospect, prospectLocation: e.target.value})}/>
      </div>
      <div className="item">
        <label htmlFor="">Country</label>
        <input type="text" defaultValue={prospect.prospectCountry} onChange={(e) => setProspect({...prospect, prospectCountry: e.target.value})}/>
      </div>
    </>
  )
}

export default AdditionalFields
