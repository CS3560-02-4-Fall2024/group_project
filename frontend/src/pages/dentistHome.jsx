import Navbar from "../components/Navbar";
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

function DentistHome() {

    const goHome = () => {
      // TODO: route to home
    }

    return (
      <>
          <Navbar />
          {/* Middle Container */}
          <div className='w-[100vw] h-[88vh] bg-dg flex flex-col items-center p-6'>
              <div className="w-[38vw] h-[90%] border-2 border-black flex flex-col overflow-scroll mb-4">
                <p className="text-white font-bold text-4xl"><u>Past Appointments</u></p>
                <Appt />
                <Appt />
                <Appt />
                <Appt />
                <Appt />
                <Appt />
              </div>  
              <button onClick={goHome} className="m-auto w-[20vh] h-[6vh] bg-g hover:bg-[#587354] border-2 border-black rounded-lg">Back to Home</button>
          </div>
      </>
    )
  }
  
  export default DentistHome;
  