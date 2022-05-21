import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import {GlobalContext} from '../GlobalProvider'

function Register() {
  let navigate = useNavigate()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {userData} = useContext(GlobalContext)
  const [userDataModal, setUserDataModal] = userData


  const handleSubmit = async(e) => {
    e.preventDefault()
    const data = {
      username: username,
      password: password,
    }

    const headers = {
      'Accept': 'application/json'
    }
    try {
      await axios.post('/register', data, headers).then((res) => {
        if(res.status===201){
          navigate('/login')
        }
      })
    }

    catch(err){
      console.log(err)
    }
  }

  return(
    <div>
      <div className="registration">
        <form className="registration__form" action="">
          <input type="email" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
          <button onClick={handleSubmit} className="btn-register">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register;
