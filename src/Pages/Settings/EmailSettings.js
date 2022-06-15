import AppSidebar from "../../Components/Sidebars/AppSidebar";
import AppTopbar from "../../Components/Topbars/AppTopbar"
import ToggleSwitch from "../../Components/ToggleSwitch";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { Editor } from '@tinymce/tinymce-react'; 

const cookies = new Cookies()
function EmailSettings() {
  let navigate = useNavigate()
  const userId = cookies.get("userId")
  const [creds, setCreds] = useState([])
  const [displayName, setDisplayName] = useState("")
  const [signature, setSignature] = useState("")
  const [getSignature, setGetSignature] = useState([])
  const [unsubBody, setUnsubBody] = useState("")
  const [getUnsub, setGetUnsub] = useState([])

  useEffect(() => {
    getCreds();
    getSignatureServer();
    getUnsubServer();
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

  const getSignatureServer = () => {
    axios.get("/api/signature", {
      params: {
        userId: userId
      },
      headers: headers
    }).then((res) => {
      setGetSignature(res.data)
    })
  }

  const updateDisplayName = (credsId) => {
    const params = {
      credsId: credsId
    }
    const data = {
      displayName: displayName
    }
    axios.put("/api/creds/name", data, {
      params: params,
      headers: headers
    }).then((res) => {
      console.log(res)
      if(res.status === 201){
        window.location.reload()
      }
    })
  }

  const submitSignature = () => {
    const params = {
      userId: userId
    }

    const data = {
      signature: signature
    }

    axios.post("/api/signature", data, {
      headers: headers,
      params: params
    }).then((res) => {
      if(res.status === 201){
        window.location.reload()
      }
    })
  }

  const getUnsubServer = () => {
    axios.get("/api/unsubscribe", {
      params: {
        userId: userId
      },
      headers: headers
    }).then((res) => {
      setGetUnsub(res.data)
      console.log(res.data)
    })
  }


  const updateSignature = (id) => {
    const params = {
      signatureId: id
    }
    const data = {
      signature: signature
    }
    axios.put("/api/signature/update", data, {
      headers: headers,
      params: params
    }).then((res) => {
      window.location.reload()
    })
  }

  const deleteSignature = (id) => {
    const params = {
      signatureId: id
    }
    axios.delete("/api/signature", {
      params: params,
      headers: headers
    }).then((res) => {
      if(res.status === 200){
        window.location.reload()
      }
    })
  }

  const submitUnsubBody = () => {
    const params = {
      userId: userId
    }
    const data = {
      body: unsubBody
    }
    axios.post("/api/unsubscribe", data, {
      headers: headers,
      params: params
    }).then((res) => {
      if(res.status === 200){
        window.location.reload()
      }
    })
  }

  const updateUnsub = (id) => {
    const params = {
      unsubId: id
    }
    const data = {
      body: unsubBody
    }
    axios.put("/api/unsubscribe", data, {
      headers: headers,
      params: params
    }).then((res) => {
      window.location.reload()
    })
  }

  const deleteUnsub = (id) => {
    const params = {
      unsubId: id
    }
    axios.delete("/api/unsubscribe", {
      params: params,
      headers: headers
    }).then((res) => {
      if(res.status === 200){
        window.location.reload()
      }
    })
  }

  const deleteCred = (credsId) => {
    const params = {
      credsId: credsId
    }
    axios.delete('/api/creds/', {
      params: params,
      headers: headers
    }).then((res) => {
      console.log(res.data)
      window.location.reload()
    })
  }

  const oauthSignIn = (e) => {
    e.preventDefault()
    const accessType = "access_type=offline&";
    const response_type = "response_type=code&";
    const include_granted_scopes = "include_granted_scopes=true&";
    // const scope = "scope=https://www.googleapis.com/auth/gmail.compose&";
    const scopeArray = "https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.settings.basic";
    const arrayStr = encodeURIComponent(scopeArray)
    const scope = "scope="+arrayStr+"&"
    // const redirect_uri = "redirect_uri=http://localhost:3000/redirect&";
    const redirect_uri = "redirect_uri=https://lemty.wurnace.com/redirect&";
    const client_id = "client_id=1087727582839-72qgrk3g3ea46kq65coo7lbgg3f5cteg.apps.googleusercontent.com&";
    const prmt = "prompt=consent&"
    const auth_url = "https://accounts.google.com/o/oauth2/v2/auth?"+scope+accessType+include_granted_scopes+response_type+redirect_uri+prmt+client_id;
    var newWindow = window.open(auth_url, null, 'height=500,width=450')
    newWindow.focus()
  }

  return(
    <div className="email-settings">
      <AppSidebar/>
      <AppTopbar title={"Settings"}/>
      <div className="email-settings__container">
        <div className="email-settings__container--sidebar">
          <button className="s-back" onClick={() => navigate("/settings")}><i className="fas fa-chevron-left"></i><span>Back</span></button>
          <ul>
            <li onClick={() => document.getElementById("account").scrollIntoView()}><p className="copy__para--medium">Email Account</p></li>
            <li onClick={() => document.getElementById("signatures").scrollIntoView()}><p className="copy__para--medium">Signatures</p></li>
            <li onClick={() => document.getElementById("unsub").scrollIntoView()}><p className="copy__para--medium">Unsubscribe Link</p></li>
            <li onClick={() => document.getElementById("tracking").scrollIntoView()}><p className="copy__para--medium">Tracking</p></li>
          </ul>
        </div>

        <div className="email-settings__container--content">
          <p className="path">Settings/ email</p>

          <div className="email-settings__container--content--card" id="account">
            <div className="email-settings__container--content--card--head">
              <h4 className="heading-2">Email account</h4>
              <button className="btn-tertiary" onClick={oauthSignIn}>+ Add an email account</button>
            </div>

            {
              creds.length === 0 ? 
              <p className="copy__para--medium">Connect the email account that you will be using for your campaigns</p>
              :
              creds.map(d => 
                <div key={d.id} className="creds__container">
                  <div>
                    <h4 className="heading-1">{d.email}</h4>
                    <div className="row">
                      <input type="text" defaultValue={d.displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                      <button className={`btn ${displayName === "" ? 'btn--disabled' : ""}`} onClick={() => updateDisplayName(d.id)}>Save</button>
                    </div>
                  </div>
                  <button className="btn-delete" onClick={() => deleteCred(d.id)}><i className="fas fa-trash"></i></button>
                </div>
              )
            }
          </div>

          <div className="email-settings__container--content--card" id="signatures">
            <div className="email-settings__container--content--card--head">
              <h4 className="heading-2">Signatures</h4>
              {
                getSignature.length === 0 ? 
                  <button className={`btn ${signature === "" ? 'btn--disabled' : ""}`} onClick={submitSignature}>Save</button> :
                  getSignature.map((d, index) => 
              <button key={index} className={`cta ${signature === "" ? 'btn-disabled' : ""}`} onClick={() => updateSignature(d.id)}>Update</button>
                  )
              }
            </div>

            {
              getSignature.length === 0 ? 
                <div className="u-margin-top-medium editor-container">
                  <Editor
                    apiKey="fnajkiw2wcz5d1lrgsif3xicw1wdvcj4f9hmzxrngbljd9b6"
                    initialValue=""
                    init={{
                      height: 200,
                      menubar: false,
                      plugins: [
                        'advlist underline autolink lists link image tinydrive', 
                        'charmap print preview anchor help forecolor',
                        'searchreplace visualblocks code emoticons link',
                        'insertdatetime media table paste wordcount table fontselect'
                      ],
                      toolbar_mode: "wrap",
                      toolbar:
                          "fontselect fontsizeselect forecolor | bold italic underline | alignleft aligncenter alignright alignjustify| bullist numlist outdent indent | table link image code | emoticons ",
                      image_title: true,
                      automatic_uploads: true,
                      paste_data_images: true,
                      statusbar: false,
                      theme_advanced_toolbar_location: "bottom",
                    }}
                    onChange={(e) => setSignature(e.target.getContent())}
                  />
                </div>
              :
              getSignature.map((d, index) => 
               <div key={index}>
                  <div className="u-margin-top-medium editor-container">
                    <Editor
                      apiKey="fnajkiw2wcz5d1lrgsif3xicw1wdvcj4f9hmzxrngbljd9b6"
                      initialValue={d.signature}
                      init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                          'advlist underline autolink lists link image tinydrive', 
                          'charmap print preview anchor help forecolor',
                          'searchreplace visualblocks code emoticons link',
                          'insertdatetime media table paste wordcount table fontselect'
                        ],
                        toolbar_mode: "wrap",
                        toolbar:
                          "fontselect fontsizeselect forecolor | bold italic underline | alignleft aligncenter alignright alignjustify| bullist numlist outdent indent | table link image code | emoticons ",
                        image_title: true,
                        automatic_uploads: true,
                        paste_data_images: true,
                        statusbar: false,
                        theme_advanced_toolbar_location: "bottom",
                      }}
                      onChange={(e) => setSignature(e.target.getContent())}
                    />
                  </div>
                  <div className="u-end u-margin-top-medium">
                    <button className="btn-delete" onClick={() => deleteSignature(d.id)}>Delete Signature</button>
                  </div>
               </div>
                ) 
            }
          </div>

          <div className="email-settings__container--content--card" id="unsub">
            <div className="email-settings__container--content--card--head">
              <h4 className="heading-2">Unsubscribe link text</h4>
              {
                getUnsub.length === 0 ? 
                  <button className={`btn ${unsubBody === "" ? 'btn--disabled' : ""}`} onClick={submitUnsubBody}>Save</button> :
                  <button className={`btn ${unsubBody === "" ? 'btn--disabled' : ""}`} onClick={() => updateUnsub(getUnsub.id)}>Update</button>
              }
            </div>

            {
               <div>
                  <div className="u-margin-top-medium editor-container">
                    <Editor
                      apiKey="fnajkiw2wcz5d1lrgsif3xicw1wdvcj4f9hmzxrngbljd9b6"
                      initialValue={getUnsub.body}
                      init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                          'advlist underline autolink lists link image tinydrive', 
                          'charmap print preview anchor help forecolor',
                          'searchreplace visualblocks code emoticons link',
                          'insertdatetime media table paste wordcount table fontselect'
                        ],
                        toolbar_mode: "wrap",
                        toolbar:
                          "fontselect fontsizeselect forecolor | bold italic underline | alignleft aligncenter alignright alignjustify| bullist numlist outdent indent | table link image code | emoticons ",
                        image_title: true,
                        automatic_uploads: true,
                        paste_data_images: true,
                        statusbar: false,
                        theme_advanced_toolbar_location: "bottom",
                      }}
                      onChange={(e) => setUnsubBody(e.target.getContent())}
                    />
                  </div>
                  <div className="u-end u-margin-top-medium">
                    <button className="btn-delete" onClick={() => deleteUnsub(getUnsub.id)}>Delete Signature</button>
                  </div>
               </div>
            }
          </div>

          <div className="email-settings__container--content--card" id="tracking">
            <h4 className="heading-2">Email Tracking</h4>
            <div className="row">
              <ToggleSwitch/>
              <p>Track Email Opens</p>
            </div>
            <div className="row">
              <ToggleSwitch/>
              <p>Track Link Clicks</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EmailSettings;
