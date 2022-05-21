import AppSidebar from "../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../Components/Topbars/AppTopbar"
import { Outlet } from "react-router";
import {useNavigate} from "react-router-dom"

function Settings() {
  let navigate = useNavigate()
  return(
    <div className="settings">
      <Outlet/>
      <AppSidebar/>
      <AppTopbar title={"Settings"}/>
      <div className="settings__container">
        <div className="col-1">
          <div className="settings__container--card">
            <h4 onClick={() => navigate("/settings/email")} className="heading-2"><i className="fas fa-envelope"></i><span>Email Settings</span></h4>
            <div className="settings__container--card--container">
              <ul>
                <li className="copy__para--medium" onClick={() => navigate("/settings/email/#account")}><p>Email account</p></li>
                <li className="copy__para--medium" onClick={() => navigate("/settings/email/#signatures")}><p>Signatures</p></li>
                <li className="copy__para--medium" onClick={() => navigate("/settings/email/#unsub")}><p>Unsubscribe Link</p></li>
                <li className="copy__para--medium" onClick={() => navigate("/settings/email/#tracking")}><p>Email Tracking</p></li>
              </ul>
            </div>
          </div>
          <div className="settings__container--card">
            <h4 onClick={() => {console.log("hello")}} className="heading-2"><i className="fas fa-user"></i><span>Prospect Settings</span></h4>
            <div className="settings__container--card--container">
              <ul>
                <li className="copy__para--medium" onClick={() => {console.log("prank")}}><p>Tags</p></li>
                <li className="copy__para--medium" onClick={() => {console.log("prank")}}><p>Intent Detector</p></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-2">
          <div className="settings__container--card">
            <h4 onClick={() => navigate("/settings/deliveribility")} className="heading-2"><i className="fas fa-envelope-open"></i><span>Deliveribility Settings</span></h4>
            <div className="settings__container--card--container">
              <ul>
                <li className="copy__para--medium" onClick={() => {console.log("prank")}}><p>Daily Email Limit</p></li>
                <li className="copy__para--medium" onClick={() => {console.log("prank")}}><p>Email Interval</p></li>
                <li className="copy__para--medium" onClick={() => {console.log("prank")}}><p>Custom Tracking Domain</p></li>
              </ul>
            </div>
          </div>

          <div className="settings__container--card">
            <h4 onClick={() => navigate("/settings/user")} className="heading-2"><i className="fas fa-id-badge"></i> <span>User Settings</span></h4>
            <div className="settings__container--card--container">
              <ul>
                <li className="copy__para--medium" onClick={() => {console.log("prank")}}><p>Profile</p></li>
                <li className="copy__para--medium" onClick={() => {console.log("prank")}}><p>Time zone</p></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings;
