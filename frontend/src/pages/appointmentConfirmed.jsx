import { useState } from "react";
import Navbar from "../components/Navbar";

function AppointmentConfirmed() {

    // placeholders for later
    const [date, setDate] = useState("06/09/24");
    const [time, setTime] = useState("11:11 AM");

    // route back home
    const goHome = () => {
      // TODO: route back to home page
    };

    return (
      <>
          <Navbar />
          <div className='w-[100vw] h-[88vh] bg-dg flex flex-col items-center'>
              {/* Main Display Card */}
              <div className="w-[32vw] h-[42vh] bg-g rounded-lg border-2 border-black mt-auto flex-col justify-center items-center ">
                <p className="text-6xl font-bold text-white justify-self-center mt-8">Your Appointment</p>
                <p className="text-6xl font-bold text-white justify-self-center">has been booked!</p>
                <p className="text-white font-semibold text-4xl justify-self-center mt-24">Appt.Time:</p>
                <p className="text-white font-semibold text-4xl justify-self-center mb-4"><em>{date}</em> at <em>{time}</em>.</p>
              </div>

              {/* Back to Home Button */}
              <button className="w-[14vw] h-[7vh] bg-g hover:bg-[#587354] rounded-md border-2 border-black mt-32 mb-24 text-2xl text-white font-semibold">Back to Home</button>
          </div>
      </>
    )
  }
  
  export default AppointmentConfirmed;
  