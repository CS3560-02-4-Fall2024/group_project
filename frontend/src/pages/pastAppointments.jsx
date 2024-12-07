import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAppointments } from "../services/appointments";
import Appointment from "../components/Appointment";

// main page component
function PastAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAppointments('patient')
      .then((value) => {
        setAppointments(value);
      })
  }, [])

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-dg">
        <Navbar />
        {/* Middle Container */}
        <div className='w-[100vw] h-[88vh] flex justify-center'>
          <div className="flex-flow">
            <div className="text-white font-bold text-4xl mt-4 mb-2 mr-48 underline">
              Past Appointment
            </div>
            <div className="h-3/4 overflow-y-scroll">
              {appointments
                .filter((elem) => new Date(elem.timeSlot) < Date.now())
                .sort((a, b) => new Date(a.timeSlot) - new Date(b.timeSlot))
                .map((elem) => {
                  return (<Appointment timeSlot={elem.timeSlot} dentistId={elem.dentistId} purpose={elem.purpose} id={elem.id} key={elem.id} />)
                })}
            </div>
            <div className="flex justify-center">
              <button onClick={() => navigate('/patientHome')} className="bg-g hover:bg-[#587354] rounded-lg p-3 px-10 font-bold text-xl text-white mt-5">Back to Home</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default PastAppointments
