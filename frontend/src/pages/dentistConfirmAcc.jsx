import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DentistConfirmAcc() {
  const [dentistID, setDentistID] = useState("0001");
  const navigate = useNavigate();

  // id can come from localstorage from the createacc page

  const goLogin = () => {
    navigate("/dentistLogin")
  };

  return (
    <>
      {/*Background*/}
      <div className="w-[100vw] h-[100vh] bg-dg flex items-center justify-center">
        {/*Light Green Block*/}
        <div className="bg-g rounded-3xl flex-flow justify-center items-center py-10 px-20">
          <div>
            {/*Title Text*/}
            <div className="text-center text-white text-4xl font-bold">
              <p>Thank you for</p>
              <p>Creating an Account!</p>
            </div>
            {/*More Text*/}
            <div className="text-center text-white text-4xl font-bold mt-10">
              <p>Your Dentist ID is:</p>
              {/*Dentist ID Variable*/}
              <p className="underline">{dentistID}</p>
            </div>
            {/*Go back to login button*/}
            <div className="flex items-center justify-center mt-10">
                <button onClick={goLogin} className="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                  Go To Login
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DentistConfirmAcc
