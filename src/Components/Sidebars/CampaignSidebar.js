import {NavLink} from "react-router-dom"

function CampaignsSidebar(){
  return(
    <div className="campaigns-sidebar">
      <div className="campaigns-sidebar__container">
        <div className="campaigns-sidebar__container--sidebar">
          <ul className="campaigns-sidebar__container--sidebar__links">
            <NavLink to="/campaigns/home" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><li className="heading-4 campaigns-sidebar__container--sidebar__links--link"><i className="fas fa-user"></i><p>Campaigns</p></li></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CampaignsSidebar
