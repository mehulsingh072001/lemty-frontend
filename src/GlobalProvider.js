import {createContext, useState} from "react"

export const GlobalContext = createContext([])

export const GlobalProvider = (props) => {
  const [add, setAdd] = useState(false)
  const [campaignProspectAdd, setCampaignProspectAdd] = useState(false)
  const [newP, setNewP] = useState(false)
  const [newUpload, setNewUpload] = useState(false)
  const [list, setList] = useState(false)
  const [addExistingModal, setAddExistingModal] = useState(false)
  const [userDataModal, setUserDataModal] = useState(true)
  const [editorOpen, setEditorOpen] = useState(false)
  const [campaignId, setCampaignId] = useState("")
  const [addStep, setAddStep] = useState([])
  const [campaignData, setCampaignData] = useState([])
  const [modal, setModal] = useState(false)
  const [editor, setEditor] = useState(false)
  const [progress, setProgress] = useState(0)
  const [reviewModal, setReviewModal] = useState(false)
  const [previewModal, setPreviewModal] = useState(false)

  return(
    <div>
      <GlobalContext.Provider 
        value={{
          addProspect:[add, setAdd], 
          addProspectCampaign: [campaignProspectAdd, setCampaignProspectAdd], 
          addExistingProspect: [addExistingModal, setAddExistingModal], 
          newProspect: [newP, setNewP], 
          createList:[list, setList], 
          editor:[editorOpen, setEditorOpen], 
          step:[addStep, setAddStep], 
          campaign:[campaignData, setCampaignData], 
          userData:[userDataModal, setUserDataModal],
          upload:[newUpload, setNewUpload], 
          selectedCampaign: [campaignId, setCampaignId], 
          updateCampaign: [modal, setModal],
          emailEditor: [editor, setEditor],
          campaignBar: [progress, setProgress],
          review: [reviewModal, setReviewModal],
          preview: [previewModal, setPreviewModal]
        }}
      >
        {props.children}
      </GlobalContext.Provider>
    </div>
  )
}
