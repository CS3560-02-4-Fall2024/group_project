import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import AppointmentConfirmed from './pages/appointmentConfirmed.jsx'
import DentistConfirmAcc from './pages/dentistConfirmAcc.jsx'
import DentistCreateAcc from './pages/dentistCreateAcc.jsx'
import DentistHome from './pages/dentistHome.jsx'
import DentistLogin from './pages/dentistLogin.jsx'
import DentistViewPast from './pages/dentistViewPast.jsx'
import EditPatientProfile from './pages/editPatientProfile.jsx'
import PatientCreateAcc from './pages/patientCreateAcc.jsx'
import PatientHome from './pages/patientHome.jsx'
import PatientLogin from './pages/patientLogin.jsx'
import PatientProfile from './pages/patientProfile.jsx'
import RequestAppt from './pages/requestAppt.jsx'
import WelcomePage from './pages/welcomePage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DentistLogin />
    </>
  )
}

export default App
