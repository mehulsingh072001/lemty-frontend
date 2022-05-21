const MapColumns = (props) => {
  return(
    <div class="column">

    <form action="" className="column__form">

      <div className="column__form--container">
        <h1 className="heading-4">Csv Columns</h1>
        <h1 className="heading-4">Lemty Fields</h1>
      </div>

      <div className="column__form--container">
        <label htmlFor="">FirstName</label>
        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, firstName: e.target.value})}>
            <option selected={props.prospectData.firstName === "empty" ? "selected" : null}  value="none">{props.prospectData.firstName === "empty" ? "" : props.prospectData.firstName}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.firstName === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault();  props.setProspectData({...props.prospectData, "firstName": "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">LastName</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, lastName: e.target.value})}>
            <option selected={props.prospectData.lastName === "empty" ? "selected" : null} value="none">{props.prospectData.lastName === "empty" ? "" : props.prospectData.lastName}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.lastName === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, lastName: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectEmail</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectEmail: e.target.value})}>
            <option selected={props.prospectData.prospectEmail === "empty" ? "selected" : null} value="none">{props.prospectData.prospectEmail === "empty" ? "" : props.prospectData.prospectEmail}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectEmail === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectEmail: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectCompany</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectCompany: e.target.value})}>
            <option selected={props.prospectData.prospectCompany === "empty" ? "selected" : null} value="none">{props.prospectData.prospectCompany === "empty" ? "" : props.prospectData.prospectCompany}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectCompany === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectCompany: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectMobileNumber</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectMobileNumber: e.target.value})}>
            <option selected={props.prospectData.prospectMobileNumber === "empty" ? "selected" : null} value="none">{props.prospectData.prospectMobileNumber === "empty" ? "" : props.prospectData.prospectMobileNumber}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectMobileNumber === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectMobileNumber: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectAccount</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectAccount: e.target.value})}>
            <option selected={props.prospectData.prospectAccount === "empty" ? "selected" : null} value="none">{props.prospectData.prospectAccount === "empty" ? "" : props.prospectData.prospectAccount}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectAccount === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectAccount: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectCompanyEmail</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectCompanyEmail: e.target.value})}>
            <option selected={props.prospectData.prospectCompanyEmail === "empty" ? "selected" : null} value="none">{props.prospectData.prospectCompanyEmail === "empty" ? "" : props.prospectData.prospectCompanyEmail}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectCompanyEmail === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectCompanyEmail: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectDepartment</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectDepartment: e.target.value})}>
            <option selected={props.prospectData.prospectDepartment === "empty" ? "selected" : null} value="none">{props.prospectData.prospectDepartment === "empty" ? "" : props.prospectData.prospectDepartment}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectDepartment === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectDepartment: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectTitle</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectTitle: e.target.value})}>
            <option selected={props.prospectData.prospectTitle === "empty" ? "selected" : null} value="none">{props.prospectData.prospectTitle === "empty" ? "" : props.prospectData.prospectTitle}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectTitle === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectTitle: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectCompanyDomain</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectCompanyDomain: e.target.value})}>
            <option selected={props.prospectData.prospectCompanyDomain === "empty" ? "selected" : null} value="none">{props.prospectData.prospectCompanyDomain === "empty" ? "" : props.prospectData.prospectCompanyDomain}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectCompanyDomain === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectCompanyDomain: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectLinkedinUrl</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectLinkedinUrl: e.target.value})}>
            <option selected={props.prospectData.prospectLinkedinUrl === "empty" ? "selected" : null} value="none">{props.prospectData.prospectLinkedinUrl === "empty" ? "" : props.prospectData.prospectLinkedinUrl}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectLinkedinUrl === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectLinkedinUrl: "empty".toString()})}}>Empty</button>
        </div>
          
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectTwitterUrl</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectTwitterUrl: e.target.value})}>
            <option selected={props.prospectData.prospectTwitterUrl === "empty" ? "selected" : null} value="none">{props.prospectData.prospectTwitterUrl === "empty" ? "" : props.prospectData.prospectTwitterUrl}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectTwitterUrl === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectTwitterUrl: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectLocation</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectLocation: e.target.value})}>
            <option selected={props.prospectData.prospectLocation === "empty" ? "selected" : null} value="none">{props.prospectData.prospectLocation === "empty" ? "" : props.prospectData.prospectLocation}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectLocation === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectLocation: "empty".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectCountry</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectCountry: e.target.value})}>
            <option selected={props.prospectData.prospectCountry === "empty" ? "selected" : null} value="none">{props.prospectData.prospectCountry === "empty" ? "" : props.prospectData.prospectCountry}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectCountry === "empty" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectCountry: "empty".toString()})}}>Empty</button>
        </div>
      </div>
    </form>
    </div>
  )
}

export default MapColumns
