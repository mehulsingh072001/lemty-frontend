import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "universal-cookie"
 
import AppSidebar from "../Components/Sidebars/AppSidebar"
import AppTopbar from "../Components/Topbars/AppTopbar"

const cookies = new Cookies()
function Dashboard(){
  const [pastWeek, setPastWeek] = useState([])
  const [sentCounts, setSentCounts] = useState([])
  const [userCounts, setUserCounts] = useState({})

  useEffect(() => {
    setPastDates()
    getSentCounts()
    getEmailsCount()
   // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getSentCounts = () => {
    const data = {
      startDate: pastWeek[0],
      endDate: pastWeek[6]
    }
    axios.post("api/emails/sent-count", data, {
      headers: {
        "Authorization": `Bearer ${cookies.get("access_token")}`
      },
      params: {
        "userId": cookies.get("userId")  
      }
    }).then((res) => {
      console.log(res.data)
      setSentCounts(res.data)
    })
  }

  const getEmailsCount = () => {
    const params = {
      "userId": cookies.get("userId")
    }
    axios.get("/api/emails/user/count", {
        headers: {
          "Authorization": `Bearer ${cookies.get('access_token')}`
        },
        params: params
    }).then((res) => {
      setUserCounts(res.data)
    })
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
              <div className="sent-number heading-1">{userCounts.sent}</div>
            </div>

            <div className="data-chart">
              <div className="data-chart__bars">
                {
                  sentCounts.length === 0 ? null :

                    sentCounts.map((d, index) => 
                      <div key={index} className="data-chart__bars--item" style={{height: d.prospects}}>
                        <div className="data-chart__bars--item--bar" style={{minWidth: "fit-content"}}>
                        </div>
                      </div>
                    )
                }
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
              <div className="sent-number heading-1">{userCounts.today + userCounts.upcoming}</div>
            </div>

            <div className="data">
              <div className="data__item">
                <p className="copy__para--medium">Today</p>
                <p className="heading-1 u-margin-top-small">{userCounts.today}</p>
              </div>
              <div className="data__item">
                <p className="copy__para--medium">Upcoming</p>
                <p className="heading-1 u-margin-top-small">{userCounts.upcoming}</p>
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
