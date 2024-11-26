import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {

  const navigate = useNavigate();

  const goPatient = () => {
    navigate("/login");
  };

  const goDentist = () => {
    navigate("/dentistLogin");
  };


  return (
    <>
      <div class="w-[100vw] h-[100vh] bg-dg flex items-center justify-center">
        <div class="bg-g rounded-3xl flex-flow justify-center px-14 pb-10">
          <div class="">
            <div class="text-white text-center text-4xl font-bold mt-10">
              <p>Welcome</p>
              <p>to</p>
              <p>Shiny Teeth & Me</p>
            </div>
            <div class="flex items-center justify-center mt-10">
              <button onClick={goPatient} class="p-3 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                Patient Login
              </button>
            </div>
            <div class="flex items-center justify-center mt-10">
              <button onClick={goDentist} class="p-3 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                Dentist Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WelcomePage
