import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

// mini component to generate upcoming appointments
function Appointment({date, time, dentistName}) {

  
  const navigate = useNavigate();

  const cancelAppt = () => {
    console.log("kys")
    //do something about cancelling
  };

  return (
    <div className="flex-flow rounded-xl mb-3 bg-g w-[100%] twelve:w-[80%]">
      <div className="pt-2 pl-3 text-white text-[.99vw]">
        <p className="font-bold">{date} {time}</p>
        <p><b>Dentist: </b>{dentistName}</p>
      </div> 
      <div className="flex justify-center">
        <button onClick={cancelAppt} className="text-white hover:text-[#587354] rounded-lg font-bold text-[.92vw] mb-3">Cancel Appointment</button>
      </div>
    </div>
  )
}

function UpcomingAppt() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    let url = 'http://localhost:3000/availability/patients';
    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("authToken")
      }
    })
    .then((res) => res.json())
    .then((res) => {
      console.log('appointments', res);
      setAppointments(res);
    })
  },[])
  // GET FROM DB
  const apptArray = [{
    'date': '',
    'time': '',
    'name': '',
    'phone': '',
    'email': ''
  }]

  const reqAppt = () => {
    navigate("/reqAppt");
  };

  return (
    <div className="flex justify-center w-[50vw] h-[100%] bg-dg p-0">
      <div className="flex-flow">
        <div className="ml-16 flex text-white font-bold text-[1.70vw] mt-4 mb-2 mr-0 underline">
          Upcoming Appointments
        </div>
        <div className="ml-16 w-[38vw] h-[60vh] overflow-y-scroll">
          <Appointment date={"2024-12-6"} time={"9:30 AM"} dentistName={"lebron"} />
        </div>
        <div className='flex justify-center text-white mt-10 mr-0 w-[41.3vw]'>
          <button onClick={reqAppt} className="ml-16 py-3 px-5 bg-g rounded-xl hover:bg-[#587354] font-bold text-[1.5vw]">Request Appointment</button>
        </div>
      </div>
      
    </div>
    

  )
}

function DentistOffice() {

  // useState variables to get via the db
  const [officePhone, setOfficePhone] = useState("626-731-3955");
  const [officeEmail, setOfficeEmail] = useState("ckchung@ccp.edu");
  const [officeAddr, setOfficeAddr] = useState("9501 Lemon Ave, Temple City");

  // GET FROM DB (we only have one office, otherwise idk what parameter to use to query unless we make another class attribute to patient)
  const info = {
    'phone': "hi",
    'email': "hi",
    'address': "hi"
  };

  return (
    <div className="flex-flow items-center justify-center w-[50vw]">
      <div className="ml-16 flex text-white font-bold text-[1.75vw] mt-4 mb-2 underline">
        Dentist Office Information
      </div>
      <div className="ml-16 flex-flow bg-g rounded-xl">
        <div className="p-5 text-[1.19vw] text-white">
          <p><b>Phone Number: </b>{officePhone}</p>
          <p><b>Email Address: </b>{officeEmail}</p>
          <p><b>Address: </b>{officeAddr}</p> 
        </div>
      </div>
    </div>
  )
}

function PatientInfo() {

  const [patName, setPatName] = useState("Lebron James");
  const [patPhone, setPatPhone] = useState("877-478-7452");
  const [patEmail, setPatEmail] = useState("kars4kids@hotmail.com");
  const [patAddy, setPatAddy] = useState("123 Sesame St., Santa Monica");
  const [patDOB, setPatDOB] = useState("12/30/1984");
  const [patIns, setPatIns] = useState("State Farm");

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");

    // if not logged in, won't try to fetch user data
    if (storedEmail === 'undefined' || storedEmail === "" || storedEmail === null) {
      console.log('not logged in');
    } else {
      // generate api url
      const reqEmail = sessionStorage.getItem("email").split("@");
      const url = "http://localhost:3000/patient/?email=" + reqEmail[0] + "%40" + reqEmail[1];

      // fetch user data
      fetch(url, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem("authToken")
        }
      }).then((res) => {
        return res.json();
      }).then((res) => {
        setPatName(res.name);
        setPatPhone(res.phone);
        setPatEmail(res.email);
        setPatAddy(res.address);
        setPatDOB(res.dateOfBirth.substring(0,10));
        setPatIns(res.insuranceCompany);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);

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
          <p><b>Full Name: </b>{patName}</p>
          <p><b>Phone Number: </b>{patPhone}</p>
          <p><b>Email Address: </b>{patEmail}</p> 
          <p><b>Address: </b>{patAddy}</p> 
          <p><b>Date of Birth: </b>{patDOB}</p>
          <p><b>Inurance Provider: </b>{patIns}</p>
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
              <DentistOffice />
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
  