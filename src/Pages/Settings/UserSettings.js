import {useNavigate} from "react-router-dom"
import AppSidebar from "../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../Components/Topbars/AppTopbar"
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie"

const cookies = new Cookies()
function UserSettings(){
  let navigate = useNavigate()
  const [selectTimezone] = useState('America/Los_Angeles')
  const [user, setUser] = useState({})
  const [firstName, setFirstName] = useState(Object.keys(user).length !== 0 ? user.firstName : "")
  const [lastName, setLastName] = useState(Object.keys(user).length !== 0 ? user.lastName : "")
  const [timezones] = useState([
    'America/Los_Angeles',
    'Africa/Accra',
    'Africa/Addis_Ababa',
    'Africa/Algiers',
    'Africa/Cairo',
    'Africa/Casablanca',
    'Africa/Dar_es_Salaam',
    'Africa/Harare',
    'Africa/Johannesburg',
    'Africa/Khartoum',
    'Africa/Kigali',
    'Africa/Kinshasa',
    'Africa/Lagos',
    'Africa/Nairobi',
    'America/Anchorage',
    'America/Argentina/Buenos_Aires',
    'America/Asuncion',
    'America/Atikokan',
    'America/Bogota',
    'America/Caracas',
    'America/Chicago',
    'America/Denver',
    'America/El_Salvador',
    'America/Havana',
    'America/Indiana/Indianapolis',
    'America/La_Paz',
    'America/Lima',
    'America/Managua',
    'America/Mexico_City',
    'America/Montevideo',
    'America/Nassau',
    'America/New_York',
    'America/Phoenix',
    'America/Santiago',
    'America/Santo_Domingo',
    'America/Sao_Paulo',
    'America/St_Johns',
    'America/Tegucigalpa',
    'America/Vancouver',
    'America/Winnipeg',
    'Asia/Almaty',
    'Asia/Amman',
    'Asia/Anadyr',
    'Asia/Baghdad',
    'Asia/Bangkok',
    'Asia/Calcutta',
    'Asia/Dhaka',
    'Asia/Dubai',
    'Asia/Hong_Kong',
    'Asia/Istanbul',
    'Asia/Jakarta',
    'Asia/Jayapura',
    'Asia/Jerusalem',
    'Asia/Kabul',
    'Asia/Karachi',
    'Asia/Kathmandu',
    'Asia/Kuala_Lumpur',
    'Asia/Kuwait',
    'Asia/Manila',
    'Asia/Qatar',
    'Asia/Rangoon',
    'Asia/Riyadh',
    'Asia/Seoul',
    'Asia/Shanghai',
    'Asia/Singapore',
    'Asia/Taipei',
    'Asia/Tashkent',
    'Asia/Tehran',
    'Asia/Tokyo',
    'Atlantic/Reykjavik',
    'Australia/Adelaide',
    'Australia/Darwin',
    'Australia/Melbourne',
    'Australia/Perth',
    'Australia/Sydney',
    'Canada/Atlantic',
    'Europe/Amsterdam',
    'Europe/Belgrade',
    'Europe/Berlin',
    'Europe/Bratislava',
    'Europe/Brussels',
    'Europe/Bucharest',
    'Europe/Budapest',
    'Europe/Copenhagen',
    'Europe/Dublin',
    'Europe/Helsinki',
    'Europe/Lisbon',
    'Europe/London',
    'Europe/Madrid',
    'Europe/Minsk',
    'Europe/Moscow',
    'Europe/Oslo',
    'Europe/Paris',
    'Europe/Rome',
    'Europe/Sofia',
    'Europe/Stockholm',
    'Europe/Tallinn',
    'Europe/Vienna',
    'Europe/Warsaw',
    'Europe/Zagreb',
    'Europe/Zurich',
    'Pacific/Auckland',
    'Pacific/Fiji',
    'Pacific/Honolulu',
    'Pacific/Kiritimati',
  ])
  const Timezones = timezones.map(Timezone => Timezone)
  const handleTimezoneChange = (e) => {
    console.clear()
    selectTimezone(timezones[e.target.value])
  }

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = () => {
    const userId = cookies.get("userId")
    axios.get(`/api/users/${userId}`, {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      }
    }).then((res) => {
      setUser(res.data)
    })
  }

  const updateData = () => {
    const data = {
      firstName: firstName,
      lastName: lastName,
    }
    axios.put(`/api/users/update/${cookies.get("userId")}`, data, {
      headers:{
        "Authorization": `Bearer ${cookies.get("access_token")}`
      }
    }).then((res) => {
      if(res.status === 201){
        getUserData()
      }
    })
  }

  const deleteUser = () => {
    axios.delete(`/api/users/delete/${cookies.get("userId")}`, {
      headers:{
        "Authorization": `Bearer ${cookies.get("access_token")}`
      }
    }).then((res) => {
      navigate("/login")
    })
  }


  return(
    <div className="user-settings">
      <AppSidebar/>
      <AppTopbar title={"Settings"}/>

      <div className="user-settings__container">
        <div className="user-settings__container--sidebar">
          <button className="s-back" onClick={() => navigate("/settings")}><i className="fas fa-chevron-left"></i><span>Back</span></button>
          <ul>
            <li onClick={() => document.getElementById("profile").scrollIntoView()}><p>Profile</p></li>
            <li onClick={() => document.getElementById("timezone").scrollIntoView()}><p>Timezone</p></li>
          </ul>
        </div>

        <div className="user-settings__container--content">
          <div className="user-settings__container--content--card" id="profile">
            <h4 className="heading-2">Profile</h4>
            <div className="row">
              <div className="field__container">
                <label className="heading-4" htmlFor="">First name</label>
                <input type="text" onChange={(e) => setFirstName(e.target.value)} defaultValue={Object.keys(user).length !== 0 ? user.firstName : ""}/>
              </div>
              <div className="field__container">
                <label className="heading-4" htmlFor="">Last name</label>
                <input type="text" onChange={(e) => setLastName(e.target.value)} defaultValue={Object.keys(user).length !== 0 ? user.lastName : ""}/>
              </div>

              <button className="btn" onClick={() => updateData()}>Save</button>
            </div>
            <button className="btn-white u-margin-top-small">Change Password</button>
          </div>

          <div className="user-settings__container--content--card" id="timezone">
            <h4>Timezone</h4>
            <p>This timezone will be used when scheduling emails.</p>
            <select id="" name="" onChange={e => handleTimezoneChange(e)}>
              {Timezones.map((adress, key) => <option key={key} value={key}>{adress}</option>)}
            </select>
          </div>
          <button className="btn-delete" onClick={() => deleteUser()}>Delete</button>
        </div>
    </div>
      </div>
  )
}

export default UserSettings;
