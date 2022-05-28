import { useState, useContext } from "react";
import axios from "axios"
import Cookies from 'universal-cookie';
import { GlobalContext } from "../../../../GlobalProvider";
import UploadModalBar from "./UploadModalBar"
import DragAndDrop from "./DragAndDrop";
import UploadNav from "./UploadNav";
import MapColumns from "./MapColumns";
import AssignList from "./AssignList";

const cookies = new Cookies();
function Upload({getData, getProspectCounts}){
  const {addProspect, upload} = useContext(GlobalContext)
  const [add, setAdd] = addProspect
  const [progress, setProgress] = useState(1)
  const [csvHeaders, setCsvHeaders] = useState(null)
  const [prospectData, setProspectData] = useState([])
  const [list, setList] = useState("")
  const [newUpload, setNewUpload] = upload
  const [file, setFile] = useState(null)
  const token = cookies.get("access_token")
  const user_id = cookies.get("userId")
  const [uploadSucess, setUploadSuccess] = useState(false)
  const [uploadResponse, setUploadResponse] = useState({})

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
    axios.post(`/api/csv/csvToProspects/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      },
      params: params
    }).then((res) => {
      console.log("Submitted1")
      if(res.status === 200){
        setUploadSuccess(true)
        console.log(res.data)
        setUploadResponse(res.data)
      }
    })
  }

  function toggleUpload(){
    setNewUpload(!newUpload)
  }

  function toggleHome(){
    setNewUpload(false)
    setAdd(!add)
    setUploadSuccess(false)
    getData()
    getProspectCounts()
  }

  const selectProgress = (number) => {
    setProgress(number)
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
          <UploadNav toggleUpload={toggleUpload} importProspect={importProspect} nextStep={nextStep} progress={progress} toggleHome={toggleHome}/>

          <div className="upload__container">
              <UploadModalBar progress={progress} selectProgress={selectProgress}/>
              <DragAndDrop handleFileUpload={handleFileUpload}/>
          </div>
        </div>
      )
    case 2:
      return(
        <div className="upload">
          <UploadNav toggleUpload={toggleUpload} importProspect={importProspect} nextStep={nextStep} progress={progress} toggleHome={toggleHome}/>
          <div className="upload__container">
              <UploadModalBar progress={progress} selectProgress={selectProgress}/>
              <MapColumns csvHeaders={csvHeaders} prospectData={prospectData} setProspectData={setProspectData}/>
          </div>
        </div>
      )
    case 3:
      return(
        <div className="upload">
          <UploadNav toggleUpload={toggleUpload} importProspect={importProspect} nextStep={nextStep} progress={progress} toggleHome={toggleHome}/>
          <div className="upload__container">
              <UploadModalBar progress={progress} selectProgress={selectProgress}/>
              <AssignList list={list} setList={setList} uploadSucess={uploadSucess} toggleHome={toggleHome} uploadResponse={uploadResponse}/>
          </div>
        </div>
      )
    default: 
      break
  }
}

export default Upload
