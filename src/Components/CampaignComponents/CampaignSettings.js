import ProgressBar from "./ProgressBar"
import AppSidebar from "../Sidebars/AppSidebar"
import AppTopbar from "../Topbars/AppTopbar"
import {useContext, useState} from "react"
import ToggleSwitch from "../ToggleSwitch"
import {GlobalContext} from "../../GlobalProvider"
import { useEffect } from "react"

const CampaignSettings = (props) => {
  const {campaign} = useContext(GlobalContext)
  const [campaignData, setCampaignData] = campaign
  const [stop, setStop] = useState(true)
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
    'Asia/Kolkata',
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

  function toggleSwitch(){
    setStop(!stop)
    setCampaignData({...campaignData, campaignStop: !stop})
  }

  const newCampaign = () => {
    const campaign = {
      campaign_name: `Campaign ${props.campaignNameCount}`,
      timezone: "Asia/Kolkata",
      dailyLimit: 100,
      stop: true
    }
    setCampaignData(campaign)
  }

//   const handleChange = () => {
//     setCampaignData({...campaignData, campaign_name: campaignName, campaignStop: stop, dailyLimit: limit, timezone: selectedTimezone})
//   }

  return(
    <div className="campaign-settings">
      <AppSidebar/>
      <AppTopbar title={"Campaigns"}/>
      <div className="campaign-create__container">
        <ProgressBar saveExit={props.saveExit} saveCampaign={props.saveCampaign} prevStep={props.prevStep} nextStep={props.nextStep} step={props.step}/>
        <div className="campaign-settings__container--name">
          <p className="u-settings-title u-margin-bottom-small heading-4-light">Cadence Name</p>
          <input type="text" name="name" value={campaignData.campaign_name} required onChange={(e) => setCampaignData({...campaignData, campaign_name: e.target.value})}/>
        </div>

        <div className="campaign-settings__container--settings">
          <p className="u-settings-title u-margin-bottom-small heading-4-light">Cadence Settings</p>

          <div className="timezone">
            <p className="copy__para--medium">Set Time Zone</p>
            <select onChange={(e) => setCampaignData({...campaignData, timezone: timezones[e.target.value]})}>
              {Timezones.map((adress, key) => <option key={key} value={key}>{adress}</option>)}
            </select>
          </div>

          <div className="limit">
            <p>Set Number of emails to be sent in a day</p>
            <input type="number" defaultValue={campaignData.dailyLimit} required onChange={(e) => setCampaignData({...campaignData, dailyLimit: e.target.value})}/>
          </div>

          <div className="stop">
            <p className="copy__para--medium">Stop Cadence on Reply</p>
            <ToggleSwitch
              enabled={stop}
              toggleSwitch={toggleSwitch}
            />
          </div>
          {/* <button onClick={handleChange, sendData}>Save</button> */}
        </div>
      </div>
    </div>
  )
}

export default CampaignSettings
