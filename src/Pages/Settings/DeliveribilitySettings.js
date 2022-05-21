import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

import AppSidebar from "../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../Components/Topbars/AppTopbar"

const cookies = new Cookies();
function DeliveribilitySettings(){
  let navigate = useNavigate()
  const [settings, setSettings] = useState({})

  useEffect(() => {
    getSettings()
  }, [])

  function getSettings() {
    const userId = cookies.get("userId")
    axios.get('/deliveribility', {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      },
      params: {
        userId: userId
      }
    }).then((res) => {
      if(res.data === ""){
        console.log(true)
      }
      else{
        setSettings(res.data)
      }
    })
  }

  function updateSettings() {
    axios.put('/deliveribility', settings, {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      },
      params: {
        settingsId: settings.id
      }
    }).then((res) => {
      if(res.status === 200){
        window.location.reload()
      }
    })
  }

  return(
    <div className="deliveribility-settings">
      <AppSidebar/>
      <AppTopbar title={"Settings"}/>

      <div className="deliveribility-settings__container">
        <div className="deliveribility-settings__container--sidebar">
          <button className="s-back" onClick={() => navigate("/settings")}><i className="fas fa-chevron-left"></i><span>Back</span></button>
          <ul>
            <li onClick={() => document.getElementById("profile").scrollIntoView()}><p>Profile</p></li>
            <li onClick={() => document.getElementById("timezone").scrollIntoView()}><p>Timezone</p></li>
          </ul>
        </div>

        <div className="deliveribility-settings__container--content">
          <div className="deliveribility-settings__container--content--card" id="timezone">
            <h4 className="heading-2">Email Interval</h4>
            <div className="deliveribility-settings__container--content--card--head">
              <p className="copy__para--big">Average interval between emails (in seconds)</p>
              <select id="" name="" onChange={e => setSettings({...settings, emailInterval: e.target.value})}>
                <option selected={settings.emailInterval === "random" ? "selected" : ""} value="random">Random</option>
                <option selected={settings.emailInterval === "custom" ? "selected" : ""} value="custom">Custom</option>
              </select>
            </div>

            {settings.emailInterval === "random" ? 
              <div className="row u-margin-top-medium">
                <div className="field__container">
                  <label className="heading-4" htmlFor="">Minimum Interval</label>
                  <input onChange={(e) => setSettings({...settings, minInterval: e.target.value})} value={settings.minInterval} type="number" />
                </div>
                <div className="field__container">
                  <label className="heading-4" htmlFor="">Maximum Interval</label>
                  <input onChange={(e) => setSettings({...settings, maxInterval: e.target.value})} value={settings.maxInterval} type="number" />
                </div>
              </div> :
              <div className="row u-margin-top-medium">
                <div className="field__container">
                  <label htmlFor="">No. of seconds</label>
                  <input type="number" onChange={(e) => setSettings({...settings, seconds: e.target.value})} value={settings.seconds}/>
                </div>
              </div>
            }
      <button className="btn" onClick={() => updateSettings()}>Save</button>
          </div>

          <div className="deliveribility-settings__container--content--card" id="timezone">
            <h4>Custom Tracking Domain</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveribilitySettings;
