import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

// mini component to generate upcoming appointments
function Appt() {

  const [apptDate, setApptDate] = useState("12/30/24");
  const [apptTime, setApptTime] = useState("3:30 PM");
  const [patName, setPatName] = useState("Lebron Raymone James");
  const [patPhone, setPatPhone] = useState("(626) 731-3955");
  const [patEmail, setPatEmail] = useState("lbj@gmail.com");
  
  const navigate = useNavigate();

  const cancelAppt = () => {
    console.log("kys")
    //do something about cancelling
  };

  return (
    <div className="flex-flow rounded-xl mb-3 bg-g">
      <div className="pt-2 pl-3 text-white text-xl">
        <p className="font-bold">{apptDate} {apptTime}</p>
        <p>{patName}</p>
        <p>{patPhone}</p>
        <p>{patEmail}</p>
      </div> 
      <div className="flex justify-center">
        <button onClick={cancelAppt} className="text-white hover:text-[#587354] rounded-lg font-bold text-lg mb-3">Cancel Appointment</button>
      </div>
    </div>
  )
}

function UpcomingAppt() {
  const navigate = useNavigate();

  const [appts, setAppts] = useState([]);

  // query parameter is patientId
  const query = { 'id': ''};

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
    <div className="flex justify-center w-[100%] h-[100%] bg-dg">
      <div class="flex-flow">
        <div className="ml-16 flex text-white font-bold text-4xl mt-4 mb-2 mr-72 underline">
          Upcoming Appointments
        </div>
        <div class="ml-16 h-[60vh] overflow-y-scroll">
          <Appt />
          <Appt />
          <Appt />
          <Appt />
          <Appt />
          <Appt />
        </div>
        <div class='flex justify-center text-white mt-10'>
          <button onClick={reqAppt} class="ml-16 py-3 px-5 bg-g rounded-xl hover:bg-[#587354] font-bold text-4xl">Request Appointment</button>
        </div>
      </div>
      
    </div>
    

  )
}

function RequestAppt() {
  const navigate = useNavigate()
  return (
    <div>
      Ur MOM
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
    <div className="flex-flow items-center justify-center w-[100vh]">
      <div className="ml-16 flex text-white font-bold text-4xl mt-4 mb-2 underline">
        Dentist Office Information
      </div>
      <div class="ml-16 flex-flow bg-g rounded-xl">
        <div className="p-5 text-2xl text-white">
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

  // query parameter is patient id
  const query = {'id': ''};

  // GET FROM DB
  const patientJSON = {
    'name': '',
    'phone': '',
    'email': '',
    'address': '',
    'dob': '',
    'insurance': ''
  }

  const toEditProfile = () => {
    navigate("/editProfile");
  };

  const toPastAppt = () => {
    navigate("/pastAppt");
  };

  return (
    <div className="flex-flow items-center justify-center w-[100vh]">
      <div className="ml-16 flex text-white font-bold text-4xl mt-4 mb-2 underline">
        Patient Information
      </div>
      <div class="ml-16 flex-flow bg-g rounded-xl">
        <div className="p-5 pr-80 text-2xl text-white">
          <p><b>Full Name: </b>{patName}</p>
          <p><b>Phone Number: </b>{patPhone}</p>
          <p><b>Email Address: </b>{patEmail}</p> 
          <p><b>Address: </b>{patDOB}</p> 
          <p><b>Date of Birth: </b>{patDOB}</p>
          <p><b>Inurance Provider: </b>{patIns}</p>
        </div>
        <div class="flex justify-center">
          <button onClick={toEditProfile} class="hover:bg-[#587354] bg-dg px-3 py-3 font-bold text-white text-lg rounded-xl">Edit Profile</button>
        </div>
        <div class="flex justify-center">
          <button onClick={toPastAppt} class="hover:bg-[#587354] bg-dg px-3 py-3 font-bold text-white text-lg rounded-xl mt-5 mb-5">View Past Appointments</button>          
        </div>
      </div>
    </div>
  )
}

// main page component
function PatientHome() {

    return (
      <>
        <div class="w-[100vw] h-[100vh] bg-dg">
          <Navbar />
          <div className='w-[100vw] h-[88vh] flex justify-items'>
            <div>
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
  