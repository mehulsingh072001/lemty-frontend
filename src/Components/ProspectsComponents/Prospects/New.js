import {useContext, useEffect, useState} from "react"
import { GlobalContext } from "../../../GlobalProvider";
import axios from "axios"
import Cookies from 'universal-cookie';

const cookies = new Cookies()
function New(){
  const {addProspect, newProspect} = useContext(GlobalContext)
  const [newP, setNewP] = newProspect
  const [add, setAdd] = addProspect
  const [showLists, setShowLists] = useState([])
  const [list, setList] = useState('')
  const [prospectData, setProspectData] = useState({})

  useEffect(() => {
    getListData()
  }, [])


  function toggleAdd(){
    setAdd(!add)
  }

  function toggleNew(){
    setNewP(!newP)
  }

  function toggleHome(){
    toggleNew()
    toggleAdd()
  }

  const getListData = async () => {
    const userId = cookies.get("userId")
    await axios.get(`/prospects/prospect_lists/list?userId=${userId}`, {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      }
    }).then((res) => {
      setShowLists(res.data)
    })
  }

  const createProspect = async () => {
    const token = cookies.get("access_token")
    const params = {
      listId: list,
      userId: cookies.get("userId"),
    }

    await axios.post(`/prospects/prospect/`, prospectData, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      params: params
    }).then((res) => {
      if(res.status === 201){
        window.location.reload()
      }
    })
  }


  return(
    <div class="new-prospect">
      <nav class="nav">
        <div className="col-1">
          <button onClick={toggleNew} className="btn-back"><i class="fas fa-chevron-left"></i></button>
          <h1 className="copy__para--big">Add Prospects</h1>
        </div>
        <div className="col-2">
          <button className="btn" onClick={createProspect}>Create Prospect</button>
          <button onClick={toggleHome} className="btn-close">&times;</button>
        </div>
      </nav>

      <div className="new-prospect__container">
        <form className="new-prospect__container--form">
          <div>
            <h1 className="u-margin-bottom-medium">Basic Fields</h1>
            <div className="row-1">
              <div className="input-block">
                <input type="text" name="first-name" onChange={(e) => setProspectData({...prospectData, firstName: e.target.value})}/>
                <label className="heading-4" htmlFor="first-name">First Name</label>
              </div>
              <div className="input-block">
                <input type="text" name="last-name" onChange={(e) => setProspectData({...prospectData, lastName: e.target.value})}/>
                <label htmlFor="first-name" className="heading-4">Last Name</label>
              </div>
              <div className="input-block">
                <input type="email" name="email" onChange={(e) => setProspectData({...prospectData, prospectEmail: e.target.value})}/>
                <label htmlFor="first-name" className="heading-4">Email</label>
              </div>
              <div className="input-block">
                <input type="text" name="company" onChange={(e) => setProspectData({...prospectData, prospectCompany: e.target.value})}/>
                <label htmlFor="first-name" className="heading-4">Company</label>
              </div>
              <div className="input-block">
                <input type="text" name="phone" onChange={(e) => setProspectData({...prospectData, prospectMobileNumber: e.target.value})}/>
                <label htmlFor="phone" className="heading-4">Phone No.</label>
              </div>
              <div className="input-block">
                <select onChange={(e) => setList(e.target.value)} id="" name="prospect-list">
                  <option value="">default</option>
                  {showLists.map(d => 
                    <option key={d.id} value={d.id}>{d.name}</option>
                  )}
                </select>
                <label htmlFor="prospect-list" className="heading-4">Prospect list name</label>
              </div>
              <div className="input-block">
                <input type="text" name="tag"/>
                <label htmlFor="tag" className="heading-4">Tag Prospects</label>
              </div>
            </div>
          </div>

          <div>
            <h1 className="u-margin-bottom-medium u-margin-top-big">Additional Fields</h1>
            <div className="row-2">
              <div className="input-block">
                <input type="text" name="account" onChange={(e) => setProspectData({...prospectData, prospect_account: e.target.value})}/>
                <label htmlFor="account" className="heading-4">Account</label>
              </div>
              <div className="input-block">
                <input type="email" name="company-email" onChange={(e) => setProspectData({...prospectData, prospect_company_email: e.target.value})}/>
                <label htmlFor="company-email" className="heading-4">Company Email</label>
              </div>
              <div className="input-block">
                <input type="text" name="department" onChange={(e) => setProspectData({...prospectData, prospect_department: e.target.value})}/>
                <label htmlFor="department" className="heading-4">Department</label>
              </div>
              {/* <div className="input-block"> */}
              {/*   <input type="text" name="company-phone" onChange={(e) => setProspectData({...prospectData, prospect_company_: e.target.value})}/> */}
              {/*   <label htmlFor="company-phone">Company Phone no.</label> */}
              {/* </div> */}
              <div className="input-block">
                <input type="text" name="title" onChange={(e) => setProspectData({...prospectData, prospect_title: e.target.value})}/>
                <label htmlFor="title" className="heading-4">Title</label>
              </div>
              <div className="input-block">
                <input type="text" name="company-domain" onChange={(e) => setProspectData({...prospectData, prospect_company_domain: e.target.value})}/>
                <label htmlFor="company-domain" className="heading-4">Company Domain</label>
              </div>
              <div className="input-block">
                <input type="text" name="linkedin-url" onChange={(e) => setProspectData({...prospectData, prospect_linkedin_url: e.target.value})}/>
                <label htmlFor="linkedin-url" className="heading-4">Linkedin Url</label>
              </div>
              <div className="input-block">
                <input type="text" name="twitter-id" onChange={(e) => setProspectData({...prospectData, prospect_twitter_url: e.target.value})}/>
                <label htmlFor="twitter-id" className="heading-4">Twitter Id</label>
              </div>
              <div className="input-block">
                <input type="text" name="location" onChange={(e) => setProspectData({...prospectData, prospect_location: e.target.value})}/>
                <label htmlFor="location" className="heading-4">Location</label>
              </div>
              {/* <div className="input-block"> */}
              {/*   <input type="text" name="city" onChange={(e) => setProspectData({...prospectData, prospect_country: e.target.value})}/> */}
              {/*   <label htmlFor="city">City</label> */}
              {/* </div> */}
              <div className="input-block">
                <input type="text" name="country" onChange={(e) => setProspectData({...prospectData, prospect_country: e.target.value})}/>
                <label htmlFor="country" className="heading-4">Country</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default New
