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
          <div className='w-[100vw] h-[88vh] bg-dg flex items-center justify-center'>
            <div className='w-[38vw] h-[69vh] rounded-xl bg-g flex flex-wrap justify-evenly content-start py-8'>
              {/* Input Name */}
              <input onChange={(e) => setPatientName(e.target.value)} placeholder='Enter Name' className='w-[35%] h-8 rounded-md mb-12 pl-2'></input>

              {/* Select Dentist Type */}
              <select onChange={(e) => setDentistType(e.target.value)} className='w-[35%] h-8 rounded-md mb-12' >
                <option value="" disabled selected >Select Dentist Type</option>
                <option value="orthodontist" >Orthodontist</option>
                <option value="surgeon" >Oral Surgeon</option>
                <option value="general" >General Cleaning</option>
              </select>

              {/* Select Dentist (+ an invisible field to keep the structure) */}
              <select className='w-[35%] h-8 invisible mb-12'></select>
              <select onChange={(e) => setDentistName(e.target.value)} className='w-[35%] h-8 rounded-md mb-12'>
                <option value="" disabled selected >Select Dentist Name</option>
              </select>

              <input onChange={(e) => setDate(e.target.value)} placeholder='MM/DD/YY' className='w-[35%] h-8 pl-2 rounded-md' ></input>

              <input onChange={(e) => setTime(e.target.value)} placeholder='HH:MM' className='w-[35%] h-8 pl-2 rounded-md' ></input>

              <p className='mt-10 text-3xl text-white font-semibold p-1'>Purpose of Visit</p>
              <textarea onChange={(e) => setPurpose(e.target.value)} rows={1} cols={50} className='w-4/5 h-1/4 pl-2 pt-2 rounded-md'></textarea>
            
              <button onClick={Schedule} className='w-[14vw] h-[7vh] bg-dg hover:bg-[#587354] rounded-lg mt-5 text-white font-bold text-xl'>Schedule</button>

            </div>
            
          </div>
      </>
    )
  }
  
  export default RequestAppt;
  