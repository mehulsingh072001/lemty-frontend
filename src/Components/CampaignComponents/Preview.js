import axios from "axios"
import Cookies from "universal-cookie"
import { useEffect, useState } from "react"
import moment from "moment"
import {useNavigate} from "react-router"

import { Editor } from "@tinymce/tinymce-react"

const cookies = new Cookies()
function Preview({selectedProspects, togglePreview, toggleHome, campaignId, setProgress, setAddStep}) {
  const [previews, setPreviews] = useState([])
  const [selectedPreview, setSelectedPreview] = useState(0)
  const [selectedStep, setSelectedStep] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    generatePreview()
  }, [])
  
  const generatePreview = () => {
    const x = moment().format();
    const data = {
      selectedProspects: selectedProspects,
      selectedCampaign: campaignId,
      startAt: x
    }
    axios.post("/campaigns/generateProspectPreview", data, {
        headers: {
          "Authorization": `Bearer ${cookies.get('access_token')}`
        },
        params: {
          "userId": cookies.get("userId")
        }
    }).then((res) => {
      setPreviews(res.data)
    })
  }

  const campaignStart = () => {
    axios.post("/job/campaign/preview-start", previews, {
        headers: {
          "Authorization": `Bearer ${cookies.get('access_token')}`
        },
        params: {
          userId: cookies.get("userId"),
          campaignId: campaignId
        }
    }).then((res) => {
      console.log(res)
      if(res.status === 200){
        // toggleHome()
        // navigate("/campaigns")
        toggleHome()
        setAddStep([])
        navigate(`/campaigns/${campaignId}/step`)
        setProgress(0)
      }
    })
  }

  const selectProspect = (index) => {
    setSelectedPreview(index)
    setSelectedStep(0)
  }

  const subjectChange = (e) => {
    const list = [...previews];
    list[selectedPreview].previews[selectedPreview].subject = e.target.value
    list[selectedPreview].previews[selectedPreview].edited = true
    setPreviews(list)
  }

  const bodyChange = (e) => {
    const list = [...previews];
    list[selectedPreview].previews[selectedPreview].body = e.target.getContent()
    list[selectedPreview].previews[selectedPreview].edited = true
    setPreviews(list)
  }

  return(
    <div className="preview">
      <nav className="nav">
        <div className="col-1">
          <button onClick={togglePreview} className="btn-back"><i class="fas fa-chevron-left"></i></button>
          <h1 className="copy__para--big">Preview Campaign</h1>
        </div>
        <div className="col-2">
          <button className="btn" onClick={campaignStart}>Start Campaign</button>
          <button onClick={toggleHome} className="btn-close">&times;</button>
        </div>
      </nav>

      <div className="preview__container">
        <div className="preview__container--item">
          <div className="header">
            <ul className="header__links">
              <li className="copy__para--big">Total Prospects: <strong>{previews.length}</strong></li>
            </ul>
          </div>
          {
            previews.map((d, index) => 
               <>
               <div className={selectedPreview === index ? "selector active" : "selector"} onClick={() => selectProspect(index)}>
                  <p key={index} className="copy__para--medium">{d.prospectEmail}</p>
               </div>
               </>
            )
          }
        </div>

        <div className="preview__container--item">
          <div className="header">
            <ul className="header__links">
              {
                previews.length !== 0 ? previews[selectedPreview].previews.map((d, i) =>
                  <li key={i} onClick={() => setSelectedStep(i)} className={`header__links--link ${i === selectedStep ? "active heading-4" : "copy__para--medium-light"}`}><i class="fas fa-envelope"></i> Step: {d.stepNumber}</li>
                ) : null
              }
            </ul>
          </div>

          <div className="mail-body__container">
            <div className="row">
              <div className="mail-body__container--item">
                  <p className="copy__para--medium-light head">From-Id</p>
                  <p className="copy__para--medium para">{previews.length !== 0 ? previews[selectedPreview].previews[selectedStep].from : null}</p>
              </div>
              <div className="mail-body__container--item">
                  <p className="copy__para--medium-light head">StartDate</p>
                  <p className="copy__para--medium para">{previews.length !== 0 ? new Date(previews[selectedPreview].previews[selectedStep].startDate).toString() : null}</p>
              </div>
            </div>

            <div className="mail-body__container--item">
                <p className="copy__para--medium-light head">To</p>
                <p className="copy__para--medium para">{previews.length !== 0 ? previews[selectedPreview].previews[selectedStep].to : null}</p>
            </div>

            <div className="mail-body__container--item">
              <p className="copy__para--medium-light head">Subject</p>
              <input className="copy__para--medium para" defaultValue={previews.length !== 0 ? previews[selectedPreview].previews[selectedStep].subject : null} onChange={(e) => subjectChange(e)}/>
            </div>

            <div className="mail-body__container--item">
              <Editor
                apiKey="fnajkiw2wcz5d1lrgsif3xicw1wdvcj4f9hmzxrngbljd9b6"
                initialValue={previews.length !== 0 ? previews[selectedPreview].previews[selectedStep].body : null}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist underline autolink lists link image tinydrive', 
                    'charmap print preview anchor help forecolor',
                    'searchreplace visualblocks code emoticons link',
                    'insertdatetime media table paste wordcount table fontselect'
                  ],
                  toolbar_mode: "wrap",
                  toolbar:
                    'fontselect fontsizeselect forecolor  \
                    | bold italic underline \
                    | alignleft aligncenter alignright alignjustify| \
                    bullist numlist outdent indent \
                    | table link image code \
                    | emoticons ',
                  image_title: true,
                  automatic_uploads: true,
                  paste_data_images: true,
                  statusbar: false,
                }}
                onChange={(e) => bodyChange(e)}
              />
            </div>

            <div className="mail-body__container--item">
              <button className="btn-sec">Send Test Email</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview;
