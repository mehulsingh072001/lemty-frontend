import { useContext, useState, useEffect } from "react"
import { GlobalContext } from '../../GlobalProvider'
import { useNavigate } from "react-router"

const ProgressBar = (props) => {
  let navigate = useNavigate()
  const [first, setFirst] = useState(false)
  const [step2, setStep2] = useState(false)
  const [step3, setStep3] = useState(false)
  const {campaignBar, step} = useContext(GlobalContext)
  const [progress] = campaignBar
  const [addStep] = step

  useEffect(() => {
    if(progress === 1){
      setFirst(!first)
    }
    if(progress === 2){
      setFirst(!first)
      setStep2(!step2)
      setStep3(!step3)
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveExit = () => {
    props.saveExit()
  }

  const nextStep = () => {
    if(progress === 0){
    }
    if (progress === 1){
      props.saveCampaign()
    }
    props.nextStep()
  }

  return(
    <div className="progress-bar">
      <div className="progress-bar__container">
        <div className={`heading-3 progress-bar__container--progress ${progress===0 ? 'active' : 'unactive'} ${first ? "done" : ""}`}><span className="bullet"></span><p>Add Cadence Steps</p></div>
        <div className={`heading-3 progress-bar__container--progress ${progress===1 ? 'active' : 'unactive'} ${step2 ? "done" : ""}`}><span className="bullet"></span><p>Cadence Name & Settings</p></div>
        <div className={`heading-3 progress-bar__container--progress ${progress===2 ? 'active' : 'unactive'} ${step3 ? "done" : ""}`}><span className="bullet"></span><p>Add Prospects</p></div>
      </div>

      <div className="btns u-margin-bottom-small">
        <button onClick={() => saveExit()} className={`btn-sec ${addStep.length !== 0 ? addStep[0].mails.length !== 0 ? 'active' : 'unactive' : null}`}>Save & Exit</button>
        <button onClick={() => navigate("/campaigns/home")} className={`btn-sec ${addStep.length !== 0 ? addStep[0].mails.length === 0 ? 'active' : 'unactive' : null}`}>Exit</button>
        <button onClick={() => props.prevStep()} className={`btn-sec ${progress===0 ? 'unactive' : 'active'}`}>Previous</button>
        <button onClick={() => {nextStep()}} className={`${addStep[0].mails.length !== 0 ? 'btn' : 'btn--disabled'} ${progress===2 ? 'unactive' : 'active'}`}>Next</button>
      </div>
    </div>
  )
}

export default ProgressBar
