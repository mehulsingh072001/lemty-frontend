import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import AppSidebar from "../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../Components/Topbars/AppTopbar"
import ToggleSwitch from "../../Components/ToggleSwitch";

const cookies = new Cookies()
function ProspectSettings(){ 
  let navigate = useNavigate()
  const [intent, setIntent] = useState({})
  const [intentEdited, setIntentEdited] = useState(false)

  useEffect(() => {
    getIntent()
  },[])

  const getIntent = () => {
    axios.get("/api/intent", {
      headers: {
        "Authorization": `Bearer ${cookies.get("access_token")}`
      },
      params: {
        "userId": cookies.get("userId")
      }
    }).then((res) => {
      setIntent(res.data)
    })
  }

  const updateIntent = () => {
    axios.put("/api/intent/update", intent, {
      headers: {
        "Authorization": `Bearer ${cookies.get("access_token")}`
      },
      params: {
        "intentDetectionId": intent.id
      }
    }).then((res) => {
      getIntent()
      setIntentEdited(false)
    })
  }

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
                <button onClick={() => updateIntent()} className={intentEdited ? "btn" : "btn--disabled"}>Save</button>
                <ToggleSwitch/>
              </div>
            </div>

            <div className="points">
              <p className="copy__para--medium">If a Prospect opens an email, assign</p>
              <input type="number" defaultValue={intent.openPoints} onChange={(e) => {setIntent({...intent, openPoints: e.target.value}); setIntentEdited(true)}}/>
            </div>

            <div className="points">
              <p className="copy__para--medium">If a Prospect clicks a link in an email, assign</p>
              <input type="number" defaultValue={intent.clickPoints} onChange={(e) => {setIntent({...intent, clickPoints: e.target.value}); setIntentEdited(true)}}/>
            </div>

            <div className="points">
              <p className="copy__para--medium">A Prospect becomes Hot if they have atleast</p>
              <input type="number" defaultValue={intent.hotPoints} onChange={(e) => {setIntent({...intent, hotPoints: e.target.value}); setIntentEdited(true)}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProspectSettings
