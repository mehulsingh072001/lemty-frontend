import {useNavigate} from "react-router-dom"
import AppSidebar from "../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../Components/Topbars/AppTopbar"
import ToggleSwitch from "../../Components/ToggleSwitch";

function ProspectSettings(){ 
  let navigate = useNavigate()

  return(
    <div className="prospect-settings">
      <AppSidebar/>
      <AppTopbar title={"Settings"}/>
      <div className="prospect-settings__container">
        <div className="prospect-settings__container--sidebar">
          <button className="s-back" onClick={() => navigate("/settings")}><i className="fas fa-chevron-left"></i><span>Back</span></button>
          <ul>
            <li onClick={() => document.getElementById("account").scrollIntoView()}><p>Intent</p></li>
          </ul>
        </div>
        <div className="prospect-settings__container--content">
          <div className="prospect-settings__container--content--card" id="timezone">
            <div className="prospect-settings__container--content--card--head">
              <div>
                <h4 className="heading-2">High Intent detector</h4>
                <p className="copy__para--medium-light u-margin-top-small">Set points to decide when prospect becomes hot</p>
              </div>
              <div className="row">
                <button className="btn-sec">Edit</button>
                <ToggleSwitch/>
              </div>
            </div>

            <div className="points">
              <p className="copy__para--medium">If a Prospect opens an email, assign</p>
              <input type="number" value="2"/>
            </div>

            <div className="points">
              <p className="copy__para--medium">If a Prospect clicks a link in an email, assign</p>
              <input type="number" value="5"/>
            </div>

            <div className="points">
              <p className="copy__para--medium">A Prospect becomes Hot if they have atleast</p>
              <input type="number" value="6"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProspectSettings
