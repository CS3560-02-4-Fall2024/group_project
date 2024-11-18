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
        {/*Background*/}
        <div class="w-[100vw] h-[88vh] bg-dg flex items-center justify-center">
          {/*Light Green Block*/}
          <div class="bg-g rounded-3xl flex-flow justify-center items-center py-10 px-20">
            <div>
              {/*Title Text*/}
              <div class="text-center text-white text-4xl font-bold">
                <p>Your Appointment</p>
                <p>has been Booked!</p>
              </div>
              {/*More Text*/}
              <div class="text-center text-white text-4xl font-bold mt-10">
                <p>Appointment Time:</p>
                {/*Dentist ID Variable*/}
                <p class="underline">{date} at {time}</p>
              </div>
              {/*Go back to login button*/}
              <div class="flex items-center justify-center mt-10">
                  <button onClick={goHome} class="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                    Return Home
                  </button>
                </div>
            </div>
          </div>
        </div>

      </>
    )
  }
  
  export default AppointmentConfirmed;
  