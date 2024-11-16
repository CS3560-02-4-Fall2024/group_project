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
    <div className="w-[96%] h-[16vh] min-h-[16vh] border-2 border-black rounded-lg mx-auto mt-6 bg-g flex flex-row">
      <div className="w-1/2 h-[100%] rounded-lg flex flex-col justify-evenly">
        <p className="text-white font-medium text-3xl ml-3">{apptDate} {apptTime}</p>
        <p className="text-white font-normal text-2xl ml-3">{patName}</p>
        <p className="text-white font-normal text-2xl ml-3">{patPhone}</p>
        <p className="text-white font-normal text-2xl ml-3">{patEmail}</p>
      </div>
      {/* Button */}
      <button className="w-1/3 h-1/4 border-2 border-black self-center m-auto rounded-lg bg-dg hover:bg-[#587354] text-white">View Profile</button>
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
          <Navbar />
          {/* Middle Container */}
          <div className='w-[100vw] h-[88vh] bg-dg flex flex-col items-center p-6'>
              <div className="w-[38vw] h-[90%] flex flex-col overflow-scroll mb-4">
                <div className="w-[100%] h-[16%] flex flex-row justify-between">
                  <p className="text-white font-bold text-4xl justify-self-start ml-4"><u>Upcoming Appointments</u></p>
                  <select className="rounded-md min-h-[2vh] h-[3.5vh] mr-4 self-center">
                    <option value="" disabled selected>Select a Date</option>
                    {/* need to generate the dates here based on whats possible iykwim */}
                  </select>
                </div>
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
  