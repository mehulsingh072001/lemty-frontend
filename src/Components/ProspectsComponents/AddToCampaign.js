import {useState, useEffect, useContext} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { GlobalContext } from "../../GlobalProvider";

import CampaignReview from "../CampaignComponents/CampaignReview";
const cookies = new Cookies()
const AddToCampaign = ({toggleAddTo, selectedProspects}) => {
  const {selectedCampaign} = useContext(GlobalContext)
  const [campaignId, setCampaignId] = selectedCampaign
  const [campaigns, setCampaigns] = useState([])
  const [review, setReview] = useState(false)

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const userId = cookies.get("userId")
    await axios.get(`/campaigns/${userId}`, {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      }
    }).then((res) => {
      if(res.data === ""){
      }
      else{
       setCampaigns(res.data)
      }
    })
  }

  const toggleReview = () => {
    setReview(!review)
  }

  const toggleHome = () => {
    getData()
    setReview(false)
    toggleAddTo()
  }

  return(
    <div className="add-to-campaign">
      {review ? <CampaignReview selectedProspects={selectedProspects} toggleReview={toggleReview} toggleHome={toggleHome}/> : null}
      <nav className="nav">
        <h1 className="heading-2">Add Prospects</h1>
        <button onClick={toggleHome} className="btn-close">&times;</button>
      </nav>
      <div className="add-to-campaign__container">
        <div className="add-to-campaign__container--filters">
          <p className="copy__para--medium">Filter Campaigns By</p>
          <ul className="links">
            <li className="copy__para--medium active">My Campaigns</li>
            <li className="copy__para--medium">All Campaigns</li>
          </ul>
        </div>
        <div className="add-to-campaign__container--list">
          <p className="copy__para--medium">Select Campaign</p>
          <input type="search" className="search" placeholder="Search"/>
          {
            campaigns.map((d, index) =>
                <div key={index} onClick={() => {setCampaignId(d.id); toggleReview()}} className="campaigns">
                <h1 className="heading-4">{d.campaign_name}</h1>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default AddToCampaign;
