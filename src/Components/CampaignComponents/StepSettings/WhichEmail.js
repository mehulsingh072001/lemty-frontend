import axios from "axios"
import { useState, useEffect, useContext } from "react"
import Cookies from 'universal-cookie';
import { GlobalContext } from "../../../GlobalProvider"

const cookies = new Cookies()
const WhichEmail = ({selectedEmail, setSelectedEmail}) => {
  const {step} = useContext(GlobalContext)
  const [addStep, setAddStep] = step
  const [creds, setCreds] = useState([])
  const userId = cookies.get("userId")

  useEffect(() => {
    getCreds()
  }, [])

  const headers = {
      "Authorization": `Bearer ${cookies.get('access_token')}`
  }

  const getCreds = () => {
    const params = {
      userId: userId
    }
    axios.get(`/creds/`, {
      params : params,
      headers: headers
    }).then((res) => {
      setCreds(res.data)
    })
  }

  return(
    <div className="assign">
      <h3 className="assign__heading">Email Sent from the selected email</h3>
      <form className="assign__form" action="">
        <select value={selectedEmail} onChange={(e) => setSelectedEmail(e.target.value)}>
          <option value="">None</option>
          {
            creds.map((d, i) => 
                <option key={i} value={d.email}>{d.email}</option>
            )
          }
        </select>
      </form>
    </div>
  )
}

export default WhichEmail
