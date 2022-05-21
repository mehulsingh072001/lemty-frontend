import {useState} from "react"
import axios from "axios"
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const UpdateCampaignName = ({campaignId, toggleUpdateName, getData}) => {
  const [name, setName] = useState('')

  const updateCampaignName = () => {
    const token = cookies.get("access_token")
    const data = {
      campaign_name: name
    }
    const params = {
      campaignId: campaignId
    }
    axios.put(`/campaigns/name`, data, {
      headers:{
        "Authorization": `Bearer ${token}`
      },
      params: params
    }).then((res) => {
      if(res.status === 201){
        getData()
        toggleUpdateName()
      }
    })
  }
  return(
    <div className="add-list">
      <div className="add-list__card">
        <h1 className="">Update Campaign Name</h1>
        <div className="add-list__form">
          <input type="text" placeholder="Campaign Name" onChange={(e) => setName(e.target.value)} required/>
        </div>
        <div className="add-list__button">
          <button onClick={() => toggleUpdateName()} className="btn-sec">Cancel</button>
          <button className="btn" onClick={updateCampaignName}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default UpdateCampaignName
