import {useState} from "react"
import axios from "axios"
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function PasswordUpdate({togglePasswordUpdate}){
  const [password, setPassword] = useState('')

  const addList = () => {
    const userId = cookies.get("userId")
    const token = cookies.get("access_token")
    const data = {
      password: password
    }
    axios.put(`/api/users/update/${userId}`, data, {
      headers:{
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      if(res.status === 201){
        //toggleCreateList()
        window.location.reload()
      }
    })
  }

  return(
    <div className="add-list">
      <div className="add-list__card">
        <h1 className="">Create List</h1>
        <div className="add-list__form">
          <input type="text" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <div className="add-list__button">
          <button onClick={() => togglePasswordUpdate()} className="btn-sec">Cancel</button>
          <button className="btn" onClick={addList}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default PasswordUpdate
