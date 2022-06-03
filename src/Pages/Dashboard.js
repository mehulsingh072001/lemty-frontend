import { useEffect, useState } from "react"
 
import AppSidebar from "../Components/Sidebars/AppSidebar"
import AppTopbar from "../Components/Topbars/AppTopbar"

function Dashboard(){
  const [pastWeek, setPastWeek] = useState([])

  useEffect(() => {
    setPastDates()
  }, [])

  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const setPastDates = () =>{
    const dates = [...Array(7)].map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i)
        return d
    })
    setPastWeek(dates.reverse());
  }
  return(
    <div className="dashboard">
      <AppSidebar/>
      <AppTopbar title={"Dashboard"}/>
      <div className="dashboard__container">

        <div className="dashboard__container--left">
          <div className="dashboard__container--left--data">
            <div className="topbar">
              <h2 className="heading-2"><i className="fab fa-telegram-plane"></i> Email Sent</h2>
              <div className="sent-number heading-1">0</div>
            </div>

            <div className="data-chart">
              <div className="data-chart__bars">
                <div className="data-chart__bars--item" style={{height: "2%"}}>
                  <div className="data-chart__bars--item--bar" style={{minWidth: "fit-content"}}>
                  </div>
                </div>
              </div>
              <div className="data-chart__days">
                {
                  pastWeek.map((d, i) =>
                    <div key={i} className="data-chart__days--day">{d.getDate()} {month[d.getMonth()]}</div>
                  )
                }
              </div>
            </div>
          </div>

          <div className="dashboard__container--left--data">
            <div className="topbar">
              <h2 className="heading-2">Email Scheduled</h2>
              <div className="sent-number heading-1">0</div>
            </div>

            <div className="data">
              <div className="data__item">
                <p className="copy__para--medium">Today</p>
                <p className="heading-1 u-margin-top-small">0</p>
              </div>
              <div className="data__item">
                <p className="copy__para--medium">Upcoming</p>
                <p className="heading-1 u-margin-top-small">0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__container--right">
          <h1 className="heading-2">Live Feed</h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
