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
    <div className="w-[96%] h-[16vh] min-h-[16vh] border-2 border-black rounded-lg mx-auto mt-6 bg-g">
      <div className="w-1/2 h-[100%] rounded-lg flex flex-col justify-evenly">
        <p className="text-white font-medium text-3xl ml-3">{apptDate} {apptTime}</p>
        <p className="text-white font-normal text-2xl ml-3">{patName}</p>
        <p className="text-white font-normal text-2xl ml-3">{patPhone}</p>
        <p className="text-white font-normal text-2xl ml-3">{patEmail}</p>
      </div>
    </div>
  )
}

// main page component
function PastAppointments() {

    const goHome = () => {
      // TODO: route to home
    }

    return (
      <>
          <Navbar />

          {/* Middle Container */}
          <div className='w-[100vw] h-[88vh] bg-dg flex justify-center'>
            <div class="w-1/3 flex-flow justify-center">
              <p className="text-white font-bold text-4xl"><u>Past Appointments</u></p>
              <div className="flex overflow-y-scroll">
                <div class="flex-flow bg-g round-xl py-2 px-3 mt-2 rounded-xl">
                  <div className="text-xl text-white ">
                    <p class="font-bold"> jade </p>
                    <p> jade </p>
                    <p> jade </p>
                  </div>
                  <div className="flex items-center">
                    <button class="bg-dg text-white font-bold px-4 py-2 rounded-xl">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button onClick={goHome} className="bg-g hover:bg-[#587354] rounded-lg p-3 px-10 font-bold text-xl text-white">Back to Home</button>
              </div>
            </div>
            
          </div>
      </>
    )
  }
  
  export default PastAppointments
  