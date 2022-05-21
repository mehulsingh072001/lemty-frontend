import {useEffect} from "react"
import {useNavigate, Outlet, useLocation} from "react-router-dom"

function Prospects(){
  let location = useLocation()
  let navigate = useNavigate()
  useEffect(() => {
    getUrl()
  }, [location])

  function getUrl() {
    if(location.pathname === "/prospects"){
      navigate('/prospects/home')
    }
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Prospects
