import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PatientProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [insurance, setInsurance] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const currId = sessionStorage.getItem("buttocks");
    const url = "http://localhost:3000/dentist/getPatientById?id=" + currId;
    fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("authToken")
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      setName(res.name);
      setPhone(res.phone);
      setEmail(res.email);
      setDob(res.dateOfBirth.substring(0,10));
      setInsurance(res.insuranceCompany);
      setAddress(res.address);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

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
  