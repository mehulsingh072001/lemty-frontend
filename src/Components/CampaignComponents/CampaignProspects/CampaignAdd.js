import {useContext} from "react"
import { GlobalContext } from "../../../GlobalProvider"
import Upload from "./CampaignUpload/CampaignUpload"
import CampaignProspectNew from "./CampaignProspectNew"
import CampaignProspectsExisting from "./CampaignProspectsExisting"

function CampaignAdd(){
  const {newProspect, upload, addExistingProspect, addProspectCampaign} = useContext(GlobalContext)
  const [newUpload, setNewUpload] = upload
  const [campaignProspectAdd, setCampaignProspectAdd] = addProspectCampaign
  const [newP, setNewP] = newProspect
  const [addExistingModal, setAddExistingModal] = addExistingProspect

  function toggleAdd(){
    setCampaignProspectAdd(!campaignProspectAdd)
  }

  function toggleNew(){
    setNewP(!newP)
  }

  function toggleUpload(){
    setNewUpload(!newUpload)
  }
  return(
    <div className="add">
      {newP===true ? <CampaignProspectNew/> : null}
      {newUpload===true ? <Upload/> : console.log('null')}
      {addExistingModal===true ? <CampaignProspectsExisting/> : null}
      <nav class="nav">
        <h1 className="copy__para--big">Add Prospects</h1>
        <div>
          <button onClick={() => toggleAdd()} className="btn-close">&times;</button>
        </div>
      </nav>

      <div className="add__container">
        <h2 className="heading-1">How would you like to add Prospects?</h2>

        <button onClick={toggleUpload} className="add__container--card">
          <i class="fas fa-file-csv"></i>
          <p>Upload CSV file</p>
          <i class="fas fa-arrow-right"></i>
        </button>
        <button onClick={toggleNew} className="add__container--card">
          <i class="fas fa-user"></i>
          <p>Create A New Prospect</p>
          <i class="fas fa-arrow-right"></i>
        </button>
        <button onClick={() => setAddExistingModal(!addExistingModal)} className="add__container--card">
          <i class="fas fa-users"></i>
          <p>Add Existing Prospect</p>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}

export default CampaignAdd
