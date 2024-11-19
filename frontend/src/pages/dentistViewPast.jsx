import Navbar from "../components/Navbar"
import { useState } from "react";

// generate each appt
function Appt() {

  const [apptDate, setApptDate] = useState("12/30/24");
  const [apptTime, setApptTime] = useState("3:30 PM");
  const [patName, setPatName] = useState("Lebron Raymone James");
  const [patPhone, setPatPhone] = useState("(626) 731-3955");
  const [patEmail, setPatEmail] = useState("lbj@gmail.com");

  return(
    <div className="flex-flow rounded-xl mb-3 bg-g">
      <div className="pt-2 pl-3 pb-2 text-white text-xl">
        <p className="font-bold">{apptDate} {apptTime}</p>
        <p>{patName}</p>
        <p>{patPhone}</p>
        <p>{patEmail}</p>
      </div> 
    </div>
  )
}

// main page component
function DentistViewPast() {

  const goHome = () => {
    // TODO: route to home
  }

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-dg">
        <Navbar />
        {/* Middle Container */}
        <div className='w-[100vw] h-[88vh] flex justify-center'>
          <div className="flex-flow">
            <div className="text-white font-bold text-4xl mt-4 mb-2 mr-48">
              Past Appointment
            </div>
            <div class="h-3/4 overflow-y-scroll">
              <Appt />
              <Appt />
              <Appt />
              <Appt />
              <Appt />
              <Appt />
              <Appt />
              <Appt />
              <Appt />
              <Appt />
              <Appt />
            </div>
            <div className="flex justify-center">
              <button onClick={goHome} className="bg-g hover:bg-[#587354] rounded-lg p-3 px-10 font-bold text-xl text-white mt-5">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default DentistViewPast
  