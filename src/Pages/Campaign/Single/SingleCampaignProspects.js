import axios from "axios";

import AppSidebar from "../../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../../Components/Topbars/AppTopbar"

import CampaignSidebar from "../../../Components/Sidebars/CampaignSidebar"
import SingleCampaignNavbar from "../../../Components/CampaignComponents/SingleCampaignNavbar";
import CampaignAdd from "../../../Components/CampaignComponents/CampaignProspects/CampaignAdd"

import {GlobalContext} from "../../../GlobalProvider"
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import Cookies from "universal-cookie";

const cookies = new Cookies()
function SingleCampaignProspects() {
  const [prospects, setProspects] = useState([])
  const {addProspect, newProspect, upload, addProspectCampaign} = useContext(GlobalContext)
  const [campaignProspectAdd, setCampaignProspectAdd] = addProspectCampaign
  const [selectedProspects, setSelectedProspects] = useState([])
  const [totalElements, setTotalElements] = useState()
  const [totalPages, setTotalPages] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [prospectCounts, setProspectCounts] = useState({})
  const [status, setStatus] = useState("")
  const {id} = useParams()

  useEffect(() => {
    getAllProspects("ALL")
    getProspectCounts()
  }, [])

  function previousPage() {
    if(pageNumber !== 0){
      setPageNumber(pageNumber - 1)
    }
    else{
    }
  }

  function nextPage() {
    if((pageNumber + 1) === totalPages){
    }
    else{
      setPageNumber(pageNumber + 1)
    }
  }

  const headers = {
      "Authorization": `Bearer ${cookies.get('access_token')}`
  }

  const getAllProspects = async (status) => {
    const params = {
      campaignId: id,
      status: status,
      page: pageNumber,
      size: pageSize
    }
    await axios.get(`/prospects/prospect/campaign`, {
      headers: headers,
      params: params
    }).then((res) => {
      if(res.data === ""){
      }
      else{
        setTotalPages(res.data.totalPages)
        setTotalElements(res.data.totalElements)
        setProspects(res.data.prospectDatas)
        setStatus(status)
        setPageNumber(0)
        setPageSize(10)
      }
    })
  }


  const getProspectCounts = async () => {
    const params = {
      campaignId: id
    }
    await axios.get(`/prospects/prospect/campaign/counts`, {
      headers: headers,
      params: params
    }).then((res) => {
      if(res.data === ""){
      }
      else{
        setProspectCounts(res.data)
      }
    })
  }


  const handleSelectProspect = (e) => {
    const prospectId = e.target.value
    if(!selectedProspects.includes(prospectId)){
      setSelectedProspects([...selectedProspects, prospectId])
    }
    else{
      setSelectedProspects(selectedProspects.filter((selectedProspectsId) => {
        return selectedProspectsId !== prospectId;
      })
    )
    }
  }

  const handleSelectAllProspects = () => {
    if(selectedProspects.length < prospects.length){
      setSelectedProspects(prospects.map((d, index) => d.id))
    }
    else{
      setSelectedProspects([]);
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
            <SingleCampaignNavbar/>
            <div className="prospects__container--content">
              <div className="toolbar">
                <div className="name">
                  <h4>My Prospects</h4>
                </div>
                <div className="search">
                  <input type="search" placeholder="Search"/>
                </div>
              </div>

            <div className="prospects__container--sorter">
              <div onClick={() => {getAllProspects("ALL")}} className={`prospects__container--sorter--card ${status === "ALL" ? "active" : ""}`}>
                <h1 className="copy__para--medium">All</h1>
                <p className="heading-1">{prospectCounts.all}</p>
              </div>
              <div onClick={() => {getAllProspects("IN_CAMPAIGN")}} className={`prospects__container--sorter--card ${status === "IN_CAMPAIGN" ? "active" : ""}`}>
                <h1 className="copy__para--medium">In Campaign</h1>
                <p className="heading-1">{prospectCounts.inCampaign}</p>
              </div>
              <div onClick={() => getAllProspects("COMPLETED_WITHOUT_REPLY")}  className={`prospects__container--sorter--card ${status === "COMPLETED_WITHOUT_REPLY" ? "active" : ""}`}>
                <h1 className="copy__para--medium">Completed Without Reply</h1>
                <p className="heading-1">{prospectCounts.completedWithoutReply}</p>
              </div>
              <div onClick={() => getAllProspects("BOUNCED")}  className={`prospects__container--sorter--card ${status === "BOUNCED" ? "active" : ""}`}>
                <h1 className="copy__para--medium">Bounced</h1>
                <p className="heading-1">{prospectCounts.bounced}</p>
              </div>
              <div onClick={() => getAllProspects("REPLIED")} className={`prospects__container--sorter--card ${status === "REPLIED" ? "active" : ""}`}>
                <h1 className="copy__para--medium">Replied</h1>
                <p className="heading-1">{prospectCounts.replied}</p>
              </div>
              <div onClick={() => getAllProspects("UNSUBSCRIBED")} className={`prospects__container--sorter--card ${status === "UNSUBSCRIBED" ? "active" : ""}`}>
                <h1 className="copy__para--medium">Unsubscribed</h1>
                <p className="heading-1">{prospectCounts.unsubscribed}</p>
              </div>
              <div onClick={() => getAllProspects("STOPPED")} className={`prospects__container--sorter--card ${status === "STOPPED" ? "active" : ""}`}>
                <h1 className="copy__para--medium">Stopped</h1>
                <p className="heading-1">{prospectCounts.stopped}</p>
              </div>
            </div>


            {
              prospects.length === 0 ? 
                null
              :
              <>
              <div className="prospects__container--actions">
                <div className="prospects__container--actions--items">
                  <div>
                    <button className={selectedProspects.length ===0 ? "btn-white--disabled" : "btn-white"}>Resume Campaign</button>
                  </div>
                  <div>
                    <button className={selectedProspects.length ===0 ? "btn-white--disabled" : "btn-white"}>Stop Campaign</button>
                  </div>
                  <div>
                    <button onClick={() => openContextMenu()} className={selectedProspects.length ===0 ? "btn-white--disabled" : "btn-white"}><i className="fas fa-ellipsis-v"></i></button>
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
                <div className="prospects__container--actions--page">
                    <p className="copy__para--medium">Showing</p>
                    <select defaultValue={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <p className="copy__para--medium">/{totalElements}</p>
                </div>
              </div>

            <div className="table__container">
              <table className="data">
                <thead>
                  <tr className="row1">
                    <th><input className="col-head " type="checkbox" checked={selectedProspects.length === prospects.length} onChange={handleSelectAllProspects}/></th>
                    <th className="col-head heading-5">Email-ID</th>
                    <th className="col-head heading-5">Status</th>
                    <th className="col-head heading-5">List</th>
                    <th className="col-head heading-5">Tags</th>
                    <th className="col-head heading-5">Last Completed Step</th>
                    <th className="col-head heading-5">Engagement</th>
                    <th className="col-head heading-5">Next Step Due</th>
                    <th className="col-head heading-5">Outcome</th>
                  </tr>
                </thead>

                <tbody>
                  {prospects.map((d, index) => 
                    <tr key={index}>
                      <td><input type="checkbox" value={d.id} checked={selectedProspects.includes(d.id)} onChange={handleSelectProspect}/></td>
                      <td><p className="col-data copy__para--medium">{d.prospect.prospectEmail}</p></td>
                      <td><p className="col-data copy__para--medium">{d.status}</p></td>
                      <td><p className="col-data copy__para--medium">default</p></td>
                      <td><p className="col-data copy__para--medium">-</p></td>
                      <td><p className="col-data copy__para--medium">#{d.lastCompletedStep}</p></td>
                      <td>
                        <div className="col-data__engagement">
                          {
                          d.engagements.map((e, i) => 
                            <div key={i} className="col-data__engagement--container">
                              <div className="col-data__engagement--container--item tooltip" style={{backgroundColor: e.replies === 0 || e.replies === undefined ? "#f3f9fe" : "#504ee4"}}><span className="tooltiptext">Reply: {e.replies}x</span></div>
                              <div className="col-data__engagement--container--item tooltip" style={{backgroundColor: e.clicks === 0 || e.clicks === undefined ? "#f3f9fe" : "#504ee4"}}><span className="tooltiptext">Click: {e.clicks}x</span></div>
                              <div className="col-data__engagement--container--item tooltip" style={{backgroundColor: e.opens === 0 || e.opens === undefined ? "#f3f9fe" : "#504ee4"}}><span className="tooltiptext">Open: {e.opens}x</span></div>
                              <p className="copy__para--medium">{e.stepNumber}</p>
                            </div>
                           )
                          }
                        </div>
                      </td>
                      <td><p className="col-data copy__para--medium">-</p></td>
                      <td><p className="col-data copy__para--medium">-</p></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="add-from-existing__container--page-number">
              <div className="add-from-existing__container--page-number--prev copy__para--medium" onClick={() => previousPage()}>Prev</div>
                <p className="add-from-existing__container--page-number--number copy__para--medium">{pageNumber + 1}</p>
                <div className="add-from-existing__container--page-number--next copy__para--medium" onClick={() => nextPage()}>Next</div>
            </div>
          </>
            }
            </div>
          </div>
      </div>
    </div>
  )
}

export default SingleCampaignProspects;
