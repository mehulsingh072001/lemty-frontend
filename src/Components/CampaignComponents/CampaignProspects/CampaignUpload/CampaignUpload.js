import { useState, useContext } from "react";
import axios from "axios"
import Cookies from 'universal-cookie';
import { GlobalContext } from "../../../../GlobalProvider";
import UploadModalBar from "./CampaignUploadModalBar"
import DragAndDrop from "./CampaignDragAndDrop";
import UploadNav from "./CampaignUploadNav";
import MapColumns from "./CampaignMapColumns";
import AssignList from "./CampaignAssignList";
import CampaignReview from "../../CampaignReview";

const cookies = new Cookies();
function Upload(){
  const {addProspectCampaign, upload, review} = useContext(GlobalContext)
  const [setCampaignProspectAdd] = addProspectCampaign
  const [progress, setProgress] = useState(1)
  const [csvHeaders, setCsvHeaders] = useState(null)
  const [prospectData, setProspectData] = useState([])
  const [list, setList] = useState("")
  const [newUpload, setNewUpload] = upload
  const [file, setFile] = useState(null)
  const [prospectIds, setProspectIds] = useState([])
  const [reviewModal, setReviewModal] = review

  const token = cookies.get("access_token")
  const user_id = cookies.get("userId")

  const handleFileUpload = (f) => {
    let data = new FormData()
    setFile(f)
    data.append('file', f)
    axios.post("/api/csv/getCsvHeaders", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      if(res.status === 200){
        setCsvHeaders(res.data)
        setProgress(progress + 1)
      }
    })
  }

  const importProspect = () => {
    let data = new FormData()
    data.append("file", file)
    data.append("firstName", prospectData.firstName)
    data.append("lastName", prospectData.lastName)
    data.append("prospectEmail", prospectData.prospectEmail)
    data.append("prospectCompany", prospectData.prospectCompany)
    data.append("prospectMobileNumber", prospectData.prospectMobileNumber)
    data.append("prospectAccount", prospectData.prospectAccount)
    data.append("prospectCompanyEmail", prospectData.prospectCompanyEmail)
    data.append("prospectDepartment", prospectData.prospectDepartment)
    data.append("prospectTitle", prospectData.prospectTitle)
    data.append("prospectCompanyDomain", prospectData.prospectCompanyDomain)
    data.append("prospectLinkedinUrl", prospectData.prospectLinkedinUrl)
    data.append("prospectTwitterUrl", prospectData.prospectTwitterUrl)
    data.append("prospectLocation", prospectData.prospectLocation)
    data.append("prospectCountry", prospectData.prospectCountry)

    const params = {
      listId: list,
      userId: user_id,
    }

    // axios.post(`/csv/csvToProspects/${list}/${user_id}`)
    axios.post(`/csv/csvToProspects/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
      params: params
    }).then((res) => {
      if(res.status === 200){
        const ids = []
        res.data.map((d,i) => 
         ids.push(d.id)
        )
      setProspectIds(ids)
      setReviewModal(!reviewModal)
      }
    })
  }

  // function toggleAdd(){
  //   setAdd(!add)
  // }

  function toggleReview(){
    return null;
  }

  function toggleUpload(){
    setNewUpload(!newUpload)
  }

  function toggleHome(){
    setNewUpload(false)
    setReviewModal(false)
    setCampaignProspectAdd(false)
  }

  const selectProgress = (number) => {
    setProgress(number)
  }

  const prevStep = () => {
      setProgress(progress - 1)
  }

  const nextStep = () => {
    if(progress <= 2){
      setProgress(progress + 1)
    }
  }

  switch(progress){
    case 1:
      return(
        <div className="upload">
          <UploadNav toggleUpload={toggleUpload} importProspect={importProspect} nextStep={nextStep} prevStep={prevStep} progress={progress} toggleHome={toggleHome}/>

          <div className="upload__container">
              <UploadModalBar progress={progress} selectProgress={selectProgress}/>
              <DragAndDrop handleFileUpload={handleFileUpload}/>
          </div>
        </div>
      )
    case 2:
      return(
        <div className="upload">
          <UploadNav toggleUpload={toggleUpload} importProspect={importProspect} nextStep={nextStep} prevStep={prevStep} progress={progress} toggleHome={toggleHome}/>
          <div className="upload__container">
              <UploadModalBar progress={progress} selectProgress={selectProgress}/>
              <MapColumns csvHeaders={csvHeaders} prospectData={prospectData} setProspectData={setProspectData}/>
          </div>
        </div>
      )
    case 3:
      return(
        <div className="upload">
          {reviewModal ? <CampaignReview selectedProspects={prospectIds} toggleHome={toggleHome} toggleReview={toggleReview}/> : null}
          <UploadNav toggleUpload={toggleUpload} importProspect={importProspect} nextStep={nextStep} prevStep={prevStep} progress={progress} toggleHome={toggleHome}/>
          <div className="upload__container">
              <UploadModalBar progress={progress} selectProgress={selectProgress}/>
              <AssignList list={list} setList={setList}/>
          </div>
        </div>
      )
    default: 
      break
  }
}

export default Upload
