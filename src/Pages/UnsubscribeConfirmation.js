import axios from "axios"
import { useParams } from "react-router"
import { useState } from "react";

const UnsubscribeConfirmation = () => {
  let {id} = useParams();
  const[unsubed, setUnsubed] = useState(false)

  const prospectUnsubscribe = () => {
    axios.get(`/unsubscribe/prospect/${id}`).then(
      setUnsubed(true)
    )
  }

  return(
    <div className="confirmation">
      <div className="confirmation__container">
        {
          unsubed ? 
          <>
            <h1>Successfully unsubscribed.</h1>
          </>
          :
          <>
            <h1>Are you sure you want to unsubscribe from any future emails from this sender?</h1>
            <div className="actions">
              <button className="confirm" onClick={() => prospectUnsubscribe()}>Confirm</button>
              <button className="cancel">Cancel</button>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default UnsubscribeConfirmation;
