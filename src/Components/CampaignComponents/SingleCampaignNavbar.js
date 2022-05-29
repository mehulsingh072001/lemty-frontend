import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import {useContext, useEffect} from "react"

import { GlobalContext } from "../../GlobalProvider"

function SingleCampaignNavbar(){
  const { id } = useParams()
  const {addProspectCampaign, selectedCampaign} = useContext(GlobalContext)
  const [setCampaignProspectAdd] = addProspectCampaign;
  const [campaignId, setCampaignId] = selectedCampaign

  useEffect(() => {
    setCampaignId(id)
    console.log(campaignId)
   // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
