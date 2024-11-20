import { useNavigate } from "react-router-dom"

function PatientLogin() {

    const navigate = useNavigate();

    {/*Button Fucntions*/}
    const goHome = () => {
      navigate("/home")
      // also add storing date in fields ?
    };

    const goCreate = () => {
      navigate("/createAcc")
      // also add storing date in fields ?
    };

    return (
      <>
        {/*Background*/}
        <div class="w-[100vw] h-[100vh] bg-dg flex items-center justify-center">
          {/*Light Green Block*/}
          <div class="bg-g rounded-3xl flex-display justify-center px-14 pb-6">
            <div class="">
              {/*Title of Page*/}
              <div class="text-white text-center text-4xl font-bold mt-10">
                <p>Shiny Teeth & Me</p>
                <p>Patient Login</p>
              </div>
              {/*Email Address Text*/}
              <div class="text-white text-xl mt-6 ml-1 mb-1">
                Email Address
              </div>
              {/*Email Address Input Field*/}
              <div class="flex items-center justify-center">
                <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
              </div>
              {/*Password Text*/}
              <div class="text-white text-xl mt-5 ml-1 mb-1">
                Password
              </div>
              {/*Password Input Field*/}
              <div class="flex items-center justify-center">
                <input class="p-2 w-80 rounded-md bg-tan text-left"></input>
              </div>
              {/*Login Button*/}
              <div class="flex items-center justify-center mt-10">
                <button onClick={goHome} class="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                  Login
                </button>
              </div>
              {/*Don't Have an Account*/}
              <div class="flex items-center justify-center mt-10 text-white">
                <button onClick={goCreate} class="hover:text-[#587354]">
                  <p>Don't have an Account?</p>
                  <p>Create a Patient Account Here</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default PatientLogin
  