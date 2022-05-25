import {useContext} from 'react'
import CampaignSteps from '../../Components/CampaignComponents/CampaignSteps'
import CampaignSettings from '../../Components/CampaignComponents/CampaignSettings'
import AddProspect from '../../Components/CampaignComponents/AddProspect'
import { GlobalContext } from '../../GlobalProvider'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router'


const cookies = new Cookies();
function Create(){
  const navigate = useNavigate()
  const {campaignBar, campaign, selectedCampaign, step} = useContext(GlobalContext)
  const [progress, setProgress] = campaignBar
  const [campaignData] = campaign
  const [campaignId, setCampaignId] = selectedCampaign
  const [addStep, setAddStep] = step

  const prevStep = () => {
    setProgress(progress - 1)
  }

  const nextStep = () => {
    setProgress(progress + 1)
  }

  const saveAndExitCampaign = () => {
    const headers = {
      'Authorization': `Bearer ${cookies.get("access_token")}`
    }
    if(campaignId === ""){
      axios.post(`/campaigns/${cookies.get("userId")}`, campaignData, {headers: headers}).then((res) => {
        if(res.status===201){
          setAddStep([])
          setProgress(0)
          setCampaignId(res.data.id)
          navigate("/campaigns")
        }
      })
    }
    else {
      axios.put(`/campaigns/${campaignId}`, campaignData, {headers: headers}).then((res) => {
        if(res.status===200){
          setAddStep([])
          setProgress(0)
          navigate("/campaigns")
        }
      })
    }
  }

  const saveCampaign = () => {
    const headers = {
      'Authorization': `Bearer ${cookies.get("access_token")}`
    }
    if(campaignId === ""){
      axios.post(`/campaigns/${cookies.get("userId")}`, campaignData, {headers: headers}).then((res) => {
        if(res.status===201){
          setCampaignId(res.data.id)
        }
      })
    }
    else {
      axios.put(`/campaigns/${campaignId}`, campaignData, {headers: headers}).then((res) => {
        if(res.status===200){
          console.log(res.data.id)
        }
      })
    }
  }


  switch(progress){
    case 0: 
      return(
        <CampaignSteps nextStep={nextStep} prevStep={prevStep} saveExit={saveAndExitCampaign} saveCampaign={saveCampaign} addStep={addStep} setAddStep={setAddStep}/>
      )
    case 1:
      return(
        <CampaignSettings 
          nextStep={nextStep} 
          prevStep={prevStep} 
          saveExit={saveAndExitCampaign} 
          saveCampaign={saveCampaign}
          addStep={addStep} 
          setAddStep={setAddStep}
        />
      )
    case 2:
      return(
        <AddProspect nextStep={nextStep} prevStep={prevStep}/>
      )
    default:
      return progress
  }
}

export default Create
