import App from "../App";
import Navbar from "../components/Navbar";
import { useState } from "react";


// generate each appt
function Appt() {

  const [apptDate, setApptDate] = useState("12/30/24");
  const [apptTime, setApptTime] = useState("3:30 PM");
  const [patName, setPatName] = useState("Lebron Raymone James");
  const [patPhone, setPatPhone] = useState("(626) 731-3955");
  const [patEmail, setPatEmail] = useState("lbj@gmail.com");

  const goProfile = () => {
    // TODO: route to profile
  }
  return(
    <div className="flex-flow rounded-xl mb-3 bg-g">
      <div className="pt-2 pl-3 text-white text-xl">
        <p className="font-bold">{apptDate} {apptTime}</p>
        <p>{patName}</p>
        <p>{patPhone}</p>
        <p>{patEmail}</p>
      </div> 
      <div className="flex justify-center">
        <button onClick={goProfile} className="text-white hover:text-[#587354] rounded-lg font-bold text-lg mb-3">View Profile</button>
      </div>
    </div>
  )
}


// main page component
function DentistHome() {

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
               <div className="flex">
                <div className="text-white font-bold text-4xl mt-4 mb-2 mr-48 underline">
                  Upcoming Appointments
                </div>
                <select className="rounded-md min-h-[2vh] h-[3.5vh] mr-4 self-end mb-2">
                    <option value="" disabled selected>Select a Date</option>
                    {/* need to generate the dates here based on whats possible iykwim */}
                </select>
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
  
  export default DentistHome;
  