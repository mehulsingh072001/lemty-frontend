import {useEffect, useContext} from 'react'
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
  const {campaignBar, campaign, selectedCampaign, step, campaignName} = useContext(GlobalContext)
  const [progress, setProgress] = campaignBar
  const [campaignNameCount, setCampaignNameCount] = campaignName
  const [campaignData, setCampaignData] = campaign
  const [campaignId, setCampaignId] = selectedCampaign
  const [addStep, setAddStep] = step

  useEffect(() => {
    if(campaignData.name === undefined){
      newCampaign()
    }
    else{
      console.log(campaignData.name)
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const prevStep = () => {
    setProgress(progress - 1)
  }

  const nextStep = () => {
    setProgress(progress + 1)
  }

  const newCampaign = () => {
    const campaign = {
      campaign_name: `Campaign ${campaignNameCount}`,
      timezone: "Asia/Kolkata",
      dailyLimit: 100,
      stop: true
    }
    setCampaignData(campaign)
  }

  const saveAndExitCampaign = () => {
    const headers = {
      'Authorization': `Bearer ${cookies.get("access_token")}`
    }
    if(campaignId === ""){
      axios.post(`/api/campaigns/${cookies.get("userId")}`, campaignData, {headers: headers}).then((res) => {
        if(res.status===201){
          setAddStep([])
          setProgress(0)
          setCampaignId(res.data.id)
          navigate("/campaigns")
        }
      })
    }
    else {
      axios.put(`/api/campaigns/${campaignId}`, campaignData, {headers: headers}).then((res) => {
        if(res.status===200){
          setAddStep([])
          setProgress(0)
          navigate("/campaigns")
        }
      })
    }
    setCampaignNameCount(campaignNameCount + 1)
  }

  const saveCampaign = () => {
    const headers = {
      'Authorization': `Bearer ${cookies.get("access_token")}`
    }
    if(campaignId === ""){
      axios.post(`/api/campaigns/${cookies.get("userId")}`, campaignData, {headers: headers}).then((res) => {
        if(res.status===201){
          setCampaignId(res.data.id)
        }
      })
    }
    else {
      axios.put(`/api/campaigns/${campaignId}`, campaignData, {headers: headers}).then((res) => {
        if(res.status===200){
          console.log(res.data.id)
        }
      })
    }
    setCampaignNameCount(campaignNameCount + 1)
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
          campaignNameCount={campaignNameCount}
        />
      )
    case 2:
      return(
        <AddProspect nextStep={nextStep} prevStep={prevStep} campaignId={campaignId}/>
      )
    default:
      return progress
  }
}

export default Create
