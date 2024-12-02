import App from "../App";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


// generate each appt
function Appt(props) {

  const obj = props.obj;

  const [patName, setPatName] = useState("");

  useEffect(() => {
    const url = "http://localhost:3000/dentist/getPatientById?id=" + obj.patientId;
    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("authToken")
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      setPatName(res.name);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const navigate = useNavigate();

  const goProfile = () => {
    sessionStorage.setItem("buttocks", obj.patientId);
    navigate("/patientProfile");
  }

  return(
    <div className="flex-flow rounded-xl mb-3 bg-g">
      <div className="pt-2 pl-3 text-white text-xl">
        <p className="font-bold">Date: {obj.date} &emsp; Time: {obj.time.substring(0,5)}</p>
        <p>Patient: {patName}</p>
        <p>Reason: {obj.purpose}</p>
      </div> 
      <div className="flex justify-center">
        <button onClick={goProfile} className="text-white hover:text-[#587354] rounded-lg font-bold text-lg mb-3">View Profile</button>
      </div>
    </div>
  )
}


// main page component
function DentistHome() {
    const [dentistName, setDentistName] = useState("");
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
      console.log("AHOIFAHIOSFHSAIOFH A " + appointments.length)
      const url = "http://localhost:3000/dentist/?id=" + sessionStorage.getItem("id");
      fetch(url, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem("authToken")
        }
      }).then((res) => {
        return res.json();
      }).then((res) => {
        console.log(res);
        setDentistName(res.name);
      }).catch((err) => {
        console.log(err);
      })

      const url2 = "http://localhost:3000/dentist/getDone?id=" + sessionStorage.getItem("id");
      fetch(url2, {
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
      })
    }, []);

    useEffect(() => {
      console.log(appointments)
      const fuckboi = document.getElementById("FUUUCK");
      
    }, [appointments]);

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
                <div className="text-white font-bold text-4xl mt-4 mb-2 mr-52 underline">
                  Upcoming Appointments
                </div>
                {/* <select className="rounded-md min-h-[2vh] h-[3.5vh] mr-4 self-end mb-2">
                    <option value="" disabled selected>Select a Date</option>
                </select> */}
              </div>
              
              <div id="FUUUCK" className="h-4/5 overflow-y-scroll">
                  {appointments.map((obj) => (
                    <Appt obj={obj}></Appt>
                  ))}
              </div>
            </div>
          </div>
        </div>
          
      </>
    )
  }
  
  export default DentistHome;
  