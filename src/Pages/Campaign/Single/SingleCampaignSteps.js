import axios from "axios";
import AppSidebar from "../../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../../Components/Topbars/AppTopbar"
import CampaignSidebar from "../../../Components/Sidebars/CampaignSidebar"
import SingleCampaignNavbar from "../../../Components/CampaignComponents/SingleCampaignNavbar";
import CampaignAdd from "../../../Components/CampaignComponents/CampaignProspects/CampaignAdd"
import {useState, useEffect} from "react";
import { useParams } from "react-router";
import Cookies from 'universal-cookie';
import ToggleSwitch from "../../../Components/ToggleSwitch";
import { GlobalContext } from "../../../GlobalProvider";
import { useContext, useCallback } from "react";
import StepSettingsModal from "../../../Components/CampaignComponents/StepSettings/Modal";
import EditEditor from "../../../Components/EditEditor";
import EmailEditor from "../../../Components/EmailEditor";

const cookies = new Cookies()
function SingleCampaignSteps() {
  const { id } = useParams()
  const {addProspectCampaign, emailEditor} = useContext(GlobalContext)
  const [campaignProspectAdd] = addProspectCampaign
  const [steps, setSteps] = useState([])
  const [currentIndex, setCurrentIndex] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [editEditor, setEditEditor] = useState(false) 
  const [mailIndex, setMailIndex] = useState()
  const [edited, setEdited] = useState(false)
  const [plainEmail, setPlainEmail] = useState("")
  const [editor, setEditor] = emailEditor
  const [emailAdded, setEmailAdded] = useState(false)
  const [creds, setCreds] = useState([])

  const headers = {
      "Authorization": `Bearer ${cookies.get('access_token')}`
  }

  const getSteps = useCallback(() => {
    axios.get(`/api/steps/${id}`, {
      headers: headers
    }).then((res) => {
      setSteps(res.data)
    })
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getSteps()
    getCreds()
  }, [getSteps])

  const getCreds = () => {
    const params = {
      userId: cookies.get("userId")
    }
    const headers = {
        "Authorization": `Bearer ${cookies.get('access_token')}`
    }
    axios.get(`/api/creds/`, {
      params : params,
      headers: headers
    }).then((res) => {
      setCreds(res.data)
    })
  }



  const discard = () => {
    getSteps()
    setEdited(false)
  }

  const save = () => {
    const token = cookies.get("access_token")
    const data = {
      steps: steps
    }
    const params = {
      campaignId: id
    }
    axios.put(`/api/campaigns/steps`, data, {
      headers:{
        "Authorization": `Bearer ${token}`
      },
      params: params
    }).then((res) => {
      if(res.status === 201){
        getSteps()
        setEdited(false)
      }
    })
  }

  
  function toggleSwitch(mailIndex, stepIndex){
    const list = [...steps];
    // list[index].enabled = !addStep[index].enabled
    list[stepIndex].mails[mailIndex].enabled = !list[stepIndex].mails[mailIndex].enabled
    setSteps(list)
  }

  function toggleModal(){
    setModalOpen(!modalOpen)
  }

  const checkr = (index) => {
    if (steps[index].mails.length !== 0){
    }
    else{
    console.log(false)}
  }

  function toggleEditor(index){
    setEditor(!editor)
    setCurrentIndex(index)
  }


  const addNewEmail = (subject, email_content) => {
    const data = {
      subject: subject,
      body: email_content,
      plainBody: plainEmail,
      enabled: true
    }
    let newArr = [...steps]
    steps[currentIndex].mails.push(data)
    setSteps(newArr)
    checkr(currentIndex)
    setEmailAdded(!emailAdded)
  }

  const updateEmail = (subject, email_content) => {
    let arr = [...steps]
    arr[currentIndex].mails[mailIndex]['subject'] = subject
    arr[currentIndex].mails[mailIndex]['body'] = email_content
    arr[currentIndex].mails[mailIndex]['plainBody'] = plainEmail
    setSteps(arr)
    setEdited(true)
  }

  const addStepBetween = (index) => {
    const list = [...steps];
    const data = {
      stepNumber: (index + 1) + 1,
      day: (index + 1) + 1,
      dayGap: (index + 1) + 1,
      hour: 0,
      hourGap: 0,
      minute: 0,
      minuteGap: 0,
      mails: [],
      days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      enabled: true
    }
    list.splice(index + 1, 0, data)
    list.forEach((e, i) => {
      e.stepNumber = i + 1
      e.day = i + 1
      e.dayGap = i + 1
    })
    setSteps(list)
    // setDaySetter(daySetter + 1);
    // setStepSetter(stepSetter + 1);
  }

  function removeStep(index){
    const list = [...steps];
    list.splice(index, 1);
    list.forEach((e, i) => {
      e.stepNumber = i + 1
      e.day = i + 1
      e.dayGap = i + 1
    })
    console.log(list)
    setSteps(list);
  }

  function toggleEditEditor(index, i){
    setEditEditor(!editEditor)
    setCurrentIndex(index)
    setMailIndex(i)
  }
  
  return(
    <div className="single-campaign">
      {campaignProspectAdd===true ? <CampaignAdd campaignId={id}/> : null}
      <AppSidebar/>
      {editor ? <EmailEditor currentIndex={currentIndex} handleCallback={addNewEmail} setPlainEmail={setPlainEmail}/> : null}
      {editEditor ? <EditEditor currentIndex={currentIndex} mailIndex={mailIndex} handleCallback={updateEmail} setPlainEmail={setPlainEmail} steps={steps} setEditEditor={setEditEditor}/> : null}
      <AppTopbar title={"Campaign"}/>
      <div className="single-campaign__container">
          <div className="single-campaign__container--sidebar">
            <CampaignSidebar/>
          </div>
          <div className="single-campaign__container--content">
            <SingleCampaignNavbar/>
            {
               steps.map((e, i) => 

             <div key={i} className="timeline">
                <div key={i} className={`single-campaign__container--content--steps ${e.enabled ? "" : "step-disabled"}`}>
                  <div className="row-1">
                    <div className="row-1__left">
                      <h3 className="heading-2">Step {e.stepNumber}, Day {e.day}</h3>
                    </div>

                    <div className="settings">
                      {
                        e.mails.length === 0 ?
                          null
                          :
                        <div className="row-1__right">
                          <div className="row-1__right--item"><p className="copy__para--small">Assigned to: {e.whichEmail}</p></div>
                          <div className="row-1__right--item">
                            {
                              e.days.map( (d, index) => 
                                <p key={index} className="days copy__para--small">{d}</p>
                             )
                            }
                          </div>

                          <div onClick={() => {toggleModal(); setCurrentIndex(i)}} className="btn-tertiary row-1__right--item"> <p>Step Settings</p></div>
                        </div>
                      }
                    </div>
                  </div>

                  <div className="row-2">
                    {
                      e.mails.length === 0 ? 
                      <div className="row-2__container">
                        <button onClick={() => toggleEditor(i)} className="btn-tertiary">Add Email</button> 
                          {i === 0 
                            ? 
                              null
                            : 
                              <button onClick={() => removeStep(i)} className="btn-sec">Remove Step</button>
                          }
                      </div>
                    :
                    <div className="row-2__container">
                        {
                          e.mails.map((d, index) => 
                          <div key={i} className="email">
                          <ToggleSwitch enabled={steps[i].mails[index].enabled} toggleSwitch={toggleSwitch} stepIndex={i} mailIndex={index}/>
                            <div className="email__info">
                              <p className="head copy__para--medium-light">Email</p>
                              <p onClick={() => toggleEditEditor(i, index)} className="copy__para--medium">{d.subject}: {d.plainBody}</p>
                            </div>
                          </div>
                         )
                        }
                      <div className="options">
                        {
                          e.enabled ? null :  <button key={i} onClick={() => console.log("ff")} className="delete">Delete Step</button>
                        }
                      </div>
                    </div>
                    }
                  </div>

                   <div className="row-3">
                     <p className="btn-simple">+A/B Test</p>
                   </div>
                </div>
                {
                  steps.length !== i + 1 ? <button onClick={() => addStepBetween(i)} className="btn-add--sec"><i className="fas fa-plus-circle"></i></button> 
                    : 
                    <button onClick={() => addStepBetween(i)} className="btn-add"><i className="fas fa-plus"></i></button>
                }
                </div>
              )
            }
            {
              edited ? 
            <div className="save-discard">
              <button onClick={() => discard()} className="btn-sec">Discard</button>
              <button onClick={() => save()} className="btn">Save</button>
            </div>
              : 
                null
            }
          </div>
      </div>
      { modalOpen ? <StepSettingsModal toggler={toggleModal} index={currentIndex} addStep={steps} setEdited={setEdited} creds={creds}/>: null}
    </div>
  )
}

export default SingleCampaignSteps;
