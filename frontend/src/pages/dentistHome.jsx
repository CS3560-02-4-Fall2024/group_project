import App from "../App";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// generate each appt
function Appt() {

  const [apptDate, setApptDate] = useState("12/30/24");
  const [apptTime, setApptTime] = useState("3:30 PM");
  const [patName, setPatName] = useState("Lebron Raymone James");
  const [patPhone, setPatPhone] = useState("(626) 731-3955");
  const [patEmail, setPatEmail] = useState("lbj@gmail.com");

  const navigate = useNavigate();

  const goProfile = () => {
    navigate("/profile")
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
    const [dentistName, setDentistName] = useState("urmom");

    // query using dentist id
    const query = {
      'id': '' // dentist id
    }

    // needs to receive JSON = { 'name' : bob } and 
    const returnJSON1 = {
      'name': ''
    }
    // an array of all of this dentists' appts 
    const returnApptsJSON = [{
    'date': '', 
    'time': '', 
    'patientName': '', 
    'patientPhone': '', 
    'patientEmail': ''}, 
    {}, {}]

    // TODO: make a useEffect to get that info on first render and loop through array of appts to render each one with the info

    return (
      <>
        <div className="w-[100vw] h-[100vh] bg-dg">
          <Navbar />
          <div className="text-left pl-5 pt-5 text-white text-7xl font-bold">
            Welcome Dr. {dentistName}!
          </div>
          {/* Middle Container */}
          <div className='w-[100vw] h-[80vh] flex justify-center'>
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
              
              <div className="h-4/5 overflow-y-scroll">
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
            </div>
          </div>
        </div>
          
      </>
    )
  }
  
  export default DentistHome;
  