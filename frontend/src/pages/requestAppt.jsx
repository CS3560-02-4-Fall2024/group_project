import { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';

function RequestAppt() {

    const [patientName, setPatientName] = useState("");
    const [dentistType, setDentistType] = useState("");
    const [dentistName, setDentistName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [purpose, setPurpose] = useState("");

    useEffect(() => {
      console.log(patientName + " " + dentistType + " " + dentistName + " " + date + " " + time + " " + purpose);
    }, [patientName, dentistName, dentistType, date, time, purpose]);

    const Schedule = () => {
      console.log("scheduled!");
    };

    return (
      <>
          <NavBar />
          {/* This is the form */}
          <div className='w-[100vw] h-[88vh] bg-dg flex flex-col items-center'>
              <div className='w-[38vw] h-[69vh] border-2 border-black mt-12 mb-auto rounded-xl bg-g flex flex-wrap justify-evenly content-start py-8'>
                {/* Input Name */}
                <input onChange={(e) => setPatientName(e.target.value)} placeholder='Enter Name' className='w-[35%] h-8 border-2 border-black rounded-md mb-12'></input>

                {/* Select Dentist Type */}
                <select onChange={(e) => setDentistType(e.target.value)} className='w-[35%] h-8 border-2 border-black rounded-md mb-12' >
                  <option value="" disabled selected >Select Dentist Type</option>
                  <option value="orthodontist" >Orthodontist</option>
                  <option value="surgeon" >Oral Surgeon</option>
                  <option value="general" >General Cleaning</option>
                </select>

                {/* Select Dentist (+ an invisible field to keep the structure) */}
                <select className='w-[35%] h-8 invisible mb-12'></select>
                <select onChange={(e) => setDentistName(e.target.value)} className='w-[35%] h-8 border-2 border-black rounded-md mb-12'>
                  <option value="" disabled selected >Select Dentist Name</option>
                </select>

                <input onChange={(e) => setDate(e.target.value)} placeholder='MM/DD/YY' className='w-[35%] h-8 border-2 border-black mb-48' ></input>

                <input onChange={(e) => setTime(e.target.value)} placeholder='HH:MM' className='w-[35%] h-8 border-2 border-black mb-48' ></input>

                <p className='text-3xl font-semibold p-1'>Purpose of Visit</p>
                <textarea onChange={(e) => setPurpose(e.target.value)} rows={1} cols={50} className='w-4/5 h-1/4 border-2 border-black m-auto'></textarea>
              </div>

              {/* This is the Schedule Button */}
              <button onClick={Schedule} className='w-[14vw] h-[7vh] border-2 border-black bg-g hover:bg-[#587354] rounded-lg mb-12 mt-4'>Schedule</button>
          </div>
      </>
    )
  }
  
  export default RequestAppt;
  