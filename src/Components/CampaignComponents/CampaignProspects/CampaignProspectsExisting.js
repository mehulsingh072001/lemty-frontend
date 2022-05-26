import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { GlobalContext } from "../../../GlobalProvider";
import Cookies from 'universal-cookie';
import CampaignReview from "../CampaignReview";

const cookies = new Cookies()
function CampaignProspectsExisting() {
  const {addProspectCampaign, addExistingProspect, selectedCampaign, review} = useContext(GlobalContext)
  const [setCampaignProspectAdd] = addProspectCampaign
  const [addExistingModal, setAddExistingModal] = addExistingProspect
  const [prospects, setProspects] = useState([])
  const [selectedProspects, setSelectedProspects] = useState([])
  const [campaignId] = selectedCampaign
  const [reviewModal, setReviewModal] = review
  const [totalElements, setTotalElements] = useState()
  const [totalPages, setTotalPages] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    getListData()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize])

  function toggleReview(){
    setReviewModal(false)
  }

  function toggleHome(){
    setReviewModal(false)
    setAddExistingModal(false)
    setCampaignProspectAdd(false)
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

  const getListData = async () => {
    const userId = cookies.get("userId")
    const params = {
      userId: userId,
      campaignId: campaignId,
      page: pageNumber,
      size: pageSize
    }
    await axios.get(`/api/prospects/prospect/not-in-campaign/`, {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      },
      params: params
    }).then((res) => {
      if(res.data === ""){
        return null;
      }
      else{
        setProspects(res.data.prospects)
        setTotalElements(res.data.totalElements)
        setTotalPages(res.data.totalPages)
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

  return(
    <>
    <div class="add-from-existing">
      {reviewModal ? <CampaignReview campaignId={campaignId} selectedProspects={selectedProspects} toggleHome={toggleHome} toggleReview={toggleReview}/> : null}
      <nav class="nav">
        <div className="col-1">
          <button onClick={() => setAddExistingModal(!addExistingModal)} className="btn-back"><i class="fas fa-chevron-left"></i></button>
          <h1 className="copy__para--big">Add Prospects To Campaign</h1>
        </div>
        <div className="col-2">
          <button className="btn" onClick={() => setReviewModal(!reviewModal)}>Review</button>
          <button onClick={toggleHome} className="btn-close">&times;</button>
        </div>
      </nav>

      <div className="add-from-existing__container">
            <div className="toolbar">
              <div className="name">
                <h4 className="heading-5">My Prospects</h4>
              </div>
              <div className="search">
                <input type="search" placeholder="Search"/>
              </div>
            </div>

            <div className="add-from-existing__container--page-size">
                <p className="copy__para--medium">Showing</p>
                <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <p className="copy__para--medium">/{totalElements}</p>
            </div>

            <div className="table__container">
              <table className="data">
                <thead>
                  <tr className="row1">
                    <input className="col-head " type="checkbox" checked={selectedProspects.length === prospects.length} onChange={handleSelectAllProspects}/>
                    <th className="col-head heading-5">Prospect</th>
                    <th className="col-head heading-5">Contact</th>
                    <th className="col-head heading-5">Company</th>
                    <th className="col-head heading-5">List</th>
                    <th className="col-head heading-5">Tags</th>
                    <th className="col-head heading-5">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {prospects.map((d, i) => 
                    <tr key={i}>
                      <input type="checkbox" value={d.id} checked={selectedProspects.includes(d.id)} onChange={handleSelectProspect}/>
                      <td><p className="col-data copy__para--medium">{d.firstName} {d.lastName}</p></td>
                      <td><p className="col-data copy__para--medium">
                            {d.prospectLinkedinUrl}
                            {d.prospectMobileNumber}
                            {d.prospectEmail}
                      </p></td>
                      <td><p className="col-data copy__para--medium">{d.prospectCompany}</p></td>
                      <td><p className="col-data copy__para--medium">Campaign 1</p></td>
                      <td><p className="col-data copy__para--medium">-</p></td>
                      <td><p className="col-data copy__para--medium">Not Contacted</p></td>
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
          </div>
      </div>
    </>
  )
}

export default CampaignProspectsExisting;
