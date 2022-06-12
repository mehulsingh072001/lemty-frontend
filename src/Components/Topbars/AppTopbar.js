import axios from "axios";
import Cookies from "universal-cookie";
import {useEffect, useState} from "react"
import { useNavigate } from "react-router";

const cookies = new Cookies()
function AppTopbar(props){
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  useEffect(() => {
    getUser()
    const closeMenuOnEsc = (e) => {
      if(e.keyCode === 27){
        let el = document.getElementsByClassName("context-menu1")[0]
        el.style.display = "none"
      }
    }
    window.addEventListener("keydown", closeMenuOnEsc)
  }, [])


  const toggleMenu = () => {
    let el = document.getElementsByClassName("context-menu1")[0]
    if(el.style.display === "block"){
      el.style.display = "none"
    }
    else{
      el.style.display = "block"
    }
  }

  const getUser = () => {
    const userId = cookies.get("userId")
    axios.get(`/api/users/${userId}`, {
      headers: {
        "Authorization": `Bearer ${cookies.get('access_token')}`
      }
    }).then((res) => {
      setUser(res.data)
    })
  }

  const signOut = () => {
    cookies.remove("userId");
    cookies.remove("access_token");
    window.location.reload();
  }

  return(
    <nav className="app-topbar">
      <div className="app-topbar__container">
        <div className="app-topbar__title"><h4 className="heading-2">{props.title}</h4></div>

        <div className="app-topbar__options">
          <div className="app-topbar__options--profile">
            <button onClick={() => toggleMenu()} className="button copy__para--medium">{Object.keys(user).length !== 0 ? user.username.charAt(0).toUpperCase() : null}</button>
            <div className="context-menu1" style={{display: "none"}}>
              <div className="context-menu1__content">
                <div className="context-menu1__content--option copy__para--medium" onClick={() => navigate("/settings/user")}>{Object.keys(user).length !== 0 ? user.username : null}</div>
                <div className="context-menu1__content--option copy__para--medium" onClick={() => navigate("/settings")}>Settings</div>
                <div className="context-menu1__content--option copy__para--medium" onClick={() => navigate("/settings/user")}>Profile & Preferences</div>
                <div className="context-menu1__content--option copy__para--medium btn-delete" onClick={() => signOut()}>Signout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AppTopbar;
