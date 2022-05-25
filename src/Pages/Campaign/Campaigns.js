import {useEffect} from "react"
import {useNavigate, Outlet, useLocation} from "react-router-dom"

function Campaigns(){
  let location = useLocation()
  let navigate = useNavigate()
  useEffect(() => {
    getUrl()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  function getUrl() {
    if(location.pathname === "/campaigns"){
      navigate('/campaigns/home')
    }
  }
  return (
    <div>
    <Outlet/>
    </div>
  )
}

export default Campaigns
