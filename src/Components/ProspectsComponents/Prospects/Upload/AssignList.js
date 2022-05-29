import { useState, useEffect } from "react";
import axios from "axios"
import Cookies from 'universal-cookie';
import SuccessfullUpload from "./SuccessfullUpload";
import ListSelector from "../../../ListSelector"

const cookies = new Cookies()
const AssignList = (props) => {
  const [showLists, setShowLists] = useState([])

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
      {props.uploadSucess ? <SuccessfullUpload toggleHome={props.toggleHome} uploadResponse={props.uploadResponse}/> : null}
      <ListSelector list={props.list} setList={props.setList} listData={showLists}/>
    </div>
  )
}

export default AssignList
