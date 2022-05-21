const AdditionalFields = ({prospect}) => {
  return(
    <>
      <div className="item">
        <label htmlFor="">Account</label>
        <input type="text" value={prospect.prospectAccount}/>
      </div>
      <div className="item">
        <label htmlFor="">Title</label>
        <input type="text" value={prospect.prospectTitle}/>
      </div>
      <div className="item">
        <label htmlFor="">Department</label>
        <input type="text" value={prospect.prospectDepartment} />
      </div>
      <div className="item">
        <label htmlFor="">Company Email</label>
        <input type="text" value={prospect.prospectCompanyEmail}/>
      </div>
      <div className="item">
        <label htmlFor="">Company Phone-no</label>
        <input type="text" value={prospect.prospectCompanyPhone}/>
      </div>
      <div className="item">
        <label htmlFor="">Company Domain</label>
        <input type="text" value={prospect.prospectCompanyDomain}/>
      </div>
      <div className="item">
        <label htmlFor="">LinkedIn URL</label>
        <input type="text" value={prospect.prospectLinkedinUrl}/>
      </div>
      <div className="item">
        <label htmlFor="">Twitter-ID</label>
        <input type="text" value={prospect.prospectTwitterUrl}/>
      </div>
      <div className="item">
        <label htmlFor="">Twitter-ID</label>
        <input type="text" value={prospect.prospectTwitterUrl}/>
      </div>
      <div className="item">
        <label htmlFor="">City</label>
        <input type="text" value={prospect.prospectCity}/>
      </div>
      <div className="item">
        <label htmlFor="">Location</label>
        <input type="text" value={prospect.prospectLocation}/>
      </div>
      <div className="item">
        <label htmlFor="">Country</label>
        <input type="text" value={prospect.prospectCountry}/>
      </div>
    </>
  )
}

export default AdditionalFields
