import BasicFields from "./BasicFields"
import AdditionalFields from "./AdditionalFields"
import { useState } from "react"

const SingleProspect = ({prospect, toggleProspectView}) => {
  const [selectedFields, setSelectedFields] = useState("basic")
  return(
    <div className="single-prospect">
      <div className="single-prospect__modal">
        <section className="single-prospect__modal--topbar">
          <h1 className="heading-1">Prospect Details</h1>
          <h1 className="heading-1 close" onClick={() => toggleProspectView()}>&times;</h1>
        </section>

        <section className="single-prospect__modal--container">
          <div className="single-prospect__modal--container--fields">
            <div className="single-prospect__modal--container--fields--topbar">
              <div className="container">
                <div className="badge">F</div>
                <h1 className="heading-1">Prospect Name</h1>
                <div className="metadata">
                  <button className={prospect.prospectEmail !== null ? "col-data btn-contact" : "col-data btn-contact--disabled"}>
                    <i className="fas fa-envelope"></i>
                  </button>
                  <button className={prospect.prospectLinkedinUrl !== null ? "col-data btn-contact" : "col-data btn-contact--disabled"}>
                      <i className="fab fa-linkedin"></i>
                  </button>
                  <button className={prospect.prospectTwitterUrl !== null ? "col-data btn-contact" : "col-data btn-contact--disabled"}>
                    <i className="fab fa-twitter"></i>
                  </button>

                  {/* <button className="metadata__link"><i className="fas fa-link"></i></button> */}
                  <button className="metadata__status">Bounced</button>
                </div>
                <div className="metadata-actions">
                  <button className="metadata-actions--email"><i className="fas fa-envelope"></i></button>
                  <button className="metadata-actions--campaign"><i className="fab fa-paper-plane"></i></button>
                  <button className="metadata-actions--options"><i className="fas fa-ellipsis-v"></i></button>
                </div>
              </div>
              <div className="nav">
                <ul>
                  <li className={selectedFields === "basic" ? "active" : ""} onClick={() => setSelectedFields("basic")}>Basic</li>
                  <li className={selectedFields === "additional" ? "active" : ""} onClick={() => setSelectedFields("additional")}>Additional</li>
                </ul>
              </div>
            </div>

            <div className="single-prospect__modal--container--fields--items">
              {
                selectedFields === "basic" ? <BasicFields prospect={prospect}/> : null
              }
              {
                selectedFields === "additional" ? <AdditionalFields prospect={prospect}/> : null
              }
            </div>
          </div>
          <div className="single-prospect__modal--container--history">
            <div className="single-prospect__modal--container--history--topbar">
              <h1>Activity History</h1>
            </div>
          </div>
        </section>

        <section className="single-prospect__modal--bottombar">
          <button className="btn-sec">Cancel</button>
          <button className="btn">Save</button>
        </section>
      </div>
    </div>
  )
}

export default SingleProspect
