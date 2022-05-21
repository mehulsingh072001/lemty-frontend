import {NavLink} from "react-router-dom"
import logo from "../../logo.png"

function AppSidebar() {
  return (
    <div className="app-sidebar">
      <img className="app-sidebar__logo" src={logo} alt="" />

      <ul className="app-sidebar__links">
        <li className="app-sidebar__links--link"><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><i className="fas fa-home"></i></NavLink></li>
        <li className="app-sidebar__links--link"><NavLink to="/prospects" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><i className="fas fa-user"></i></NavLink></li>
        <li className="app-sidebar__links--link"><NavLink to="/campaigns" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><i className="fas fa-paper-plane"></i></NavLink></li>
        <li className="app-sidebar__links--link"><NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : 'inactive')}><i className="fas fa-cog"></i></NavLink></li>
      </ul>
    </div>
  )
}

export default AppSidebar;
