import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../GlobalProvider";
import axios from "axios";
import Cookies from "universal-cookie"

import AppSidebar from "../../Components/Sidebars/AppSidebar";
import CampaignsSidebar from "../../Components/Sidebars/CampaignSidebar";
import AppTopbar from "../../Components/Topbars/AppTopbar";
import CampaignStatus from "../../Components/CampaignStatus";
import UpdateCampaignName from "../../Components/InputModals/UpdateCampaignName";
import CampaignAdd from "../../Components/CampaignComponents/CampaignProspects/CampaignAdd";

const cookies = new Cookies()
function CampaignsHome() {
  let navigate = useNavigate()

  const {selectedCampaign, addProspectCampaign} = useContext(GlobalContext)
  const [campaignProspectAdd, setCampaignProspectAdd] = addProspectCampaign
  const [showCampaigns, setShowCampaigns] = useState([])
  const [campaignId, setCampaignId] = selectedCampaign
  const [nameModal, setNameModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  function toggleAdd(id){
    setCampaignProspectAdd(!campaignProspectAdd)
    setCampaignId(id)
  }

  const openMenu = (index) => {
    let el = document.getElementsByClassName("menu")[index]
    // ReactDOM.findDOMNode(instance)
    if(el.style.display === "block"){
      el.style.display = "none"
    }
    else{
      el.style.display = "block"
    }
  }

  const getData = async () => {
    const userId = cookies.get("userId")
    await axios.get(`/api/campaigns/${userId}`, {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      }
    }).then((res) => {
      if(res.data === ""){
        setLoading(false)
      }
      else{
       setShowCampaigns(res.data)
       setLoading(false)
      }
    })
  }

  const deleteCampaign = (id, index) => {
    axios.delete(`/api/campaigns/${id}`, {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      }
    }).then((res) => {
      if(res.status === 200){
        getData()
        openMenu(index)
      }
    })
  }

  const toggleUpdateName = () => {
    setNameModal(!nameModal)
  }

  return(
    <div className="campaigns">
      {campaignProspectAdd  ? <CampaignAdd campaignId={campaignId}/> : null}
      {nameModal ? <UpdateCampaignName campaignId={campaignId} toggleUpdateName={toggleUpdateName} getData={getData}/> : null}
      <AppSidebar/>
      <AppTopbar title={"Campaigns"}/>
        <div className="campaigns__container">
          <div className="campaigns__container--sidebar">
            <CampaignsSidebar/>
          </div>

          <div className="campaigns__container--content">
            <div className="toolbar">
              <div className="name">
                <h4 className="heading-4">My Campaigns</h4>
              </div>
              <div className="search">
                <input type="search" placeholder="Search"/>
                <button onClick={() => navigate('/campaigns/create')} className="btn">Create Campaign</button>
              </div>
            </div>

            <div className="table__container">
            {
                    showCampaigns.length === 0 ? 
                      <h1>No Data Present</h1> :
              <table className="data">
                <thead>
                  <tr className="row1">
                    <th className="col-head heading-5">Status</th>
                    <th className="col-head heading-5">Name</th>
                    <th className="col-head heading-5">Scheduled Today</th>
                    <th className="col-head heading-5">Prospects</th>
                    <th className="col-head heading-5">Completed</th>
                  </tr>
                </thead>

                {
                  loading ? 
                    <div className="prospects__container--actions loader">
                      <div className="loader-out"></div>
                    </div> : 
                    null
                }
                <tbody>
                  {
                    showCampaigns.map((d, index) => 
                    <tr key={index}>
                      <td><CampaignStatus openMenu={openMenu} campaign={d} index={index} getData={getData}/></td>
                      <td><NavLink to={`/campaigns/${d.id}/step`} className="copy__para--medium">{d.campaign_name}</NavLink></td>
                      <td><p className="col-data copy__para--medium">None</p></td>
                      <td><p className="col-data copy__para--medium">{d.prospectCount}</p></td>
                      <td><p className="col-data copy__para--medium">-</p></td>
                      <td>
                        <div className="campaign-edit-buttons">
                          <div>
                            <button className="btn-sec" onClick={() => toggleAdd(d.id)}><i className="fas fa-user-plus"></i></button>
                          </div>
                          <div className="menu-button">
                            <button className="btn-sec" onClick={() => openMenu(index)}><i className="fas fa-ellipsis-v"></i></button>
                            <div className="menu" style={{display: "none"}}>
                              <div className="menu__content">
                                <div className="menu__content--option copy__para--medium" onClick={() => {setCampaignId(d.id); setNameModal(!nameModal)}}><i className="fas fa-edit"></i>Edit Campaign Name</div>
                                <div className="menu__content--option copy__para--medium" onClick={() => {deleteCampaign(d.id, index)}}><i className="fas fa-trash-alt"></i>Delete</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            }
            </div>
          </div>
        </div>
   </div>
  )
}

export default CampaignsHome;
