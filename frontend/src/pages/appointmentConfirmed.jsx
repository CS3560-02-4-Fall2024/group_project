import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AppointmentConfirmed() {

    // placeholders for later
    const [date, setDate] = useState("06/09/24");
    const [time, setTime] = useState("11:11 AM");

    const navigate = useNavigate();

    // make a useEffect to get the appt that was just created
    // query the latest created appt by this id
    const query = {
      'id': '' // patientId, use this to find latest created appt (imo?)
    }
    // return
    const returnJSON = {
      'id': '', // appt id
      'date': '',
      'time': ''
    }

    // route back home
    const goHome = () => {
      navigate("/home");
    };

    return (
      <>
        <Navbar />
        {/*Background*/}
        <div className="w-[100vw] h-[88vh] bg-dg flex items-center justify-center">
          {/*Light Green Block*/}
          <div className="bg-g rounded-3xl flex-flow justify-center items-center py-10 px-20">
            <div>
              {/*Title Text*/}
              <div className="text-center text-white text-4xl font-bold">
                <p>Your Appointment</p>
                <p>has been Booked!</p>
              </div>
              {/*More Text*/}
              <div className="text-center text-white text-4xl font-bold mt-10">
                <p>Appointment Time:</p>
                {/*Dentist ID Variable*/}
                <p className="underline">{date} at {time}</p>
              </div>
              {/*Go back to login button*/}
              <div className="flex items-center justify-center mt-10">
                  <button onClick={goHome} className="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
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
  