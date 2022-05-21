import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import { useParams } from "react-router";
import {useContext, useState, useEffect} from "react"

import { GlobalContext } from "../../GlobalProvider"

function SingleCampaignNavbar(){
  let navigate = useNavigate()
  const { id } = useParams()
  const {addProspect, newProspect, upload, addProspectCampaign, selectedCampaign} = useContext(GlobalContext)
  const [campaignProspectAdd, setCampaignProspectAdd] = addProspectCampaign;
  const [campaignId, setCampaignId] = selectedCampaign

  useEffect(() => {
    setCampaignId(id)
  })

  return(
    <div className="single-campaign-navbar">
        <ul className="single-campaign-navbar__links">
          <li><NavLink to={`/campaigns/${id}/step`}>Steps</NavLink></li>
          <li><NavLink to={`/campaigns/${id}/prospects`}>Prospects</NavLink></li>
          <li><NavLink to={`/campaigns/${id}/inbox`}>Inbox</NavLink></li>
          <li><NavLink to={`/campaigns/${id}/emails`}>Emails</NavLink></li>
          <li><NavLink to={`/campaigns/${id}/reports`}>Reports</NavLink></li>
          <li><NavLink to={`/campaigns/${id}/settings`}>Settings</NavLink></li>
        </ul>
      <button className="btn" onClick={() => setCampaignProspectAdd(true)}>+ Add Prospects To Campaign</button>
    </div>
  )
}

export default SingleCampaignNavbar;
