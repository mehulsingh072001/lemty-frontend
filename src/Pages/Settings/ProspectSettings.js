import {useNavigate} from "react-router-dom"
import AppSidebar from "../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../Components/Topbars/AppTopbar"

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
            <li onClick={() => document.getElementById("account").scrollIntoView()}><p>Email Account</p></li>
            <li onClick={() => document.getElementById("signatures").scrollIntoView()}><p>Signatures</p></li>
            <li onClick={() => document.getElementById("unsub").scrollIntoView()}><p>Unsubscribe Link</p></li>
            <li onClick={() => document.getElementById("tracking").scrollIntoView()}><p>Tracking</p></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProspectSettings
