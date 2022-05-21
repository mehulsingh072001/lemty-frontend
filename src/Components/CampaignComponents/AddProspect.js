import AppSidebar from "../Sidebars/AppSidebar";
import AppTopbar from "../Topbars/AppTopbar";
import ProgressBar from "./ProgressBar";
import { GlobalContext } from "../../GlobalProvider";
import { useContext } from "react";
import CampaignAdd from "./CampaignProspects/CampaignAdd";

const AddProspect = (props) => {
  const {addProspectCampaign} = useContext(GlobalContext)
  const [campaignProspectAdd, setCampaignProspectAdd] = addProspectCampaign

  return(
    <div class="campaign-prospects">
      <AppSidebar/>
      {campaignProspectAdd===true ? <CampaignAdd/> : null}
      <AppTopbar title={"Campaigns"}/>
      <div className="campaign-prospects__container">
        <ProgressBar prevStep={props.prevStep} nextStep={props.nextStep} step={props.step}/>
        <div className="campaign-prospects__container--content">
          <button className="btn"  onClick={() => setCampaignProspectAdd(true)}>Add Prospects To Campaign</button>
        </div>
      </div>
    </div>
  )
}

export default AddProspect
