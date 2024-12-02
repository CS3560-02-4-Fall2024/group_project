import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function EditPatientProfile() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [insurance, setInsurance] = useState("");
  const [address, setAddress] = useState("");

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

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  const completeEdit = () => {
    
    
    navigate("/home");
    


  };

  return (
    <>
      {/*Background*/}
      <div className="w-[100vw] h-[100vh] bg-dg">
        <NavBar />
        <div className="w-[100%] h-[80%] flex items-center justify-center">
          {/*Light Green Block*/}
          <div className="bg-g rounded-3xl flex-display justify-center mt-20 px-14 pb-6">
            <div className="">
              {/*Title of Page*/}
              <div className="text-white text-center text-3xl font-bold mt-10">
                <p>Edit Patient Account</p>
              </div>
              {/*1st line of inputs*/}
              <div className="flex justify-center">
                <div className="mx-4">
                  {/*Name Text*/}
                  <div className="text-white text-xl mt-4 ml-2 mb-1">
                    Name
                  </div>
                  {/*Name Input Field*/}
                  <div className="flex items-center justify-center">
                    <input placeholder={name} className="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
                <div className="mx-4">
                  {/*Password Text*/}
                  <div className="text-white text-xl mt-4 ml-2 mb-1">
                    Password
                  </div>
                  {/*Name Input Field*/}
                  <div className="flex items-center justify-center">
                    <input placeholder={password} className="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
              </div>
              {/*2nd line of inputs*/}
              <div className="flex justify-center">
                <div className="mx-4">
                  {/*Email Address Text*/}
                  <div className="text-white text-xl mt-2 ml-2 mb-1">
                    Email Address
                  </div>
                  {/*Email Address Input Field*/}
                  <div className="flex items-center justify-center">
                    <input placeholder={email} className="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
                <div className="mx-4">
                  {/*Phone Number Text*/}
                  <div className="text-white text-xl mt-2 ml-2 mb-1">
                    Phone Number
                  </div>
                  {/*Phone Number Input Field*/}
                  <div className="flex items-center justify-center">
                    <input placeholder={number} className="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
              </div>
              {/*3rd line of inputs*/}
              <div className="flex">
                <div className="mx-4">
                  {/*Date of Birth Text*/}
                  <div className="text-white text-xl mt-2 ml-2 mb-1">
                    Date of Birth
                  </div>
                  {/*Date of Birth Input Field*/}
                  <div className="flex items-center justify-center">
                    <input placeholder={dob} className="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
                <div className="mx-4">
                  {/*Insurance Company Text*/}
                  <div className="text-white text-xl mt-2 ml-2 mb-1">
                    Insurance Company
                  </div>
                  {/*Insurance Company Input Field*/}
                  <div className="flex items-center justify-center">
                    <input placeholder={insurance} className="p-2 w-80 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
              </div>
              {/*4th line of inputs*/}
              <div className="flex">
                <div className="mx-4">
                  {/*Address Text*/}
                  <div className="text-white text-xl mt-2 ml-2 mb-1">
                    Address
                  </div>
                  {/*Address Input Field*/}
                  <div className="flex items-center justify-center">
                    <input placeholder={address} className="p-2 w-96 rounded-md bg-tan text-left"></input>
                  </div>
                </div>
              </div>
              {/*Create Account Button*/}
              <div className="flex items-center justify-center mt-5">
                <button onClick={completeEdit} className="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                  Edit Account
                </button>
              </div>
              {/*Don't Have an Account*/}
              <div className="flex items-center justify-center mt-5 mb-5 text-white">
                <button onClick={goHome} className="hover:text-[#587354]">
                  <p>Sike! Take me Home!</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default EditPatientProfile
  