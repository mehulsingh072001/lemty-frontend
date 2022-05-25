const Days = ({selectedDays, setSelectedDays}) => {

  const handleSelectProspect = (e) => {
    const prospectId = e.target.value
    if(!selectedDays.includes(prospectId)){
      setSelectedDays([...selectedDays, prospectId])
    }
    else{
      setSelectedDays(selectedDays.filter((selectedProspectsId) => {
        return selectedProspectsId !== prospectId;
      })
    )
    }
  }

  return(
    <div className="days">
      <form className="days__form">
        <div className="days__form--field">
          <input type="checkbox" id="sunday" value="SUN"  onChange={handleSelectProspect} checked={selectedDays.includes("SUN")}/>
          <label htmlFor="sunday">Sunday</label>
        </div>
        <div className="days__form--field">
          <input type="checkbox" id="monday" value="MON"  onChange={handleSelectProspect} checked={selectedDays.includes("MON")}/>
          <label htmlFor="monday">Monday</label>
        </div>
        <div className="days__form--field">
          <input type="checkbox" id="tuesday" value="TUE"  onChange={handleSelectProspect} checked={selectedDays.includes("TUE")}/>
          <label htmlFor="tuesday">Tuesday</label>
        </div>
        <div className="days__form--field">
          <input type="checkbox" id="wednesday" value="WED"  onChange={handleSelectProspect} checked={selectedDays.includes("WED")}/>
          <label htmlFor="wednesday">Wednesday</label>
        </div>
        <div className="days__form--field">
          <input type="checkbox" id="thursday" value="THU"  onChange={handleSelectProspect} checked={selectedDays.includes("THU")}/>
          <label htmlFor="thursday">Thursday</label>
        </div>
        <div className="days__form--field">
          <input type="checkbox" id="friday" value="FRI"  onChange={handleSelectProspect} checked={selectedDays.includes("FRI")}/>
          <label htmlFor="friday">Friday</label>
        </div>
        <div className="days__form--field">
          <input type="checkbox" id="saturday" value="SAT"  onChange={handleSelectProspect} checked={selectedDays.includes("SAT")}/>
          <label htmlFor="saturday">Saturday</label>
        </div>
      </form>
    </div>
  )
}

export default Days
