import AppSidebar from "../../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../../Components/Topbars/AppTopbar"
import axios from "axios";

import CampaignSidebar from "../../../Components/Sidebars/CampaignSidebar"
import SingleCampaignNavbar from "../../../Components/CampaignComponents/SingleCampaignNavbar";
import CampaignAdd from "../../../Components/CampaignComponents/CampaignProspects/CampaignAdd"
import ToggleSwitch from "../../../Components/ToggleSwitch";

import {GlobalContext} from "../../../GlobalProvider"
import { useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useParams } from "react-router";

const cookies = new Cookies()
function SingleCampaignSettings() {
  const {addProspectCampaign} = useContext(GlobalContext)
  const [campaignProspectAdd] = addProspectCampaign
  const { id } = useParams()
  const [campaign, setCampaign] = useState({})
  const timezones = [
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
  ]

  const Timezones = timezones.map(Timezone => Timezone)

  const headers = {
      "Authorization": `Bearer ${cookies.get('access_token')}`
  }

  useEffect(() => {
    getCampaignSettings()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCampaignSettings = () => {
    axios.get(`/api/campaigns/single/${id}`, {
      headers: headers
    }).then((res) => {
      setCampaign(res.data)
      console.log(campaign)
    })
  }

  const toggleSwitch = () => {
    setCampaign({...campaign, campaignStop: !campaign.campaignStop})
  }

  return(
    <div className="single-campaign">
      {campaignProspectAdd===true ? <CampaignAdd/> : null}
      <AppSidebar/>
      <AppTopbar title={"Campaign"}/>
      <div className="single-campaign__container">
          <div className="single-campaign__container--sidebar">
            <CampaignSidebar/>
          </div>
          <div className="single-campaign__container--content">
            <SingleCampaignNavbar/>
            <div className="single-campaign__container--content__settings">
              <div className="single-campaign__container--content__settings--item">
                <div>
                  <h4 className="heading-4">Stop Campaign On Reply</h4>
                  <p className="copy__para--small u-margin-top-small">Stop follow up emails when a Prospect replies.</p>
                </div>
                <ToggleSwitch enabled={campaign.campaignStop} toggleSwitch={toggleSwitch}/>
              </div>

              <div className="single-campaign__container--content__settings--item">
                <div>
                  <h4 className="heading-4">Set Time Zone</h4>
                  <p className="copy__para--small u-margin-top-small">Delivery windows used in this Cadence will follow this time zone.</p>
                </div>
                <select value={campaign.timezone}>
                  {Timezones.map((adress, key) => <option key={key} value={adress}>{adress}</option>)}
                </select>
              </div>

              <div className="single-campaign__container--content__settings--item">
                <div>
                  <h4 className="heading-4">Daily Email Limit</h4>
                  <p className="copy__para--small u-margin-top-small">Maximum number of emails to be sent in a day</p>
                </div>
                <input type="number" defaultValue={campaign.dailyLimit}/>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SingleCampaignSettings;
