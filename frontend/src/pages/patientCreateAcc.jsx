import { useNavigate } from "react-router-dom";
import { useState } from "react";

function PatientCreateAcc() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [insurance, setInsurance] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  {/*Button Functions*/}
  const goLogin = () => {
    navigate("/patientLogin");
  };

  const createAcc = () => {

    if (name === "") {
      
    } else if (password.length < 8) {

    } else if (email.indexOf("@") < 0) {

    } else if (number === "") {

    } else if (dob === "") {

    } else if (insurance === "") {

    } else if (address === "") {

    } else {
      
      // JSON containing all patient info
      const createJSON = {
        'name': name,
        'password': password,
        'email': email,
        'phone': number,
        'dateOfBirth': dob,
        'insuranceCompany': insurance,
        'address': address
      }

      // backend url
      const url = "http://localhost:3000/auth/patient";

      fetch(url, {
        body: JSON.stringify(createJSON),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        return res.json();
      }).then((res) => {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("authToken", res.authToken);
        navigate("/home");
      }).catch((err) => {
        console.log(err);
      });
    }

    
    // also add storing date in fields ?
  };
  return (
    <>
      {/*Background*/}
      <div className="w-[100vw] h-[100vh] bg-dg flex items-center justify-center">
        {/*Light Green Block*/}
        <div className="bg-g rounded-3xl flex-display justify-center px-14 pb-6">
          <div className="">
            {/*Title of Page*/}
            <div className="text-white text-center text-3xl font-bold mt-10">
              <p>Create Patient Account</p>
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
                  <input onChange={(e) => setName(e.target.value)} className="p-2 w-80 rounded-md bg-tan text-left"></input>
                </div>
              </div>
              <div className="mx-4">
                {/*Password Text*/}
                <div className="text-white text-xl mt-4 ml-2 mb-1">
                  Password
                </div>
                {/*Name Input Field*/}
                <div className="flex items-center justify-center">
                  <input onChange={(e) => setPassword(e.target.value)} type="password" className="p-2 w-80 rounded-md bg-tan text-left"></input>
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
                  <input onChange={(e) => setEmail(e.target.value)} className="p-2 w-80 rounded-md bg-tan text-left"></input>
                </div>
              </div>
              <div className="mx-4">
                {/*Phone Number Text*/}
                <div className="text-white text-xl mt-2 ml-2 mb-1">
                  Phone Number
                </div>
                {/*Phone Number Input Field*/}
                <div className="flex items-center justify-center">
                  <input onChange={(e) => setNumber(e.target.value)} className="p-2 w-80 rounded-md bg-tan text-left"></input>
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
                  <input onChange={(e) => setDob(e.target.value)} className="p-2 w-80 rounded-md bg-tan text-left"></input>
                </div>
              </div>
              <div className="mx-4">
                {/*Insurance Company Text*/}
                <div className="text-white text-xl mt-2 ml-2 mb-1">
                  Insurance Company
                </div>
                {/*Insurance Company Input Field*/}
                <div className="flex items-center justify-center">
                  <input onChange={(e) => setInsurance(e.target.value)} className="p-2 w-80 rounded-md bg-tan text-left"></input>
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
                  <input onChange={(e) => setAddress(e.target.value)} className="p-2 w-96 rounded-md bg-tan text-left"></input>
                </div>
              </div>
            </div>
            {/*Create Account Button*/}
            <div className="flex items-center justify-center mt-10">
              <button onClick={createAcc} className="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                Create Account
              </button>
            </div>
            {/*Don't Have an Account*/}
            <div className="flex items-center justify-center mt-5 text-white">
              <button onClick={goLogin} className="hover:text-[#587354]">
                <p>Sike! I have an Account</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientCreateAcc
