import axios from "axios"
import {useState, useEffect} from "react"

import Cookies from "universal-cookie"

const cookies = new Cookies()
function ProspectSidebar({toggleCreateList, selectedList, setSelectedList}){

  useEffect(() => {
    getListData()
  }, [])

  const [lists, setLists] = useState([])

  const getListData = async () => {
    const userId = cookies.get("userId")
    await axios.get(`/api/prospects/prospect_lists/list?userId=${userId}`, {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      }
    }).then((res) => {
      setLists(res.data)
    })
  }
  return(
    <div className="prospect-sidebar">
      <div className="prospect-sidebar__container">
        <div className="prospect-sidebar__container--sidebar">

          <input className="prospect-sidebar__container--sidebar--search" type="search" placeholder="Search"/>

          <div className="header">
            <h6>ALL LISTS</h6>
            <button className="btn-tertiary" onClick={() => toggleCreateList()}>Create List</button>
          </div>
          <ul className="prospect-sidebar__container--sidebar__links">
            <li className={`prospect-sidebar__container--sidebar__links--link ${selectedList.name === "all" ? "active" : ""}`} onClick={() => setSelectedList({name: "all", id: ""})} ><button>All Prospects</button></li>
            {
              lists.map((d, i) => 
                        <li key={i} className={`prospect-sidebar__container--sidebar__links--link ${selectedList.name === d.name ? "active" : ""}`} onClick={() => setSelectedList({name: d.name, id: d.id})} ><button>{d.name}</button></li>
                       )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProspectSidebar
