import { useContext } from "react"
import { GlobalContext } from '../../GlobalProvider'
import { useNavigate } from "react-router"

const ProgressBar = (props) => {
  let navigate = useNavigate()
  const {campaignBar, step} = useContext(GlobalContext)
  const [progress] = campaignBar
  const [addStep] = step

  const saveExit = () => {
    props.saveExit()
  }

  const nextStep = () => {
    if(progress === 1){
      props.saveCampaign()
    }
    props.nextStep()
  }

  return(
    <div className="progress-bar">
      <div className="progress-bar__container">
        <div className={`heading-3 progress-bar__container--progress ${progress===0 ? 'active' : 'unactive'}`}><div className="bullet"/><p>Add Cadence Steps</p></div>
        <div className={`heading-3 progress-bar__container--progress ${progress===1 ? 'active' : 'unactive'}`}><div className="bullet"/><p>Cadence Name & Settings</p></div>
        <div className={`heading-3 progress-bar__container--progress ${progress===2 ? 'active' : 'unactive'}`}><div className="bullet"/><p>Add Prospects</p></div>
      </div>

      <div className="btns u-margin-bottom-small">
        <button onClick={() => saveExit()} className={`btn-sec ${addStep.length !== 0 ? addStep[0].mails.length !== 0 ? 'active' : 'unactive' : null}`}>Save & Exit</button>
        <button onClick={() => navigate("/campaigns/home")} className={`btn-sec ${addStep.length !== 0 ? addStep[0].mails.length === 0 ? 'active' : 'unactive' : null}`}>Exit</button>
        <button onClick={() => props.prevStep()} className={`btn-sec ${progress===0 ? 'unactive' : 'active'}`}>Previous</button>
        <button onClick={() => nextStep()} className={`btn`}>Next</button>
      </div>
    </div>
  )
}

export default ProgressBar
