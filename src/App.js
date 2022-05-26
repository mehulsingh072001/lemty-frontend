import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './ProtectedRoutes';
import Campaigns from './Pages/Campaign/Campaigns';
import CampaignsHome from './Pages/Campaign/CampaignHome';
import Create from './Pages/Campaign/Create';
import {GlobalProvider} from './GlobalProvider';
import Prospects from './Pages/Prospects/Prospects';
import ProspectsHome from './Pages/Prospects/ProspectsHome';
import Settings from './Pages/Settings/Settings';
import EmailSettings from './Pages/Settings/EmailSettings';
import ProspectSettings from './Pages/Settings/ProspectSettings';
import UserSettings from './Pages/Settings/UserSettings';
import DeliveribilitySettings from './Pages/Settings/DeliveribilitySettings';
import SingleCampaignSteps from './Pages/Campaign/Single/SingleCampaignSteps';
import SingleCampaignProspects from './Pages/Campaign/Single/SingleCampaignProspects';
import SingleCampaignInbox from './Pages/Campaign/Single/SingleCampaignInbox';
import SingleCampaignEmails from "./Pages/Campaign/Single/SingleCampaignEmails";
import SingleCampaignReports from "./Pages/Campaign/Single/SingleCampaignReports"
import SingleCampaignSettings from "./Pages/Campaign/Single/SingleCampaignSettings"
import Redirect from './Pages/Redirect';


function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
          <Route exact path="/redirect" element={<Redirect/>}/>

          <Route  path="prospects/" element={<ProtectedRoute><Prospects/></ProtectedRoute>}>
            <Route path="home/"  element={<ProspectsHome/>}/>
            {/* <Route path="lists" element={<ProspectLists/>}/> */}
            {/* <Route path="history" element={<History/>}/> */}
          </Route>


          <Route  path="campaigns/" element={<ProtectedRoute><Campaigns/></ProtectedRoute>}>
            <Route path="home/"  element={<CampaignsHome/>}/>
            <Route path="create/" element={<Create/>}/>
          </Route>

            <Route path="campaigns/:id">
              <Route path="step" element={<SingleCampaignSteps/>}/>
              <Route path="prospects" element={<SingleCampaignProspects/>}/>
              <Route path="inbox" element={<SingleCampaignInbox/>}/>
              <Route path="emails" element={<SingleCampaignEmails/>}/>
              <Route path="reports" element={<SingleCampaignReports/>}/>
              <Route path="settings" element={<SingleCampaignSettings/>}/>
            </Route>


          <Route path='settings/' element={<ProtectedRoute><Settings/></ProtectedRoute>}/>

          <Route path="settings/email/"  element={<ProtectedRoute><EmailSettings/></ProtectedRoute>}/>
          <Route path="settings/prospect/"  element={<ProtectedRoute><ProspectSettings/></ProtectedRoute>}/>
          <Route path="settings/user/"  element={<ProtectedRoute><UserSettings/></ProtectedRoute>}/>
          <Route path="settings/deliveribility/"  element={<ProtectedRoute><DeliveribilitySettings/></ProtectedRoute>}/>
        </Routes>

      </div>
    </GlobalProvider>
  );
}

export default App;
