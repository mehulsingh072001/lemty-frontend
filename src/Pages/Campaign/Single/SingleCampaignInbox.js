import axios from "axios";

import AppSidebar from "../../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../../Components/Topbars/AppTopbar"

import CampaignSidebar from "../../../Components/Sidebars/CampaignSidebar"
import SingleCampaignNavbar from "../../../Components/CampaignComponents/SingleCampaignNavbar";
import CampaignAdd from "../../../Components/CampaignComponents/CampaignProspects/CampaignAdd"

import {GlobalContext} from "../../../GlobalProvider"
import { useContext } from "react";

function SingleCampaignInbox() {
  const {addProspectCampaign} = useContext(GlobalContext)
  const [campaignProspectAdd, setCampaignProspectAdd] = addProspectCampaign
  return(
    <div className="single-campaign">
      {campaignProspectAdd===true ? <CampaignAdd/> : console.log('null')}
      <AppSidebar/>
      <AppTopbar title={"Campaign"}/>
      <div className="single-campaign__container">
          <div className="single-campaign__container--sidebar">
            <CampaignSidebar/>
          </div>
          <div className="single-campaign__container--content">
            <SingleCampaignNavbar/>
            <h1>Settings</h1>
          </div>
      </div>
    </div>
  )
}

export default SingleCampaignInbox;
