import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getUser, isSignedIn } from "../services/auth";
import { getAppointments } from "../services/appointments";
import { getDentist } from "../services/dentist";

// mini component to generate upcoming appointments

function UpcomingAppt() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  // get appointments
  useEffect(() => {
    getAppointments('patient')
    .then((value) => {
      setAppointments(value);
    })
  }, [])

  function Appointment({ timeSlot, dentistId, purpose, id }) {
    const date = new Date(timeSlot);
    const [dentist, setDentist] = useState();

    useEffect(()=> {
      getDentist(dentistId)
      .then((value) => setDentist(value))
      .catch((err) => console.log(err));
    },[])
    
    const cancelAppt = () => {
      console.log('trying to cancel appt');
    };

    return (
      <div className="flex-flow rounded-xl mb-3 bg-g w-[100%] twelve:w-[80%]">
        <div className="pt-2 pl-3 text-white text-[.99vw]">
          <p className="font-bold">{date.toString()}</p>
          <p><b>Dentist: </b>{dentist && dentist.name}</p>
          <p>{purpose}</p>
        </div>
        <div className="flex justify-center">
          <button onClick={cancelAppt} className="text-white hover:text-[#587354] rounded-lg font-bold text-[.92vw] mb-3">Cancel Appointment</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center w-[50vw] h-[100%] bg-dg p-0">
      <div className="flex-flow">
        <div className="ml-16 flex text-white font-bold text-[1.70vw] mt-4 mb-2 mr-0 underline">
          Upcoming Appointments
        </div>
        <div className="ml-16 w-[38vw] h-[60vh] overflow-y-scroll">
          {appointments.map((elem) => {
            return (<Appointment timeSlot={elem.timeSlot} dentistId={elem.dentistId} purpose={elem.purpose} id={elem.id} key={elem.id} />)
          })}
        </div>
        <div className='flex justify-center text-white mt-10 mr-0 w-[41.3vw]'>
          <button onClick={() => navigate("/reqAppt")} className="ml-16 py-3 px-5 bg-g rounded-xl hover:bg-[#587354] font-bold text-[1.5vw]">Request Appointment</button>
        </div>
      </div>

    </div>


  )
}

function PatientInfo() {

  const user = getUser();

  const navigate = useNavigate();

  const toEditProfile = () => {
    navigate("/editProfile");
  };

  const toPastAppt = () => {
    navigate("/pastAppt");
  };

  return (
    <div className="flex-flow items-center justify-center w-[50vw] ">
      <div className="ml-16 flex text-white font-bold text-[1.75vw] mt-4 mb-2 underline">
        Patient Information
      </div>
      <div className="ml-16 flex-flow bg-g rounded-xl">
        <div className="p-5 text-[1.19vw] text-white">
          <p><b>Full Name: </b>{user.name}</p>
          <p><b>Phone Number: </b>{user.phone}</p>
          <p><b>Email Address: </b>{user.email}</p>
          <p><b>Address: </b>{user.address}</p>
          <p><b>Date of Birth: </b>{user.dateOfBirth.slice(0, 10)}</p>
          <p><b>Inurance Provider: </b>{user.insuranceCompany}</p>
        </div>
        <div className="flex justify-center">
          <button onClick={toEditProfile} className="hover:bg-[#587354] bg-dg px-3 py-3 font-bold text-white text-[.96vw] rounded-xl">Edit Profile</button>
        </div>
        <div className="flex justify-center">
          <button onClick={toPastAppt} className="hover:bg-[#587354] bg-dg px-3 py-3 font-bold text-white text-[.96vw] rounded-xl mt-5 mb-5">View Past Appointments</button>
        </div>
      </div>
    </div>
  )
}

// main page component
function PatientHome() {

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-dg">
        <Navbar />
        <div className='w-[100vw] h-[88vh] flex justify-items'>
          <div className="flex flex-col">
            <PatientInfo />
          </div>
          <div>
            <UpcomingAppt />
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientHome;
