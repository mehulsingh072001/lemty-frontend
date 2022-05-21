import {useEffect} from "react"

const DelayDropdown = ({index, day, stepNumber, steps, setStep}) => {

  const toggleDropdown = () => {
    let el = document.getElementsByClassName("dropdown__container--content")[index-1]
    if(el.style.display === "block"){
      el.style.display = "none";
    }
    else{
      el.style.display = "block";
    }
  }

  const handleDayChange = (e) => {
    let arr = [...steps]
    console.log(arr[index].day)
    arr[index].day = e.target.value
    arr[index].day++;
    arr[index].dayGap = e.target.value
    setStep(arr)
    // step.day = e.target.value;
    // step.dayGap = e.target.value;
  }

  const handleHourChange = (e) => {
    let arr = [...steps]
    arr[index].hour = e.target.value;
    arr[index].hour++;
    arr[index].hourGap = e.target.value
    setStep(arr)
  }

  const handleMinuteChange = (e) => {
    let arr = [...steps]
    arr[index].minute = e.target.value;
    arr[index].minute++;
    arr[index].minuteGap = e.target.value
    setStep(arr)
  }


  return(
    <div className="dropdown__container">
      <h3 className="heading-2">
        <span> Step {stepNumber}, </span> 
        <button className="btn-sec" onClick={toggleDropdown}>Day {steps[index].day} <i className="fas fa-caret-down"></i></button>
      </h3>
      <div className="dropdown__container--content" style={{display: "none"}}>
        <h3 className="heading-2">Schedule after a delay of</h3>

        <div className="dropdown__container--content--items">
          <div>
            <input type="number" value={steps[index].dayGap} id="days" onChange={(e) => handleDayChange(e)}/>
            <label className="copy__para--medium" htmlFor="days">days</label>
          </div>
          <div>
            <input type="number" value={steps[index].hourGap} onChange={(e) => handleHourChange(e)} id="hours"/>
            <label className="copy__para--medium" htmlFor="hours">hours</label>
          </div>
          <div>
            <input type="number" value={steps[index].minuteGap} onChange={(e) => handleMinuteChange(e)} id="minute"/>
            <label className="copy__para--medium" htmlFor="minute">minutes</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DelayDropdown;
