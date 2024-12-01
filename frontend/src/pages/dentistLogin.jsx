import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DentistLogin() {

  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {

    // post this json for login and return a Json with id
    const loginJSON = {
      'id': id,
      'password': password
    };

    let url = 'http://localhost:3000/auth/dentist/login';

    fetch(url, {
      body: JSON.stringify(loginJSON),
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      return res.json();
    }).then((res) => {
      sessionStorage.setItem("id", id);
      sessionStorage.setItem("authToken", res.authToken);
      navigate("/home");
    }).catch((err) => {
      console.log(err);
    });

  };

  const goCreate = () => {
    navigate("/dentistCreateAcc")
  };

  return (
    <>
      {/*Background*/}
      <div className="w-[100vw] h-[100vh] bg-dg flex items-center justify-center">
        {/*Light Green Block*/}
        <div className="bg-g rounded-3xl flex-flow justify-center px-14 pb-6">
          <div className="">
            {/*Title of Page*/}
            <div className="text-white text-center text-4xl font-bold mt-10">
              <p>Shiny Teeth & Me</p>
              <p>Dentist Login</p>
            </div>
            {/*Dentist ID Text*/}
            <div className="text-white text-xl mt-6 ml-1 mb-1">
              Dentist ID
            </div>
            {/*Dentist ID Input Field*/}
            <div className="flex items-center justify-center">
              <input onChange={(e) => setId(e.target.value)} className="p-2 w-80 rounded-md bg-tan text-left"></input>
            </div>
            {/*Password Text*/}
            <div className="text-white text-xl mt-5 ml-1 mb-1">
              Password
            </div>
            {/*Password Input Field*/}
            <div className="flex items-center justify-center">
              <input onChange={(e) => setPassword(e.target.value)} className="p-2 w-80 rounded-md bg-tan text-left"></input>
            </div>
            {/*Login Button*/}
            <div className="flex items-center justify-center mt-10">
              <button onClick={Login} className="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                Login
              </button>
            </div>
            {/*Don't Have an Account*/}
            <div className="flex items-center justify-center mt-10 text-white">
              <button onClick={goCreate} className="hover:text-[#587354]">
                <p>Don't have an Account?</p>
                <p>Create a Dentist Account Here</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DentistLogin
