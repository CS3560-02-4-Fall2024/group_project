import { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import Calendar from 'react-calendar';
import IconCalendar from '../assets/calendar-small-page.png'
import { Navigate, useNavigate } from 'react-router-dom';
import ApptConfirm from '../components/ApptConfirm';
import 'react-calendar/dist/Calendar.css';
import { getDentists } from '../services/dentist';
import { getAvailability } from '../services/availability';
import { bookAppointment } from '../services/appointments';
import { getUser } from '../services/auth';

function RequestAppt() {
  const navigate = useNavigate();

  const [submitted, setSubmited] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  const [selectedDentistId, setSelectedDentistId] = useState();
  const [purpose, setPurpose] = useState('');

  const [dentists, setDentists] = useState([]);
  const [availability, setAvailability] = useState([]);

  // get dentists
  useEffect(() => {
    getDentists()
      .then((val) => {
        setDentists(val);
      })
  }, [])

  useEffect(() => {
    if (!selectedDentistId) return;
    getAvailability(selectedDentistId)
      .then((val) => {
        setAvailability(val);
      })
  }, [selectedDentistId])

  const handleSubmit = () => {
    console.log(time);
    const curr = new Date(time);
    curr.setHours(curr.getHours() - 8);
    console.log('curr', curr.toISOString().slice(0,19));
    
    
    bookAppointment({
      patientId: getUser().id,
      dentistId: selectedDentistId,
      timeSlot: curr.toISOString().slice(0,19), // testing
      purpose: purpose,
    })
    .then((value) => {
      console.log('book', value);
      
      if (value) setSubmited(true);
    })
  }

  return (
    <>
      <NavBar />

      {submitted ? <ApptConfirm date={date.toDateString()} time={time} /> :
        <div className='w-[100vw] h-[88vh] bg-dg flex flex-col items-center'>
          <div className='w-[38vw] h-[70vh] mt-auto mb-auto rounded-3xl bg-g flex flex-wrap overflow-y-scroll justify-evenly content-start py-8'>

            {/* Select Dentist (+ an invisible field to keep the structure) */}
            <select className='w-[35%] fourkay:w-[40%] h-8 invisible mb-12'></select>
            <select id="daTypes" onChange={(e) => {
              setSelectedDentistId(e.target.value);
            }} className='w-[35%] fourkay:w-[40%] h-8 rounded-lg mb-12'>
              <option value="" disabled selected >Select Dentist Name</option>
              {dentists.map((elem) => {
                return <option value={elem.id} key={elem.id}>{elem.name}</option>
              })}
            </select>

            <Calendar onChange={setDate} value={date} minDate={new Date()} />

            <select id='shitface' onChange={(e) => { setTime(e.target.value) }} className='w-[35%] h-8 fourkay:w-[40%] rounded-lg pl-2' >
              <option value="" disabled selected >Select Time</option>
              {availability && availability
                .filter((elem) => {
                  return elem.status === 'available';
                })
                .filter((elem) => {
                  const currDate = new Date(elem.timeSlot);
                  return currDate.getDate() == date.getDate();
                })
                .map((elem) => {
                  return <option value={elem.timeSlot} key={elem.id}>{elem.timeSlot}</option>
                })}
            </select>


            {/* <select className='w-[100%] h-8 invisible mb-12'></select> */}
            <div className='w-4/5 h-1/3 flex flex-col items-center min-h-0'>
              <p className='text-3xl text-white font-semibold p-1'>Purpose of Visit</p>
              <textarea onChange={(e) => {setPurpose(e.target.value)}} className='w-full h-full rounded-xl pl-2 pt-2 min-h-0'>
                {purpose}
              </textarea>
            </div>
          </div>

          {/* This is the Schedule Button */}
          <button onClick={handleSubmit} className='w-[14vw] h-[7vh] bg-g hover:bg-[#587354] rounded-xl mb-12 mt-4 text-white font-bold text-3xl'>Schedule</button>
        </div >
      }
    </>
  )
}
export default RequestAppt;
