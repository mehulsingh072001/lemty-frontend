import {useContext} from "react"
import { GlobalContext } from "../../../GlobalProvider"
import Upload from "./Upload/Upload"
import New from "./New"

function Add(props){
  const {addProspect, newProspect, upload} = useContext(GlobalContext)
  const [newUpload, setNewUpload] = upload
  const [add, setAdd] = addProspect
  const [newP, setNewP] = newProspect

  function toggleAdd(){
    setAdd(!add)
  }

  function toggleNew(){
    setNewP(!newP)
  }

  function toggleUpload(){
    setNewUpload(!newUpload)
  }
  return(
    <div className="add">
      {newP===true ? <New/> : null}
      {newUpload===true ? <Upload getData={props.getData} getProspectCounts={props.getProspectCounts}/> : null}
      <nav className="nav">
        <h1>Add Prospects</h1>
        <button onClick={toggleAdd} className="close">&times;</button>
      </nav>

      <div className="add__container">
        <h2>How would you like to add Prospects?</h2>

        <button onClick={toggleUpload} className="add__container--card">
          <i className="fas fa-file-csv"></i>
          <p>Upload CSV file</p>
          <i className="fas fa-arrow-right"></i>
        </button>
        <button onClick={toggleNew} className="add__container--card">
          <i className="fas fa-user"></i>
          <p>Create A New Prospect</p>
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  )
}

export default Add
