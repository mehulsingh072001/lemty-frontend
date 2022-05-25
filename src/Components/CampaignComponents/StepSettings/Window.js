const Window = ({startHour, setStartHour, endHour, setEndHour}) => {
  const hours = [
    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
  ]


  return(
    <div className="window">
      <h2 className="window__heading">Send Emails between these hours</h2>
      <form className="window__form" action="">
          <div className="window__form--container">
            <select defaultValue={startHour} onChange={(e) => setStartHour(e.target.value)}>
              {
                hours.map((d, i) => 
                    <option key={i}
                     value={d}>{d}</option>
                )
              }
            </select>
            <h1 className="to">To</h1>
            <select defaultValue={endHour} onChange={(e) => setEndHour(e.target.value)}>
              {
                hours.map((d, i) => 
                    <option key={i} 
                    value={d}>{d}</option>
                )
              }
              <option value="0">Midnight</option>
            </select>
          </div>
      </form>
    </div>
  )
}

export default Window
