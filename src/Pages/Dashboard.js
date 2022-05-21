import AppSidebar from "../Components/Sidebars/AppSidebar"
import AppTopbar from "../Components/Topbars/AppTopbar"
import {useState, useEffect, useContext} from "react"
import { GlobalContext } from "../GlobalProvider"

function Dashboard(){
  const {userData} = useContext(GlobalContext)

  return(
    <div className="dashboard">
      <AppSidebar/>
      <AppTopbar title={"Dashboard"}/>
      <div className="dashboard__container">

        <div className="dashboard__container--left">
          <div className="dashboard__container--left--data">
            <div className="topbar">
              <h2 className="heading-2">Email Sent</h2>
              <div className="sent-number heading-1">0</div>
            </div>

            <div className="data">
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
