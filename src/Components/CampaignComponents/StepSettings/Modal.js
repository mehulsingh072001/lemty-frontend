import { useState } from "react"
import StepSettingsBar from "./Bar"
import Window from "./Window"
import Days from "./Days"
import WhichEmail from "./WhichEmail"
// import {GlobalContext} from "../../../GlobalProvider"

const StepSettingsModal = (props) => {
  const [progress, setProgress] = useState(1)
  const [startHour, setStartHour] = useState(props.addStep[props.index]["startHour"])
  const [endHour, setEndHour] = useState(props.addStep[props.index]["endHour"])
  const [selectedDays, setSelectedDays] = useState(props.addStep[props.index]["days"]  !== null ? props.addStep[props.index]["days"] : ["MON","TUE","WED","THU","FRI","SAT","SUN"])
  const [selectedEmail, setSelectedEmail] = useState(props.addStep[props.index]["whichEmail"])

  // const prevStep = () => {
  //   setProgress(progress!==0 ? progress - 1 : null)
  // }

  // const nextStep = () => {
  //   setProgress(progress!==5 ? progress + 1 : null)
  // }

  const selectProgress = (number) => {
    setProgress(number)
  }

  const handleCallback = () => {
    props.addStep[props.index]["startHour"] = startHour
    props.addStep[props.index]["endHour"] = endHour
    props.addStep[props.index]["days"] = selectedDays
    props.addStep[props.index]["whichEmail"] = selectedEmail
    props.setEdited(true)
    props.toggler()
  }

  switch(progress){
    case 1:
      return(
        <div className="step-settings">
          <div className="step-settings__modal">
            <StepSettingsBar progress={progress} selectProgress={selectProgress}/>
            <Window toggler={props.toggler} index={props.index} startHour={startHour} setStartHour={setStartHour} endHour={endHour} setEndHour={setEndHour}/>

            <div className="step-settings__modal--btns">
              <button onClick={props.toggler} className="btn-sec">Cancel</button>
              <button onClick={handleCallback} className="btn">Save</button>
            </div>
          </div>
        </div>
      )
    case 2:
      return(
        <div className="step-settings">
          <div className="step-settings__modal">
            <StepSettingsBar progress={progress} selectProgress={selectProgress}/>
            <Days selectedDays={selectedDays} setSelectedDays={setSelectedDays}/>

            <div className="step-settings__modal--btns">
              <button onClick={props.toggler} className="btn-sec">Cancel</button>
              <button onClick={handleCallback} className="btn">Save</button>
            </div>

          </div>
        </div>
      )
    case 3:
      return(
        <div className="step-settings">
          <div className="step-settings__modal">
            <StepSettingsBar progress={progress} selectProgress={selectProgress}/>
            <WhichEmail selectedEmail={selectedEmail} setSelectedEmail={setSelectedEmail} creds={props.creds}/>

            <div className="step-settings__modal--btns">
              <button onClick={props.toggler} className="btn-sec">Cancel</button>
              <button onClick={handleCallback} className="btn">Save</button>
            </div>
          </div>
        </div>
      )
    case 4:
      return(
        <div className="step-settings">
          <div className="step-settings__modal">
            <StepSettingsBar progress={progress} selectProgress={selectProgress}/>
            <h1>Hello4</h1>

            <div className="step-settings__modal--btns">
              <button onClick={props.toggler} className="btn-sec">Cancel</button>
              <button onClick={handleCallback} className="btn">Save</button>
            </div>
          </div>
        </div>
      )
    case 5:
      return(
        <div className="step-settings">
          <div className="step-settings__modal">
            <StepSettingsBar progress={progress} selectProgress={selectProgress}/>
            <h1>Hello5</h1>

            <div className="step-settings__modal--btns">
              <button onClick={props.toggler} className="btn-sec">Cancel</button>
              <button onClick={handleCallback} className="btn">Save</button>
            </div>
          </div>
        </div>
      )
    default:
      return(
        "hello"
    )
  }
}

export default StepSettingsModal
