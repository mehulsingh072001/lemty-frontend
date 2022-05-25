import axios from "axios";

import AppSidebar from "../../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../../Components/Topbars/AppTopbar"

import CampaignSidebar from "../../../Components/Sidebars/CampaignSidebar"
import SingleCampaignNavbar from "../../../Components/CampaignComponents/SingleCampaignNavbar";
import CampaignAdd from "../../../Components/CampaignComponents/CampaignProspects/CampaignAdd"
import ToggleSwitch from "../../../Components/ToggleSwitch";

import {GlobalContext} from "../../../GlobalProvider"
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Cookies from "universal-cookie";

const cookies = new Cookies()
function SingleCampaignReports() {
  const {addProspectCampaign} = useContext(GlobalContext)
  const [campaignProspectAdd] = addProspectCampaign
  const [overview, setOverview] = useState({})
  const [stepMetrics, setStepMetrics] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getOverviewData()
    getStepMetrics()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const headers = {
      "Authorization": `Bearer ${cookies.get('access_token')}`
  }

  const getOverviewData = () => {
    axios.get(`/reports/overview`, {
      headers: headers,
      params: {
        campaignId: id
      }
    }).then((res) => {
      if(res.status === 200){
        setOverview(res.data)
      }
    })
  }

  const getStepMetrics = () => {
    axios.get(`/reports/steps`, {
      headers: headers,
      params: {
        campaignId: id
      }
    }).then((res) => {
      if(res.status === 200){
        setStepMetrics(res.data)
      }
    })
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
            <SingleCampaignNavbar/>
            <div className="reports">
              <section className="reports__filter">
                <button className="btn-transparent">All Prospects<i className="fas fa-caret-down"></i></button>
                <button className="btn-plain">Prospects Added: All Time</button>
              </section>

              <section className="reports__overview">
                <h1 className="heading-1">Overview</h1>
                <div className="reports__overview--data">
                  <div className="reports__overview--data--prospects">
                    <div className="prospects-number heading-1">{overview.totalProspects}</div>
                    <p className="heading-4">Total Prospects</p>
                  </div>

                  <div className="reports__overview--data--items">
                    <div className="item">
                      <h1 className="heading-1">{overview.inCampaign}</h1>
                      <p className="heading-4">In Campaign</p>
                    </div>
                    <div className="item">
                      <h1 className="heading-1">{overview.completedNoReply}</h1>
                      <p className="heading-4">Completed - No Reply</p>
                    </div>
                    <div className="item">
                      <h1 className="heading-1">{overview.stopped}</h1>
                      <p className="heading-4">Stopped</p>
                    </div>
                    <div className="item">
                      <h1 className="heading-1">{overview.unsubscribed}</h1>
                      <p className="heading-4">Unsubscribed</p>
                    </div>
                    <div className="item">
                      <h1 className="heading-1">{overview.bounced}</h1>
                      <p className="heading-4">Bounced</p>
                    </div>
                    <div className="item">
                      <h1 className="heading-1">{overview.opened}</h1>
                      <p className="heading-4">Opened</p>
                    </div>
                    <div className="item">
                      <h1 className="heading-1">{overview.replied}</h1>
                      <p className="heading-4">Replied</p>
                    </div>
                    <div className="item">
                      <h1 className="heading-1">{overview.clicked}</h1>
                      <p className="heading-4">Clicked</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="reports__metrics">
                <div className="reports__metrics--header">
                  <h1 className="heading-1">Stepwise Metrics</h1>
                  <div className="reports__metrics--header--actions">
                    <div className="heading-4"><ToggleSwitch/> View A/B test reports</div>
                    <button className="btn">Download</button>
                  </div>
                </div>

                {
                  stepMetrics.map((d, i) => 
                <div key={i} className="reports__metrics--data">
                  <div className="info">
                    <h1 className="heading-2"><i className="fas fa-envelope"></i> Step {d.stepNumber}</h1>
                    <div>
                      <p className="heading-3">{d.emails}</p>
                      <p className="heading-3">Email(s)</p>
                    </div>
                  </div>
                  <div className="metrics">
                    <div className="metrics__card">
                      <div className="metrics__card--top">
                        <p className="copy__para--medium">{d.opens} Opens</p>
                        <i className="fas fa-eye"></i>
                      </div>
                      <div className="metrics__card--progress">
                        <p>Percentage</p>
                      </div>
                      <div className="metrics__card--percentage">
                        <p className="copy__para--medium">0%</p>
                      </div>
                    </div>

                    <div className="metrics__card">
                      <div className="metrics__card--top">
                        <p className="copy__para--medium">{d.clicks} Clicks</p>
                        <i className="fas fa-hand-pointer"></i>
                      </div>
                      <div className="metrics__card--progress">
                        <p>Percentage</p>
                      </div>
                      <div className="metrics__card--percentage">
                        <p className="copy__para--medium">0%</p>
                      </div>
                    </div>

                    <div className="metrics__card">
                      <div className="metrics__card--top">
                        <p className="copy__para--medium">{d.replies} Replies</p>
                        <i className="fas fa-reply"></i>
                      </div>
                      <div className="metrics__card--progress">
                        <p>Percentage</p>
                      </div>
                      <div className="metrics__card--percentage">
                        <p className="copy__para--medium">0%</p>
                      </div>
                    </div>
                  </div>
                </div>
                   )
                }
              </section>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SingleCampaignReports;
