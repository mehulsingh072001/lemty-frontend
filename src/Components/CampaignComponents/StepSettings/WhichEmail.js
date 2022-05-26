import axios from "axios"
import { useState, useEffect } from "react"
import Cookies from 'universal-cookie';

const cookies = new Cookies()
const WhichEmail = ({selectedEmail, setSelectedEmail}) => {
  const [creds, setCreds] = useState([])
  const userId = cookies.get("userId")

  useEffect(() => {
    getCreds()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const headers = {
      "Authorization": `Bearer ${cookies.get('access_token')}`
  }

  const getCreds = () => {
    const params = {
      userId: userId
    }
    axios.get(`/api/creds/`, {
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
