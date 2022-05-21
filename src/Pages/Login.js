import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login() {
  let navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    const url = 'http://localhost:8080'
    const data = {
      username: username,
      password: password
    }
    //make axios post request
    await axios.post(`/login`, data, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if(res.status === 200){

        navigate('/')
      }
    })
    }

  return (
    <div>
      <div className="login">
        <form className="login__form">
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Username or Email"/>
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button onClick={handleSubmit} className="login__form--submit">Login</button>
        </form>

        <div className="seprator">
          <div className="line"></div>
          <p>Or</p>
          <div className="line"></div>
        </div>

        <Link to="/register" className="btn-register">Register</Link>
      </div>
    </div>
  )
}

export default Login;
