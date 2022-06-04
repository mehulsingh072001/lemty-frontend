import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import Cookies from "universal-cookie";
import axios from "axios";
import moment from "moment";

import AppSidebar from "../../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../../Components/Topbars/AppTopbar"
import CampaignSidebar from "../../../Components/Sidebars/CampaignSidebar"
import SingleCampaignNavbar from "../../../Components/CampaignComponents/SingleCampaignNavbar";
import CampaignAdd from "../../../Components/CampaignComponents/CampaignProspects/CampaignAdd";
import { GlobalContext } from "../../../GlobalProvider";

function SingleCampaignEmails() {
  const {addProspectCampaign} = useContext(GlobalContext)
  const [emails, setEmails] = useState([])
  const [emailsCount, setEmailsCount] = useState({})
  const cookies = new Cookies()
  const [campaignProspectAdd, setCampaignProspectAdd] = addProspectCampaign
  const [selectedEmails, setSelectedEmails] = useState([])
  const [status, setStatus] = useState("TODAY")
  const {id} = useParams()

  useEffect(() => {
    getEmailsCount()
    getEmails("TODAY")
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getEmails = (status) => {
    setStatus(status)
    const params = {
      "campaignId": id,
      "status": status
    }
    axios.get("/api/emails/campaign/getByStatus", {
        headers: {
          "Authorization": `Bearer ${cookies.get('access_token')}`
        },
        params: params
    }).then((res) => {
      setEmails(res.data)
    })
  }

  const getEmailsCount = () => {
    const params = {
      "campaignId": id
    }
    axios.get("/api/emails/campaign/count", {
        headers: {
          "Authorization": `Bearer ${cookies.get('access_token')}`
        },
        params: params
    }).then((res) => {
      setEmailsCount(res.data)
    })
  }

  const handleSelectProspect = (e) => {
    const emailsId = e.target.value
    if(!selectedEmails.includes(emailsId)){
      setSelectedEmails([...selectedEmails, emailsId])
    }
    else{
      setSelectedEmails(selectedEmails.filter((selectedEmailsId) => {
        return selectedEmailsId !== emailsId;
      })
    )
    }
  }

  const handleSelectAllProspects = () => {
    if(selectedEmails.length < emails.length){
      setSelectedEmails(emails.map((d, index) => d.id))
    }
    else{
      setSelectedEmails([]);
    }
  }

  const openContextMenu = () => {
    let el = document.getElementsByClassName("context-menu")[0]
    // ReactDOM.findDOMNode(instance)
    if(el.style.display === "block"){
      el.style.display = "none"
    }
    else{
      el.style.display = "block"
    }
  }

  return(
    <div className="single-campaign">
      {campaignProspectAdd===true ? <CampaignAdd/> : null}
      <AppSidebar/>
      <AppTopbar title={"Campaign"}/>
      <div className="single-campaign__container">
          <div className="single-campaign__container--sidebar">
            <CampaignSidebar/>
          </div>
          <div className="single-campaign__container--content">
            <SingleCampaignNavbar setCampaignProspectAdd={setCampaignProspectAdd}/>
              <div className="toolbar">
                <div className="name">
                  <h4>My Emails</h4>
                </div>
                <div className="search">
                  <input type="search" placeholder="Search"/>
                </div>
              </div>

            <div className="prospects__container--sorter">
              <div onClick={() => {getEmails("TODAY");}} className={`prospects__container--sorter--card ${status === "TODAY" ? "active" : ""}`}>
                <h1 className="copy__para--medium">Today</h1>
                <p className="heading-1">{emailsCount.today}</p>
              </div>
              <div onClick={() => {getEmails("UPCOMING");}} className={`prospects__container--sorter--card ${status === "UPCOMING" ? "active" : ""}`}>
                <h1 className="copy__para--medium">Upcoming</h1>
                <p className="heading-1">{emailsCount.upcoming}</p>
              </div>
              <div onClick={null}  className={`prospects__container--sorter--card ${null}`}>
                <h1 className="copy__para--medium">Awaiting Approval</h1>
                <p className="heading-1">0</p>
              </div>
              <div onClick={null}  className={`prospects__container--sorter--card ${null}`}>
                <h1 className="copy__para--medium">Errors</h1>
                <p className="heading-1">0</p>
              </div>
              <div onClick={() => {getEmails("SENT");}} className={`prospects__container--sorter--card ${status === "SENT" ? "active" : ""}`}>
                <h1 className="copy__para--medium">Sent</h1>
                <p className="heading-1">{emailsCount.sent}</p>
              </div>
            </div>


            {
              emails.length === 0 ? 
                null
              :
              <>
              <div className="prospects__container--actions">
                <div className="prospects__container--actions--items">
                  <div>
                    <button className={selectedEmails.length ===0 ? "btn-white--disabled" : "btn-white"}>Resume Campaign</button>
                  </div>
                  <div>
                    <button className={selectedEmails.length ===0 ? "btn-white--disabled" : "btn-white"}>Stop Campaign</button>
                  </div>
                  <div>
                    <button onClick={() => openContextMenu()} className={selectedEmails.length ===0 ? "btn-white--disabled" : "btn-white"}><i className="fas fa-ellipsis-v"></i></button>
                    <div className="context-menu" style={{display: "none"}}>
                      <div className="context-menu__item copy__para--medium">
                        <i className="fas fa-list"></i>
                        <p>Add To List</p>
                      </div>
                      <div className="context-menu__item copy__para--medium">
                        <i className="fas fa-tag"></i>
                        <p>Add Tags</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <div className="table__container">
              <table className="data">
                <thead>
                  <tr className="row1">
                    <th><input className="col-head " type="checkbox" checked={selectedEmails.length === emails.length} onChange={handleSelectAllProspects}/></th>
                    <th className="col-head heading-5">Date</th>
                    <th className="col-head heading-5">From</th>
                    <th className="col-head heading-5">To</th>
                    <th className="col-head heading-5">Email</th>
                    <th className="col-head heading-5">Step</th>
                    {
                      status === "SENT" ? 
                        <th className="col-head heading-5">Engagement</th> :
                        null
                    }
                  </tr>
                </thead>

                <tbody>
                  {emails.map((d, index) => 
                    <tr key={index}>
                      <td><input type="checkbox" value={d.id} checked={selectedEmails.includes(d.id)} onChange={handleSelectProspect}/></td>
                      <td><p className="col-data copy__para--medium">{moment(d.startTime).fromNow()}</p></td>
                      <td><p className="col-data copy__para--medium"><span className="badge">{d.fromEmail.charAt(0).toUpperCase()}</span></p></td>
                      <td><p className="col-data copy__para--medium">{d.toEmail}</p></td>
                      <td className="body"><div className="col-data copy__para--medium">{d.body}</div></td>
                      <td><p className="col-data copy__para--medium">#{d.step + 1}</p></td>
                      <td>
                        <div className="col-data__engagement">
                          {
                          d.engagements.map((e, i) => 
                            <div key={i} className="col-data__engagement--container">
                              <div className="col-data__engagement--container--item tooltip"><span className="tooltiptext">Reply</span></div>
                              <div className="col-data__engagement--container--item tooltip"><span className="tooltiptext">Click</span></div>
                              <div className="col-data__engagement--container--item tooltip"><span className="tooltiptext">Open</span></div>
                            </div>
                           )
                          }
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
            }
          </div>
      </div>
    </div>
  )
}

export default SingleCampaignEmails;
