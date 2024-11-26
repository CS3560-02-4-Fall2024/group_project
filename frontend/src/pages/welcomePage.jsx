import { useNavigate } from 'react-router-dom';

function WelcomePage() {

  const navigate = useNavigate();

  const goPatient = () => {
    navigate("/patientLogin");
  };

  const goDentist = () => {
    navigate("/dentistLogin");
  };


  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-dg flex items-center justify-center">
        <div className="bg-g rounded-3xl flex-flow justify-center px-14 pb-10">
          <div className="">
            <div className="text-white text-center text-4xl font-bold mt-10">
              <p>Welcome</p>
              <p>to</p>
              <p>Shiny Teeth & Me</p>
            </div>
            <div className="flex items-center justify-center mt-10">
              <button onClick={goPatient} className="p-3 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
                Patient Login
              </button>
            </div>
            <div className="flex items-center justify-center mt-10">
              <button onClick={goDentist} className="p-3 bg-dg text-white font-bold text-2xl rounded-xl hover:bg-[#587354]">
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
