import './index.css'
import DentistConfirmAcc from './pages/dentistConfirmAcc.jsx'
import DentistCreateAcc from './pages/dentistCreateAcc.jsx'
import DentistHome from './pages/dentistHome.jsx'
import DentistLogin from './pages/dentistLogin.jsx'
import DentistViewPast from './pages/dentistViewPast.jsx'
import EditPatientProfile from './pages/editPatientProfile.jsx'
import PastAppointments from './pages/pastAppointments.jsx'
import PatientCreateAcc from './pages/patientCreateAcc.jsx'
import PatientHome from './pages/patientHome.jsx'
import PatientLogin from './pages/patientLogin.jsx'
import PatientProfile from './pages/patientProfile.jsx'
import RequestAppt from './pages/requestAppt.jsx'
import WelcomePage from './pages/welcomePage.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage/>} />
          <Route path='/reqAppt' element={<RequestAppt/>} />
          <Route path='/patientProfile' element={<PatientProfile/>} />
          <Route path='/patientLogin' element={<PatientLogin/>} />
          <Route path='/patientHome' element={<PatientHome/>} />
          <Route path='/createAcc' element={<PatientCreateAcc/>} />
          <Route path='/editProfile' element={<EditPatientProfile/>} />
          <Route path='/dentistPast' element={<DentistViewPast/>} />
          <Route path='/dentistLogin' element={<DentistLogin/>} />
          <Route path='/dentistHome' element={<DentistHome/>} />
          <Route path='/dentistCreateAcc' element={<DentistCreateAcc/>} />
          <Route path='/dentistConfirm' element={<DentistConfirmAcc/>} />
          <Route path='/pastAppt' element={<PastAppointments/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
