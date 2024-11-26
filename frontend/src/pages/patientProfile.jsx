import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function PatientProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("Lebron Raymone James");
  const [phone, setPhone] = useState("(626) 731-3956");
  const [email, setEmail] = useState("lbj@gmail.com");
  const [dob, setDob] = useState("07-31-2003");
  const [insurance, setInsurance] = useState("Aetna");
  const [address, setAddress] = useState("1234 Lebron Rd, Pomona, CA 91768");

  // TODO: make useEffect to get info on first render
  // db query parameter
  const query = { 'id': '' };

  // return
  const patientJSON = {
    'name': '',
    'phone': '',
    'email': '',
    'dob': '',
    'insurance': '',
    'address': ''
  }

  const goHome = () => {
    navigate("/dentistHome")
  };

  const viewPast = () => {
    navigate("/dentistPast")
  };

  return (
    <>
      {/*Background*/}
      <div className="w-[100vw] h-[100vh] bg-dg">
        <NavBar />
        <div className="w-[100%] h-[80%] flex items-center justify-center">
          {/*Light Green Block*/}
          <div className="bg-g rounded-3xl flex justify-center px-6">
            <div className="">
              {/*Name of Patient*/}
              <div className="text-white text-center text-5xl font-bold mt-5 mb-1">
                <p>{name}</p>
              </div>
              <div className="text-nowrap text-white text-3xl">
                {/*Phone Number Text*/}
                <div>
                  <b>Phone Number: </b> {phone}
                </div>
                {/*Email Address Text*/}
                <div>
                  <b>Email Address: </b> {email}
                </div>
                {/*Date of Birth Text*/}
                <div>
                  <b>Date of Birth: </b> {dob}
                </div>
                {/*Insurance Company Text*/}
                <div>
                  <b>Insurance Company: </b> {insurance}
                </div>
                {/*Address Text*/}
                <div>
                  <b>Address: </b> {address}
                </div>
              </div>
              {/*View Past Appointments Button*/}
              <div className="flex items-center justify-center mt-20">
                <button onClick={viewPast} className="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                  View Past Appointments
                </button>
              </div>
              {/*Back to Home*/}
              <div className="flex items-center justify-center mt-5 mb-5 text-white text-lg">
                <button onClick={goHome} className="hover:text-[#587354]">
                  <p>Back To Home</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default PatientProfile
  