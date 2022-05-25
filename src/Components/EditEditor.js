import { useState } from "react"
import { Editor } from "@tinymce/tinymce-react"

function EditEditor(props) {
  const [subject, setSubject] = useState(props.steps[props.currentIndex].mails[props.mailIndex]['subject'])
  const [emailBody, setEmailBody] = useState("")

  const handleEditorChange = (e) => {
    props.setPlainEmail(e.target.getContent({format: "text"}))
    setEmailBody(e.target.getContent())
    // console.log(e.target.getContent())
  }

  const toggleEditor = () => {
    props.setEditEditor(false)
  }

  const lp = () => {
    props.handleCallback(subject, emailBody)
    toggleEditor()
  }


  return(
    <div className="editor">
      <div className="editor__modal">
        <div className="editor__modal--row-1">
          <h2 className="heading-1">Add Email</h2>
          <button onClick={toggleEditor}>&times;</button>
        </div>

        <div className="editor__modal--row-2">
          <p className="copy__para--medium">Subject</p>
          <input className="copy__para--medium" defaultValue={props.steps[props.currentIndex].mails[props.mailIndex]['subject']} onChange={(e) => setSubject(e.target.value)} type="text"/>
          <p className="copy__para--medium placeholder">Add Placeholder</p>
        </div>

        <div className="editor__modal--row-3">
          <Editor
            apiKey="fnajkiw2wcz5d1lrgsif3xicw1wdvcj4f9hmzxrngbljd9b6"
            initialValue={props.steps[props.currentIndex].mails[props.mailIndex]['body']}
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
            }}
            onChange={(e) => handleEditorChange(e)}
          />
        </div>

        <div className="editor__modal--row-4">
          <button onClick={lp} className="btn">Add Email</button>
        </div>
      </div>
    </div>
  )
}

export default EditEditor;
