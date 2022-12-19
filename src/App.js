
import Login from './pages/Login';
import Admin from './pages/Admin';
import Engineer from './pages/Engineer';
import Customer from './pages/Customer';
import Notfound404 from './components/Notfound404';
import Unauthorised403 from "./components/Unauthorised403"
import RequireAuth from './components/RequireAuth';
import { USER_ROLES } from './constants/userRoles';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-circular-progressbar/dist/styles.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import '@coreui/coreui/dist/js/coreui.min.js';
import './App.css';







function App() {


  return (

      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />

            <Route element={<RequireAuth allowedRoles={[USER_ROLES.ADMIN]} />} >
              <Route path="/admin" element={<Admin />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[USER_ROLES.ENGINEER, USER_ROLES.ADMIN]} />} >
              <Route path="/engineer" element={<Engineer />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[USER_ROLES.CUSTOMER, USER_ROLES.ADMIN]} />} >
              <Route path="/customer" element={<Customer />} />
            </Route>

            <Route path="/unauthorised" element={<Unauthorised403 />} />
            <Route path='*' element={<Notfound404 />} />
          </Routes>
        </div>
      </BrowserRouter>


  );
}

export default App;
