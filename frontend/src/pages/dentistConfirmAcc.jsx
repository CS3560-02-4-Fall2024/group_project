import { useState } from "react";
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
      <div class="w-[100vw] h-[100vh] bg-dg flex items-center justify-center">
        {/*Light Green Block*/}
        <div class="bg-g rounded-3xl flex-flow justify-center items-center py-10 px-20">
          <div>
            {/*Title Text*/}
            <div class="text-center text-white text-4xl font-bold">
              <p>Thank you for</p>
              <p>Creating an Account!</p>
            </div>
            {/*More Text*/}
            <div class="text-center text-white text-4xl font-bold mt-10">
              <p>Your Dentist ID is:</p>
              {/*Dentist ID Variable*/}
              <p class="underline">{dentistID}</p>
            </div>
            {/*Go back to login button*/}
            <div class="flex items-center justify-center mt-10">
                <button onClick={goLogin} class="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
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
