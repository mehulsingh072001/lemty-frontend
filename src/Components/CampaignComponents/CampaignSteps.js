import { useContext, useState, useEffect } from "react"
import { GlobalContext } from "../../GlobalProvider"
import axios from "axios"
import Cookies from "universal-cookie";

import AppSidebar from "../Sidebars/AppSidebar";
import AppTopbar from "../Topbars/AppTopbar";
import EmailEditor from "../EmailEditor";
import ProgressBar from "./ProgressBar";
import ToggleSwitch from "../ToggleSwitch";
import StepSettingsModal from "./StepSettings/Modal";
import DelayDropdown from "../DelayDropdown";
import EditEditor from "../EditEditor";

function CampaignSteps(props){
  const cookies = new Cookies()
  const {emailEditor, campaign, step, selectedCampaign} = useContext(GlobalContext)
  const [editor, setEditor] = emailEditor
  const [campaignId, setCampaignId] = selectedCampaign
  const [campaignData, setCampaignData] = campaign
  const [modalOpen, setModalOpen] = useState(false)
  const [editEditor, setEditEditor] = useState(false) 
  const [addStep, setAddStep] = step
  const [currentIndex, setCurrentIndex] = useState()
  const [mailIndex, setMailIndex] = useState()
  const [emailAdded, setEmailAdded] = useState(false)
  const [daySetter, setDaySetter] = useState(0)
  const [stepSetter, setStepSetter] = useState(0)
  const [plainEmail, setPlainEmail] = useState("")
  const [edited, setEdited] = useState(false)
  const [step1, setStep1] = useState(false)
  const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const [creds, setCreds] = useState([])

  useEffect(() => {
    getCreds()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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
      initialStep()
    })
  }

  function toggleEditor(index){
    setEditor(!editor)
    setCurrentIndex(index)
  }

  function toggleEditEditor(index, i){
    setEditEditor(!editEditor)
    setCurrentIndex(index)
    setMailIndex(i)
  }


  function toggleModal(){
    setModalOpen(!modalOpen)
  }

  function toggleSwitch(mailIndex, stepIndex){
    const list = [...addStep];
    // list[index].enabled = !addStep[index].enabled
    list[stepIndex].mails[mailIndex].enabled = !list[stepIndex].mails[mailIndex].enabled
    setAddStep(list)
  }

  function initialStep() {
    if(addStep.length === 0) {
       newStep()
    }
    else{
      console.log(campaignId)
    }
    setCampaignId("")
    console.log(campaignId)
  }

  function newStep(){
      const data = {
        stepNumber: stepSetter + 1,
        day: daySetter + 1,
        dayGap: daySetter,
        hour: 0,
        hourGap: 0,
        minute: 0,
        minuteGap: 0,
        mails: [],
        days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        startHour: "9",
        endHour: "17",
        enabled: true,
        opens: 0,
        replies: 0,
        clicks: 0
      }
      setAddStep(addStep => [...addStep, data]) 
      setDaySetter(daySetter + 1);
      setStepSetter(stepSetter + 1);
  }

  const addNewEmail = (subject, email_content) => {
    const data = {
      subject: subject,
      body: email_content,
      plainBody: plainEmail,
      enabled: true
    }
    let newArr = [...addStep]
    addStep[currentIndex].mails.push(data)
    addStep[currentIndex].whichEmail = creds[0]['email']
    setAddStep(newArr)
    checkr(currentIndex)
    setEmailAdded(!emailAdded)
    setCampaignData({...campaignData, steps: addStep})
  }

  const updateEmail = (subject, email_content) => {
    let arr = [...addStep]
    arr[currentIndex].mails[mailIndex]['subject'] = subject
    arr[currentIndex].mails[mailIndex]['body'] = email_content
    arr[currentIndex].mails[mailIndex]['plainBody'] = plainEmail
    setAddStep(arr)
  }

  function removeStep(index){
    const list = [...addStep];
    list.splice(index, 1);
    setDaySetter(daySetter - 1);
    setStepSetter(stepSetter - 1);
    list.forEach((e, i) => {
      e.stepNumber = i + 1
      e.day = i + 1
      e.dayGap = i + 1
    })
    console.log(list)
    setAddStep(list);
  }

  const checkr = (index) => {
    if (addStep[index].mails.length !== 0){
    }
    else{
    console.log(false)}
  }

  const addStepBetween = (index) => {
    const list = [...addStep];
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
    setAddStep(list)
    setDaySetter(daySetter + 1);
    setStepSetter(stepSetter + 1);
  }

  return (
    <div className="campaign-create">
      <AppSidebar/>
      {editor ? <EmailEditor currentIndex={currentIndex} handleCallback={addNewEmail} setPlainEmail={setPlainEmail}/> : null}
      {editEditor ? <EditEditor currentIndex={currentIndex} mailIndex={mailIndex} handleCallback={updateEmail} setPlainEmail={setPlainEmail} steps={addStep} setEditEditor={setEditEditor}/> : null}
      <AppTopbar title={"Campaigns"}/>
        <div className="campaign-create__container">
          {
            addStep.length === 0 
            ?
              null 
            :
            <ProgressBar prevStep={props.prevStep} nextStep={props.nextStep} step1={step1} setStep1={setStep1} addStep={addStep} saveExit={props.saveExit}/>
          }
        {addStep.map((d, index) => 
             <>
             <div key={index} className="timeline">
                <div className={`campaign-create__container--step ${addStep[index].enabled ? "" : "step-disabled"}`}>
                  <div className="row-1">
                    <div className="row-1__left">
                      {
                        index !== 0 && addStep[index].mails.length !==0 ? 
                          <DelayDropdown steps={addStep} setStep={setAddStep} stepNumber={d.stepNumber} day={d.day} index={index}/>:
                          <h3 key={index} className="heading-2">Step {d.stepNumber}, Day {d.day}</h3>
                      }
                    </div>
                    <div className={`campaign-create__container--step--settings `}>
                    {addStep[index].mails.length!==0 ? 
                      <div className="row-1__right">
                        <div className="row-1__right--item"><p>Assigned to: {addStep[index].whichEmail}</p></div>
                        <div className="row-1__right--item">
                          {
                            addStep[index].days.map( (d, i) => 
                              <p key={i} className="days">{d}</p>
                           )
                          }
                        </div>

                    <button onClick={() => {toggleModal(); setCurrentIndex(index)}} className="btn-tertiary row-1__right--item">Step Settings</button>
                      </div>
                        : null
                    }
                    </div>
                  </div>

                  <div className="row-2">
                    {
                      addStep[index].mails.length===0 ? 
                      <div className="row-2__container--row">
                        <button onClick={() => toggleEditor(index)} className="btn-tertiary">Add Email</button> 
                          {index === 0 
                            ? 
                              null
                            : 
                              <button onClick={() => removeStep(index)} className="btn-sec">Remove Step</button>
                          }
                      </div>
                    : 
                    <div className="row-2__container">
                      {addStep[index].mails.map((m, i) => 
                      <div className="email" key={i}>
                        <div className="email__container">
                          <ToggleSwitch enabled={addStep[index].mails[i].enabled} toggleSwitch={toggleSwitch} stepIndex={index} mailIndex={i}/>
                          <div className="email__info">
                            {
                              addStep[index].mails[i].length === 1 ?
                              <p className="copy__para--medium-light">Email</p>
                              :
                              <p className="copy__para--medium-light">{alphabets[i]}</p>
                            }
                            <p className="copy__para--medium" onClick={() => toggleEditEditor(index, i)}>{m.subject}: {m.plainBody}</p>
                          </div>
                          <div className="options">
                            <button key={index} onClick={() => removeStep(index)} className={`delete-btn`}><i className="fas fa-trash-alt"></i></button>
                          </div>
                        </div>
                      </div>
                      )}
                    </div>
                    }
                  </div>

                 {
                  
                  addStep[index].mails.length===0 ? 
                    null
                    :
                    <div className="row-3">
                    <p className="btn-simple" onClick={() => toggleEditor(index)}>+A/B Test</p>
                    </div>
                 }
                </div>

                {addStep.length !== index + 1? <button onClick={() => addStepBetween(index)} className="btn-add--sec"><i className="fas fa-plus-circle"></i></button> 
                  : 
                <button onClick={newStep} className="btn-add"><i className="fas fa-plus"></i></button>
                }
             </div>
             </>
            )}
        </div>
      { modalOpen ? <StepSettingsModal toggler={toggleModal} addStep={addStep} index={currentIndex} edited={edited} setEdited={setEdited} creds={creds}/> : null}
    </div>
  )
}

export default CampaignSteps;
