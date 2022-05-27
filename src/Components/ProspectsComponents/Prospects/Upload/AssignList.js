import { useState, useEffect } from "react";
import axios from "axios"
import Cookies from 'universal-cookie';
import SuccessfullUpload from "./SuccessfullUpload";

const cookies = new Cookies()
const AssignList = (props) => {
  const [showLists, setShowLists] = useState([])
  const [uploadSucess, setUploadSuccess] = useState(false)

  useEffect(() => {
    getListData()
  }, [])

  const getListData = async () => {
    const userId = cookies.get("userId")
    await axios.get(`/api/prospects/prospect_lists/list?userId=${userId}`, {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      }
    }).then((res) => {
      setShowLists(res.data)
    })
  }


  return (
    <div>
      <SuccessfullUpload/>
      {/* {uploadSucess ? <SuccessfullUpload/> : null} */}
      <form action="">
        <div className="input-block">
          <select onChange={(e) => props.setList(e.target.value)} id="" name="prospect-list">
            <option value="">default</option>
            {showLists.map(d => 
              <option key={d.id} value={d.id}>{d.name}</option>
            )}
          </select>
          <label htmlFor="prospect-list">Prospect list name</label>
        </div>
      </form>
    </div>
  )
}

export default AssignList
