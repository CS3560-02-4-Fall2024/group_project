import { useState } from "react";
import Navbar from "../components/Navbar";

// mini component to generate upcoming appointments
function UpcomingAppt() {

  const [apptDate, setApptDate] = useState("12/30/24");
  const [apptTime, setApptTime] = useState("3:30 PM");
  const [patName, setPatName] = useState("Lebron Raymone James");
  const [patPhone, setPatPhone] = useState("(626) 731-3955");
  const [patEmail, setPatEmail] = useState("lbj@gmail.com");

  return (
  <div className="w-[85%] h-1/5 bg-g m-auto mb-6 rounded-lg flex flex-row">
    {/* Information */}
    <div className="w-1/2 h-[100%] rounded-lg flex flex-col justify-evenly">
      <p className="text-white font-medium text-3xl ml-3">{apptDate} {apptTime}</p>
      <p className="text-white font-normal text-2xl ml-3">{patName}</p>
      <p className="text-white font-normal text-2xl ml-3">{patPhone}</p>
      <p className="text-white font-normal text-2xl ml-3">{patEmail}</p>
    </div>

    {/* Button */}
    <button className="w-1/3 h-1/4 border-2 border-black self-center m-auto rounded-lg bg-red-900 hover:bg-red-800 text-white">Cancel Appointment</button>

  </div>)
}

// main page component
function PatientHome() {

    // useState variables to get via the db
    const [officePhone, setOfficePhone] = useState("626-731-3955");
    const [officeEmail, setOfficeEmail] = useState("ckchung@ccp.edu");
    const [officeAddr, setOfficeAddr] = useState("9501 Lemon Ave, Temple City");

    const [patName, setPatName] = useState("Lebron James");
    const [patPhone, setPatPhone] = useState("877-478-7452");
    const [patEmail, setPatEmail] = useState("kars4kids@hotmail.com");
    const [patAddy, setPatAddy] = useState("123 Sesame St., Santa Monica");
    const [patDOB, setPatDOB] = useState("12/30/1984");
    const [patIns, setPatIns] = useState("State Farm");

    const toEditProfile = () => {
      //TODO: route to EditProfile
    }

    const toPastAppt = () => {
      //TODO: route to PastAppointments
    }

    return (
      <>
          <Navbar />
          <div className='w-[100vw] h-[88vh] bg-dg grid grid-cols-2 grid-gap grid-rows-3'>
              {/* Dental Office Information */}
              <div className="flex-col justify-center items-center">
                <p className="font-semibold text-3xl text-white justify-self-start ml-16 mt-2 mb-2"><u>Dental Office Information</u></p>
                <div className="w-[87%] h-[75%] bg-g justify-self-center rounded-xl flex flex-col">
                  <p className="font-medium text-2xl text-white ml-6 mt-3 flex flex-row">Phone Number: {officePhone}</p>
                  <p className="font-medium text-2xl text-white ml-6 mt-3">Email: {officeEmail}</p>
                  <p className="font-medium text-2xl text-white ml-6 mt-3">Address: {officeAddr}</p>
                </div>
              </div>

              {/* Upcoming Appt */}
              <div className="row-span-3">
                <p className="font-semibold text-3xl text-white justify-self-start ml-16 mt-2 mb-2"><u>Upcoming Appointments</u></p>
                <UpcomingAppt />
                <UpcomingAppt />
                <UpcomingAppt />
                <UpcomingAppt />
              </div>

              {/* Patient Info */}
              <div className="row-span-2 flex-col justify-center items-center">
                <p className="font-semibold text-3xl text-white justify-self-start ml-16 mt-2 mb-2"><u>PatientInfo</u></p>
                <div className="w-[87%] h-[75%] bg-g justify-self-center rounded-xl flex flex-col" >
                  <p className="font-medium text-2xl text-white ml-6 mt-3">Full Name: {patName}</p>
                  <p className="font-medium text-2xl text-white ml-6 mt-3">Phone Number: {patPhone}</p>
                  <p className="font-medium text-2xl text-white ml-6 mt-3">Email Address: {patEmail}</p>
                  <p className="font-medium text-2xl text-white ml-6 mt-3">Address: {patAddy}</p>
                  <p className="font-medium text-2xl text-white ml-6 mt-3">Date of Birth: {patDOB}</p>
                  <p className="font-medium text-2xl text-white ml-6 mt-3">Insurance Provider: {patIns}</p>
                  <button onClick={toEditProfile} className="w-[36%] h-[12%] bg-dg hover:bg-[#587354] border-2 border-black rounded-md overflow-hidden self-center font-semibold text-3xl text-white m-auto">Edit Profile</button>
                  <button onClick={toPastAppt} className="w-[48%] h-[12%] bg-dg hover:bg-[#587354] border-2 border-black rounded-md overflow-hidden self-center font-semibold text-3xl text-white m-auto">View Past Appointments</button>
                </div>
              </div>
          </div>
      </>
    )
  }
  
  export default PatientHome;
  