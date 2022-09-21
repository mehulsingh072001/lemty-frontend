const MapColumns = (props) => {
  return(
    <div class="column">

    <form action="" className="column__form">

      <div className="column__form--container">
        <h1 className="heading-4">Lemty Fields</h1>
        <h1 className="heading-4">Csv Columns</h1>
      </div>

      <div className="column__form--container">
        <label htmlFor="">FirstName</label>
        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, firstName: e.target.value})}>
            <option selected={props.prospectData.firstName === "" ? "selected" : null}  value="none">{props.prospectData.firstName === "" ? "" : props.prospectData.firstName}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.firstName === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault();  props.setProspectData({...props.prospectData, "firstName": "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">LastName</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, lastName: e.target.value})}>
            <option selected={props.prospectData.lastName === "" ? "selected" : null} value="none">{props.prospectData.lastName === "" ? "" : props.prospectData.lastName}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.lastName === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, lastName: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectEmail</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectEmail: e.target.value})}>
            <option selected={props.prospectData.prospectEmail === "" ? "selected" : null} value="none">{props.prospectData.prospectEmail === "" ? "" : props.prospectData.prospectEmail}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectEmail === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectEmail: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectCompany</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectCompany: e.target.value})}>
            <option selected={props.prospectData.prospectCompany === "" ? "selected" : null} value="none">{props.prospectData.prospectCompany === "" ? "" : props.prospectData.prospectCompany}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectCompany === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectCompany: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectMobileNumber</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectMobileNumber: e.target.value})}>
            <option selected={props.prospectData.prospectMobileNumber === "" ? "selected" : null} value="none">{props.prospectData.prospectMobileNumber === "" ? "" : props.prospectData.prospectMobileNumber}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectMobileNumber === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectMobileNumber: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectAccount</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectAccount: e.target.value})}>
            <option selected={props.prospectData.prospectAccount === "" ? "selected" : null} value="none">{props.prospectData.prospectAccount === "" ? "" : props.prospectData.prospectAccount}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectAccount === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectAccount: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectCompanyEmail</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectCompanyEmail: e.target.value})}>
            <option selected={props.prospectData.prospectCompanyEmail === "" ? "selected" : null} value="none">{props.prospectData.prospectCompanyEmail === "" ? "" : props.prospectData.prospectCompanyEmail}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectCompanyEmail === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectCompanyEmail: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectDepartment</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectDepartment: e.target.value})}>
            <option selected={props.prospectData.prospectDepartment === "" ? "selected" : null} value="none">{props.prospectData.prospectDepartment === "" ? "" : props.prospectData.prospectDepartment}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectDepartment === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectDepartment: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectTitle</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectTitle: e.target.value})}>
            <option selected={props.prospectData.prospectTitle === "" ? "selected" : null} value="none">{props.prospectData.prospectTitle === "" ? "" : props.prospectData.prospectTitle}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectTitle === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectTitle: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectCompanyDomain</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectCompanyDomain: e.target.value})}>
            <option selected={props.prospectData.prospectCompanyDomain === "" ? "selected" : null} value="none">{props.prospectData.prospectCompanyDomain === "" ? "" : props.prospectData.prospectCompanyDomain}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectCompanyDomain === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectCompanyDomain: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectLinkedinUrl</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectLinkedinUrl: e.target.value})}>
            <option selected={props.prospectData.prospectLinkedinUrl === "" ? "selected" : null} value="none">{props.prospectData.prospectLinkedinUrl === "" ? "" : props.prospectData.prospectLinkedinUrl}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectLinkedinUrl === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectLinkedinUrl: "".toString()})}}>Empty</button>
        </div>
          
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectTwitterUrl</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectTwitterUrl: e.target.value})}>
            <option selected={props.prospectData.prospectTwitterUrl === "" ? "selected" : null} value="none">{props.prospectData.prospectTwitterUrl === "" ? "" : props.prospectData.prospectTwitterUrl}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectTwitterUrl === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectTwitterUrl: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectLocation</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectLocation: e.target.value})}>
            <option selected={props.prospectData.prospectLocation === "" ? "selected" : null} value="none">{props.prospectData.prospectLocation === "" ? "" : props.prospectData.prospectLocation}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectLocation === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectLocation: "".toString()})}}>Empty</button>
        </div>
      </div>

      <div className="column__form--container">
        <label htmlFor="">ProspectCountry</label>

        <div className="column__form--container--item">
          <select id="" name="" onChange={(e) => props.setProspectData({...props.prospectData, prospectCountry: e.target.value})}>
            <option selected={props.prospectData.prospectCountry === "" ? "selected" : null} value="none">{props.prospectData.prospectCountry === "" ? "" : props.prospectData.prospectCountry}</option>
            {props.csvHeaders.map(d => 
                  <option key={d.id} value={d.id}>{d}</option>
            )}
          </select>
          <button className={`${props.prospectData.prospectCountry === "" ? "btn-sec--disabled" : "btn-sec"}`} onClick={(e) => {e.preventDefault(); props.setProspectData({...props.prospectData, prospectCountry: "".toString()})}}>Empty</button>
        </div>
      </div>
    </form>
    </div>
  )
}

export default MapColumns
