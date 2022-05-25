import { useContext, useRef, useState } from "react"
import { GlobalContext } from "../GlobalProvider"
import { Editor } from "@tinymce/tinymce-react"
import PlaceholderFields from "./PlaceholderFields"

function EmailEditor(props) {
  const [subject, setSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const {emailEditor} = useContext(GlobalContext)
  const [editor, setEditor] = emailEditor
  const [placeholderModal, setPlaceholderModal] = useState(false)
  const [toPlace, setToPlace] = useState("")
  const edito = useRef(null);

  const handleEditorChange = (e) => {
    props.setPlainEmail(e.target.getContent({format: "text"}))
    setEmailBody(e.target.getContent())
  }

  const toggleEditor = () => {
    setEditor(!editor)
  }

  const lp = () => {
    props.handleCallback(subject, emailBody)
    toggleEditor()
  }

  const toggleSubjectPlaceholderModal = () => {
    setToPlace("subject")
    setPlaceholderModal(!placeholderModal)
  }
  const togglePlaceholderModal = () => {
    setToPlace("")
    setPlaceholderModal(!placeholderModal)
  }

  return(
    <div className="editor">
      {placeholderModal ? <PlaceholderFields id={"subject"} toPlace={toPlace} togglePlaceholderModal={togglePlaceholderModal} toggleSubjectPlaceholderModal={toggleSubjectPlaceholderModal}/> : null}
      <div className="editor__modal">
        <div className="editor__modal--row-1">
          <h2 className="heading-1">Add Email</h2>
          <button onClick={toggleEditor}>&times;</button>
        </div>

        <div className="editor__modal--row-2">
          <p className="copy__para--medium">Subject</p>
          <input id="subject" className="copy__para--medium" onChange={(e) => setSubject(e.target.value)} type="text"/>
          <p className="copy__para--medium placeholder" onClick={toggleSubjectPlaceholderModal}>Add Placeholder</p>
        </div>

        <div className="editor__modal--row-3">
          <Editor
            ref={edito}
            apiKey="fnajkiw2wcz5d1lrgsif3xicw1wdvcj4f9hmzxrngbljd9b6"
            initialValue=""
            init={{
              height: 800,
              menubar: false,
              plugins: [
                'advlist underline autolink lists link image tinydrive', 
                'charmap print preview anchor help forecolor',
                'searchreplace visualblocks code emoticons link',
                'insertdatetime media table paste wordcount table fontselect'
              ],
              toolbar_mode: "wrap",
              toolbar:
                "fontselect fontsizeselect forecolor | bold italic underline | alignleft aligncenter alignright alignjustify| bullist numlist outdent indent | table link image code | emoticons | placeholderBtn",
              image_title: true,
              automatic_uploads: true,
              paste_data_images: true,
              statusbar: false,
              theme_advanced_toolbar_location: "bottom",
              setup: function(editor){
                editor.ui.registry.addButton('placeholderBtn', {
                  text: "Placeholder",
                  onAction: togglePlaceholderModal
              })
              },
            }}
            onChange={handleEditorChange}
          />
        </div>

        <div className="editor__modal--row-4">
          <button onClick={lp} className="btn">Add Email</button>
        </div>
      </div>
    </div>
  )
}

export default EmailEditor;
