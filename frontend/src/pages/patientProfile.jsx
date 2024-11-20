import NavBar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function PatientProfile() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/dentistHome")
  };

  const viewPast = () => {
    navigate("/dentistPast")
  };

  return (
    <>
      {/*Background*/}
      <div class="w-[100vw] h-[100vh] bg-dg">
        <NavBar />
        <div class="w-[100%] h-[80%] flex items-center justify-center">
          {/*Light Green Block*/}
          <div class="bg-g rounded-3xl flex justify-center px-6">
            <div class="">
              {/*Name of Patient*/}
              <div class="text-white text-center text-5xl font-bold mt-5 mb-1">
                <p>Name of Patient</p>
              </div>
              <div class="text-nowrap text-white text-3xl">
                {/*Phone Number Text*/}
                <div>
                  <b>Phone Number: </b> dumy text
                </div>
                {/*Email Address Text*/}
                <div>
                  <b>Email Address: </b> dumy text
                </div>
                {/*Date of Birth Text*/}
                <div>
                  <b>Date of Birth: </b> 07/31/2003
                </div>
                {/*Insurance Company Text*/}
                <div>
                  <b>Insurance Company: </b> Aetna
                </div>
                {/*Address Text*/}
                <div>
                  <b>Address: </b> 1234 Lebron Road, Pomona, CA 91768
                </div>
              </div>
              {/*View Past Appointments Button*/}
              <div class="flex items-center justify-center mt-20">
                <button onClick={viewPast} class="p-3 px-10 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                  View Past Appointments
                </button>
              </div>
              {/*Back to Home*/}
              <div class="flex items-center justify-center mt-5 mb-5 text-white text-lg">
                <button onClick={goHome} class="hover:text-[#587354]">
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
  