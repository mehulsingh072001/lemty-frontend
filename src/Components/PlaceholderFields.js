import { useState } from "react";

const PlaceholderFields = ({id, toPlace, togglePlaceholderModal, toggleSubjectPlaceholderModal}) => {
  const [selectedField, setSelectedField] = useState("")

  const addValue = (value) => {
    let textToInsert = ` {{${value}}}`
    if(toPlace === "subject"){
      const el = document.getElementById(id);
      let cursorPosition = el.selectionStart
      let textBeforeCursorPosition = el.value.substring(0, cursorPosition)
      let textAfterCursorPosition = el.value.substring(cursorPosition, el.value.length)
      el.value = textBeforeCursorPosition + textToInsert + textAfterCursorPosition
      toggleSubjectPlaceholderModal()
    }
    else{
      window.tinymce.activeEditor.execCommand("mceInsertContent", false, textToInsert)
      togglePlaceholderModal()
    }

  }

  return(
    <div className="placeholder-fields">
      <div className="placeholder-fields__modal">
        <h1 className="placeholder-fields__modal--heading heading-1">Insert Fields</h1>
        <div className="placeholder-fields__modal--nav">
          <ul>
            <li className="active heading-4">Prospects</li>
            <li className="heading-4">Users</li>
          </ul>
        </div>

        <input type="search" placeholder="Search" className="placeholder-fields__modal--search"/>
        <div className="placeholder-fields__modal--fields">
          <div onClick={() => setSelectedField("fullName")} className={`placeholder-fields__modal--fields--field fullName ${selectedField === "fullName" ? "selected" : ""}`}><p>FullName</p></div>
          <div onClick={() => setSelectedField("firstName")} className={`placeholder-fields__modal--fields--field firstName ${selectedField === "firstName" ? "selected" : ""}`}><p>FirstName</p></div>
          <div onClick={() => setSelectedField("lastName")} className={`placeholder-fields__modal--fields--field lastName ${selectedField === "lastName" ? "selected" : ""}`}><p>LastName</p></div>
          <div onClick={() => setSelectedField("email")} className={`placeholder-fields__modal--fields--field email ${selectedField === "email" ? "selected" : ""}`}><p>Email</p></div>
          <div onClick={() => setSelectedField("company")} className={`placeholder-fields__modal--fields--field company ${selectedField === "company" ? "selected" : ""}`}><p>Company</p></div>
          <div onClick={() => setSelectedField("account")} className={`placeholder-fields__modal--fields--field account ${selectedField === "account" ? "selected" : ""}`}><p>Account</p></div>
          <div onClick={() => setSelectedField("title")} className={`placeholder-fields__modal--fields--field title ${selectedField === "title" ? "selected" : ""}`}><p>Title</p></div>
          <div onClick={() => setSelectedField("department")} className={`placeholder-fields__modal--fields--field department ${selectedField === "department" ? "selected" : ""}`}><p>Department</p></div>
          <div onClick={() => setSelectedField("phone")} className={`placeholder-fields__modal--fields--field phone ${selectedField === "phone" ? "selected" : ""}`}><p>Phone</p></div>
          <div onClick={() => setSelectedField("companyEmail")} className={`placeholder-fields__modal--fields--field companyEmail ${selectedField === "companyEmail" ? "selected" : ""}`}><p>Company Email</p></div>
          <div onClick={() => setSelectedField("companyPhone")} className={`placeholder-fields__modal--fields--field companyPhone ${selectedField === "companyPhone" ? "selected" : ""}`}><p>Company Phone</p></div>
          <div onClick={() => setSelectedField("companyDomain")} className={`placeholder-fields__modal--fields--field companyDomain ${selectedField === "companyDomain" ? "selected" : ""}`}><p>Company Domain</p></div>
          <div onClick={() => setSelectedField("linkedinUrl")} className={`placeholder-fields__modal--fields--field linkedinUrl ${selectedField === "linkedinUrl" ? "selected" : ""}`}><p>LinkedinURL</p></div>
          <div onClick={() => setSelectedField("twitterId")} className={`placeholder-fields__modal--fields--field twitterId ${selectedField === "twitterId" ? "selected" : ""}`}><p>TwitterId</p></div>
          <div onClick={() => setSelectedField("city")} className={`placeholder-fields__modal--fields--field city ${selectedField === "city" ? "selected" : ""}`}><p>City</p></div>
          <div onClick={() => setSelectedField("location")} className={`placeholder-fields__modal--fields--field location ${selectedField === "location" ? "selected" : ""}`}><p>Location</p></div>
          <div onClick={() => setSelectedField("country")} className={`placeholder-fields__modal--fields--field country ${selectedField === "country" ? "selected" : ""}`}><p>Country</p></div>
        </div>

        <div className="placeholder-fields__modal--actions">
          <button className="btn-sec" onClick={() => togglePlaceholderModal()}>Cancel</button>
          <button className="btn" onClick={() => addValue(selectedField)}>Insert</button>
        </div>
      </div>
    </div>
  )
}
export default PlaceholderFields
