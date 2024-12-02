import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// generate each appt
function Appt(props) {

  const obj = props.obj;

  const [apptDate, setApptDate] = useState("12/30/24");
  const [apptTime, setApptTime] = useState("3:30 PM");
  const [pastInfo, setPastInfo] = useState("Root Canal or like cavities filling or some");

  // useEffect to get an array of dentist past appts 
  const query = {
    'id': '' // dentistId
  }
  const returnJSON = [
    { 'apptId': '', 'date': '', 'time': '', 'purpose': '' }
  ]

  return(
    <div className="flex-flow rounded-xl mb-3 bg-g">
      <div className="pt-2 pl-3 pb-2 text-white text-xl">
        <p className="font-bold">Date: {obj.date} &emsp; Time: {obj.time}</p>
        <p>{obj.purpose}</p>
      </div> 
    </div>
  )
}

// main page component
function DentistViewPast() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  const goHome = () => {
    navigate("/dentistHome");
  };

  useEffect(() => {
    const url = "http://localhost:3000/dentist/getBofa?patientId=" + sessionStorage.getItem("buttocks") + "&dentistId=" + sessionStorage.getItem("id");
    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("authToken")
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      for (let i = 0; i < res.length; i++) {
        setAppointments(prev => {
          if (prev.length < res.length) {
            return [...prev, res[i]];
          } else {
            return prev;
          }
        })
      }
    }).catch((err) => {
      console.log(err);
    });
  }, [])

  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-dg">
        <Navbar />
        {/* Middle Container */}
        <div className='w-[100vw] h-[88vh] flex justify-center'>
          <div className="flex-flow">
            <div className="text-white font-bold text-4xl mt-4 mb-2 mr-48">
              Past Appointment
            </div>
            <div className="h-3/4 overflow-y-scroll">
              {appointments.map((obj) => (
                    <Appt obj={obj}></Appt>
              ))}
            </div>
            <div className="flex justify-center">
              <button onClick={goHome} className="bg-g hover:bg-[#587354] rounded-lg p-3 px-10 font-bold text-xl text-white mt-5">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default DentistViewPast
  