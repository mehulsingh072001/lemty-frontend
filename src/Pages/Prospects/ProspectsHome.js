import {GlobalContext} from "../../GlobalProvider"
import { useContext, useState, useEffect } from "react"
import Cookies from "universal-cookie"
import axios from "axios";

import AppSidebar from "../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../Components/Topbars/AppTopbar";
import ProspectSidebar from "../../Components/Sidebars/ProspectSeidebar";
import CreateList from "../../Components/InputModals/CreateList";
import Add from "../../Components/ProspectsComponents/Prospects/Add"
import SingleProspect from "../../Components/ProspectsComponents/SingleProspect/SingleProspect";
import AddToCampaign from "../../Components/ProspectsComponents/AddToCampaign";

const cookies = new Cookies();
function ProspectsHome(){
  const {addProspect} = useContext(GlobalContext)
  const [add, setAdd] = addProspect
  const [showProspects, setShowProspects] = useState([])
  const [totalElements, setTotalElements] = useState()
  const [totalPages, setTotalPages] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [selectedProspects, setSelectedProspects] = useState([])
  const [singleProspect, setSingleProspect] = useState({})
  const [prospectView, setProspectView] = useState(false)
  const [status, setStatus] = useState("")
  const [prospectCount, setProspectCount] = useState({})
  const [selectedList, setSelectedList] = useState({
    name: "all",
    id: ""
  })
  const [createList, setCreateList] = useState(false)
  const [loading, setLoading] = useState(true)
  const [addTo, setAddTo] = useState(false)
  const [search, setSearch] = useState(false)

  function toggleAdd(){
    setAdd(!add)
  }

  useEffect(() => {
    getData()
    getProspectCounts()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedList, pageNumber, pageSize])

  const toggleProspectView = () => {
    setProspectView(!prospectView)
  }

  function previousPage() {
    if(pageNumber !== 0){
      setPageNumber(pageNumber - 1)
    }
    else{
    }
  }

  function nextPage() {
    if((pageNumber + 1) === totalPages){
      console.log(totalPages)
    }
    else{
      setPageNumber(pageNumber + 1)
    }
  }


  const getData = async () => {
    const name = selectedList.name
    const id = selectedList.id
    setStatus("all")
    const userId = cookies.get("userId")
    if(name === "all"){
      await axios.get("/api/prospects/prospect/user", {
        headers: {
          "Authorization": `Bearer ${cookies.get('access_token')}`
        },
        params: {
          userId: userId,
          page: pageNumber,
          size: pageSize
        }
      }).then((res) => {
        if(res.data === ""){
          return null;
        }
        else{
          setShowProspects(res.data.prospects)
          setTotalElements(res.data.totalElements)
          setTotalPages(res.data.totalPages)
        }
        setLoading(false)
      })
    }
    else{
      await axios.get(`/api/prospects/prospect/${id}`, {
        headers: {
          "Authorization": `Bearer ${cookies.get('access_token')}`
        },
        params: {
          page: pageNumber,
          size: pageSize
        }
      }).then((res) => {
        if(res.data === ""){
          return null;
        }
        else{
          setShowProspects(res.data.prospects)
          setTotalElements(res.data.totalElements)
          setTotalPages(res.data.totalPages)
        }
        setLoading(false)
      })
    }
  }

  const getProspectsByStatus = async (status) => {
    setStatus(status)
    if(selectedList.name === "all"){
      const userId = cookies.get("userId")
      await axios.get("/api/prospects/prospect/user/status", {
          headers: {
            "Authorization": `Bearer ${cookies.get('access_token')}`
          },
          params: {
            userId: userId,
            status: status,
            page: pageNumber,
            size: pageSize
          }
      }).then((res) => {
          setShowProspects(res.data.prospects)
          setTotalElements(res.data.totalElements)
          setTotalPages(res.data.totalPages)
          setLoading(false)
      })
    }
    else{
      await axios.get(`/api/prospects/prospect/${selectedList.id}/status`, {
          headers: {
            "Authorization": `Bearer ${cookies.get('access_token')}`
          },
          params: {
            status: status,
            page: pageNumber,
            size: pageSize
          }
      }).then((res) => {
          setShowProspects(res.data.prospects)
          setTotalElements(res.data.totalElements)
          setTotalPages(res.data.totalPages)
          setLoading(false)
      })
    }
  }

  const getProspectCounts = async () => {
    const name = selectedList.name
    const id = selectedList.id
    if(name === "all"){
      const userId = cookies.get("userId")
      await axios.get(`/api/prospects/prospect/user/${userId}/count`, {
          headers: {
            "Authorization": `Bearer ${cookies.get('access_token')}`
          },
      }).then((res) => {
        setProspectCount(res.data)
      })
    }
    else{
      await axios.get(`/api/prospects/prospect/${id}/count`, {
          headers: {
            "Authorization": `Bearer ${cookies.get('access_token')}`
          },
      }).then((res) => {
        setProspectCount(res.data)
      })
    }
  }


  const deleteProspects = () => {
    axios.post("/api/prospects/prospect/deleteAll", selectedProspects, {
        headers: {
          "Authorization": `Bearer ${cookies.get('access_token')}`
        },
    }).then((res) => {
      console.log(res)
    })
  }

  function toggleCreateList(){
    setCreateList(!createList)
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
    if(selectedProspects.length < showProspects.length){
      setSelectedProspects(showProspects.map((d, index) => d.id))
    }
    else{
      setSelectedProspects([]);
    }
  }

  const toggleAddTo = () => {
    setAddTo(!addTo)
  }

  const searchHandler = (e) => {
    if(e.target.value === ""){
      setSearch(false)
      getData()
    }
    else{
      setSearch(true)
      const userId = cookies.get("userId")
      const params = {
        userId: userId,
        keyword: e.target.value
      }
      const headers = {
          "Authorization": `Bearer ${cookies.get('access_token')}`
      }
      axios.get("/api/prospects/prospect/search", {
        headers: headers,
        params: params
      }).then((res) => {
        setShowProspects(res.data)
      })
    }
  }


  return(
    <div className="prospects">
      {add===true ? <Add getData={getData} getProspectCounts={getProspectCounts}/> : null}
      {createList ? <CreateList toggleCreateList={toggleCreateList}/> : null}
      {addTo ? <AddToCampaign toggleAddTo={toggleAddTo} selectedProspects={selectedProspects} getData={getData}/> : null}
      <AppSidebar/>
      <AppTopbar title={"Prospects"}/>
      { prospectView ? <SingleProspect prospect={singleProspect} toggleProspectView={toggleProspectView}/> : null}
        <div className="prospects__container">
          <div className="prospects__container--sidebar">
            <ProspectSidebar toggleCreateList={toggleCreateList} selectedList={selectedList} setSelectedList={setSelectedList}/>
          </div>

          <div className="prospects__container--content">
            <div className="toolbar">
              <div className="name">
                <h4>My Prospects</h4>
              </div>
              <div className="search">
                <input type="search" placeholder="Search" onChange={(e) => searchHandler(e)}/>
                <button onClick={toggleAdd} className="btn">Add Prospects</button>
              </div>
            </div>

            {
              search ? null
                  : 
                <div className="prospects__container--sorter">
                  <div className={`prospects__container--sorter--card ${status === "all" ? "active" : ""}`} onClick={() => {getData(selectedList.name, selectedList.id);}}>
                    <h1 className="copy__para--medium">All</h1>
                    <p className="heading-1">{prospectCount.all}</p>
                  </div>
                  <div className={`prospects__container--sorter--card ${status === "not-contacted" ? "active" : ""}`} onClick={() => getProspectsByStatus("not-contacted")}>
                    <h1 className="copy__para--medium">Not Contacted</h1>
                    <p className="heading-1">{prospectCount.not_contacted}</p>
                  </div>
                  <div className={`prospects__container--sorter--card ${status === "bounced" ? "active" : ""}`} onClick={() => getProspectsByStatus("bounced")}>
                    <h1 className="copy__para--medium">Bounced</h1>
                    <p className="heading-1">{prospectCount.bounced}</p>
                  </div>
                  <div className={`prospects__container--sorter--card ${status === "replied" ? "active" : ""}`} onClick={() => getProspectsByStatus("replied")}>
                    <h1 className="copy__para--medium">Replied</h1>
                    <p className="heading-1">{prospectCount.replied}</p>
                  </div>
                  <div className={`prospects__container--sorter--card ${status === "unsubscribed" ? "active" : ""}`} onClick={() => getProspectsByStatus("unsubscribed")}>
                    <h1 className="copy__para--medium">Unsubscribed</h1>
                    <p className="heading-1">{prospectCount.unsubscribed}</p>
                  </div>
                  <div className={`prospects__container--sorter--card ${status === "not-replied" ? "active" : ""}`} onClick={() => getProspectsByStatus("not-replied")}>
                    <h1 className="copy__para--medium">Not Replied</h1>
                    <p className="heading-1">{prospectCount.not_replied}</p>
                  </div>
                </div>
            }
              {
                loading ? 
                  <div className="prospects__container--actions loader">
                    <div className="loader-out"></div>
                  </div> : 
                  null
              }

            {
              showProspects.length === 0 ? 
                <h1 className="prospects__container--actions">No Data Present</h1> : 
            <>
              <div className="prospects__container--actions">
                <div className="prospects__container--actions--items">
                  <div>
                  <button onClick={() => toggleAddTo()} className={selectedProspects.length ===0 ? "btn-white--disabled" : "btn-white"}>Add To Campaign</button>
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
                      <div className="context-menu__item copy__para--medium">
                        <i className="fas fa-minus-circle"></i>
                        <p>Remove Tags</p>
                      </div>
                      <div className="context-menu__item copy__para--medium" onClick={() => deleteProspects()}>
                        <i className="fas fa-trash"></i>
                        <p>Delete</p>
                      </div>
                    </div>
                  </div>
                </div>
                {
                  search ? null
                  : 
                  <div className="prospects__container--actions--page">
                      <p className="copy__para--medium">Showing</p>
                      <select onChange={(e) => setPageSize(e.target.value)}>
                        <option defaultValue={pageSize === 10 ? 10 : ""} value="10">10</option>
                        <option defaultValue={pageSize === 20 ? 20 : ""} value="20">20</option>
                        <option defaultValue={pageSize === 30 ? 30 : ""} value="30">30</option>
                        <option defaultValue={pageSize === 50 ? 50 : ""} value="50">50</option>
                        <option defaultValue={pageSize === 100 ? 10 : ""} value="100">100</option>
                      </select>
                      <p className="copy__para--medium">/{totalElements}</p>
                  </div>
                }
              </div>

              <div className="table__container">
                <table className="data">
                  <thead>
                    <tr className="row1">
                      <th><input className="col-head " type="checkbox" checked={selectedProspects.length === showProspects.length} onChange={handleSelectAllProspects}/></th>
                      <th className="col-head heading-5">Prospect</th>
                      <th className="col-head heading-5">Contact</th>
                      <th className="col-head heading-5">Company</th>
                      <th className="col-head heading-5">List</th>
                      <th className="col-head heading-5">Tags</th>
                      <th className="col-head heading-5">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      showProspects.map(d => 
                      <tr key={d.id}>
                        <td><input type="checkbox" value={d.id} checked={selectedProspects.includes(d.id)} onChange={handleSelectProspect}/></td>
                        <td><div className="col-data" onClick={() => {setSingleProspect(d); toggleProspectView()}}><span className="badge">{d.firstName.charAt(0).toUpperCase()}</span><p className=" prospectName copy__para--medium">{d.firstName} {d.lastName}</p></div></td>
                        <td >
                          <div className="col-data">
                            <button className={d.prospectEmail !== null ? "col-data btn-contact" : "col-data btn-contact--disabled"}>
                              <i className="fas fa-envelope"></i>
                                {/* {d.prospectEmail} */}
                            </button>
                            <button className={d.prospectLinkedinUrl !== null ? "col-data btn-contact" : "col-data btn-contact--disabled"}>
                                <i className="fab fa-linkedin-in"></i>
                                {d.prospectLinkedinUrl}
                            </button>
                            <button className={d.prospectLinkedinUrl !== null ? "col-data btn-contact" : "col-data btn-contact--disabled"}>
                                {d.prospectMobileNumber}
                            </button>
                          </div>
                        </td>
                        <td><p className="col-data copy__para--medium">{d.prospectCompany !== null ? d.prospectCompany : "-"}</p></td>
                        <td><p className="col-data copy__para--medium">Campaign 1</p></td>
                        <td><p className="col-data copy__para--medium">-</p></td>
                        <td><p className="col-data copy__para--medium">{d.status}</p></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {
                search ? null 
                :
                <div className="add-from-existing__container--page-number">
                  <div className="add-from-existing__container--page-number--prev copy__para--medium" onClick={() => previousPage()}>Prev</div>
                    <p className="add-from-existing__container--page-number--number copy__para--medium">{pageNumber + 1}</p>
                    <div className="add-from-existing__container--page-number--next copy__para--medium" onClick={() => nextPage()}>Next</div>
                </div>
              }
          </>
            }
          </div>
        </div>
   </div>
  )
}

export default ProspectsHome
