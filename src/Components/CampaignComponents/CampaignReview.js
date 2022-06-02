import { GlobalContext } from "../../GlobalProvider";
import { useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "universal-cookie";
import moment from "moment";

import Preview from "./Preview";

const cookies = new Cookies()
function CampaignReview({selectedProspects, toggleHome, toggleReview}) {
  const {selectedCampaign, preview, step, campaignBar} = useContext(GlobalContext)
  const [progress, setProgress] = campaignBar
  const [addStep, setAddStep] = step
  const [campaignId, setCampaignId] = selectedCampaign
  const [previewModal, setPreviewModal] = preview
  const navigate = useNavigate();

  const togglePreview = () => {
    setPreviewModal(!previewModal)
  }

  const campaignStart = () => {
    const x = moment().format();
    console.log(x)

    const data = {
      selectedProspects: selectedProspects,
      selectedCampaign: campaignId,
      startAt: x
    }
    axios.post("/api/job/campaign/start", data, {
        headers: {
          "Authorization": `Bearer ${cookies.get('access_token')}`
        },
        params: {
          userId: cookies.get("userId")
        }
    }).then((res) => {
      if(res.status === 200){
        toggleHome()
        setAddStep([])
        navigate(`/campaigns/${campaignId}/step`)
        setProgress(0)
        console.log(progress)
        console.log(addStep)
        setCampaignId("")
      }
    })
  }

  return (
    <div className="campaign-review">
      {previewModal ? <Preview selectedProspects={selectedProspects} togglePreview={togglePreview} toggleHome={toggleHome} campaignId={campaignId} setProgress={setProgress} setAddStep={setAddStep}/> : null}
      <nav className="nav">
        <div className="col-1">
          <button onClick={toggleReview} className="btn-back"><i className="fas fa-chevron-left"></i></button>
          <h1 className="copy__para--big">Add Prospects To Campaign</h1>
        </div>
        <div className="col-2">
          <button className="btn-sec" onClick={togglePreview}>Preview & Start</button>
          <button className="btn" onClick={() => campaignStart()}>Start Campaign</button>
          <button onClick={toggleHome} className="btn-close">&times;</button>
        </div>
      </nav>

      <div className="campaign-review__container">
        <h1 className="heading-3-black">{selectedProspects.length} prospect(s) selected for Campaign Name</h1>
        <div className="campaign-review__container--item">
          <div>
            <h1 className="heading-2"><i className="fas fa-user-circle"></i> Prospects</h1>
          </div>

          <div>
            <p className="heading-4">{selectedProspects.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignReview;
