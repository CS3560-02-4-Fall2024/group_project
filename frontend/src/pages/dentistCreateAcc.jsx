import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DentistCreateAcc() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  
  const goLogin = () => {
    navigate("/dentistLogin")
  };

  const createAcc = () => {

    // post account info and return a JSON of dentistId for localstorage
    const infoJSON = {
      'name': name,
      'type': type,
      'password': password
    }

    const returnJSON = {
      'id': id
    }

    const url = "http://localhost:3000/auth/dentist";

    fetch(url, {
      body: JSON.stringify(infoJSON),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      sessionStorage.setItem("authToken", res.authToken);
      navigate("/dentistConfirm")
    }).catch((err) => {
      console.log(err);
    });
    
    //store info in db

  }

  return (
    <>
      {/*Background*/}
      <div className="w-[100vw] h-[100vh] bg-dg flex items-center justify-center">
        {/*Light Green Block*/}
        <div className="bg-g rounded-3xl flex-flow justify-center px-14 pb-6">
          <div className="">
            {/*Title of Page*/}
            <div className="text-white text-center text-3xl font-bold mt-10">
              <p>Create Dentist Account</p>
            </div>
            {/*Name Text*/}
            <div className="text-white text-xl mt-4 ml-2 mb-1">
              Name
            </div>
            {/*Name Input Field*/}
            <div className="flex items-center justify-center">
              <input onChange={(e) => setName(e.target.value)} className="p-2 w-80 rounded-md bg-tan text-left"></input>
            </div>
            {/*Dentist Type Text*/}
            <div className="text-white text-xl mt-3 ml-2 mb-1">
              Dentist Type
            </div>
            {/*Dentist Type InputField*/}
            <div className="flex items-center justify-center">
              <input onChange={(e) => setType(e.target.value)} className="p-2 w-80 rounded-md bg-tan text-left"></input>
            </div>
            {/*Password Text*/}
            <div className="text-white text-xl mt-3 ml-2 mb-1">
              Password
            </div>
            {/*Password Input Field*/}
            <div className="flex items-center justify-center">
              <input onChange={(e) => setPassword(e.target.value)} type="password" className="p-2 w-80 rounded-md bg-tan text-left"></input>
            </div>
            {/*Create Account Button*/}
            <div className="flex items-center justify-center mt-10">
              <button onClick={createAcc} className="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                Create Account
              </button>
            </div>
            {/*Don't Have an Account*/}
            <div className="flex items-center justify-center mt-10 text-white">
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

export default DentistCreateAcc
