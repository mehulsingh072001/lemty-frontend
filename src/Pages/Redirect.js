import {useEffect} from "react"
import Cookies from "universal-cookie"
import axios from "axios"

const cookies = new Cookies();
function Redirect() {
  useEffect(() => {
    submit()
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = () => {
    var url_string = window.location.href
    var url = new URL(url_string)
    var code = url.searchParams.get('code')
    axios.get("api/gmail/get-token/"+cookies.get("userId")+"?code="+code).then((res) => {
      console.log(res)
      if(res.status === 200){
        // window.close()
      }
    })
        // window.close()
  }
  return(
    <div>
      <button onClick={submit}>Submit</button>
    </div>
  )
}

export default Redirect
