import axios from "axios"
import Cookies from "universal-cookie";

const cookies = new Cookies()
const CampaignStatus = ({campaign, getData, index, openMenu}) => {
  const toggleDropdown = () => {
    let el = document.getElementById(campaign.id)
    if(el.style.display === "block"){
      el.style.display = "none"
    }
    else{
      el.style.display = "block"
    }
  }

  const pauseCampaign = () => {
    axios.get("/campaigns/pause", {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      },
      params: {
        campaignId: campaign.id
      }
    }).then(() => {
        getData()
        toggleDropdown()
      }
    )
  }

  const resumeCampaign = () => {
    axios.get("/campaigns/resume", {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      },
      params: {
        campaignId: campaign.id
      }
    }).then(() => {
        getData()
        toggleDropdown()
    })
  }


  return(
    <div>
      {
        campaign.status === "Not Started" ? <p className="col-data copy__para--medium">{campaign.status}</p> : 
        <div className="status__dropdown">
          <button className={`btn-sec ${campaign.status === "Active" ? "active" : "paused"}`} onClick={() => toggleDropdown()}><i className="fas fa-circle"></i> <span>{campaign.status}</span><i className="fas fa-caret-down"></i></button>
          <div id={campaign.id} className="status__dropdown--container" style={{display: "none"}}>
            {
            campaign.status === "Active" ? 
              <p onClick={() => pauseCampaign()} className="copy__para--big">Pause</p> : 
              <p onClick={() => resumeCampaign()} className="copy__para--big">Resume</p>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default CampaignStatus;
