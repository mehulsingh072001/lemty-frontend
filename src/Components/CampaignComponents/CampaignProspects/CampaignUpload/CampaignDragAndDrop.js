import { FileUploader } from "react-drag-drop-files"

const fileTypes = ["CSV"]
const DragAndDrop = (props) =>{
  return(
    <FileUploader handleChange={props.handleFileUpload} name="file" types={fileTypes} />
  )
}

export default DragAndDrop
