import { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';
import IconCalendar from '../assets/calendar-small-page.png'
import { useNavigate } from 'react-router-dom';

// TODO: add start and end time, and dentist select
function RequestAppt() {

    const [patientName, setPatientName] = useState("");
    const [dentistType, setDentistType] = useState("");
    const [dentistName, setDentistName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [purpose, setPurpose] = useState("");

    const [currDate, setCurrDate] = useState(new Date());
    const [currMonth, setCurrMonth] = useState((new Date()).getMonth());
    const [currYear, setCurrYear] = useState((new Date()).getFullYear());

    const [calendarOpen, setCalendarOpen] = useState(false);

    useEffect(() => {
      setCurrMonth(currDate.getMonth());
      setCurrYear(currDate.getFullYear());
    }, [])

    const MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const nextMonth = () => {
      const thisMonth = currMonth + 1;
      document.getElementById("calendar").innerHTML = "";

      if (thisMonth > 11) {
        setCurrYear(currYear + 1);
        setCurrMonth(0);
      } else {
        setCurrMonth(currMonth + 1);
      }
    };

    const prevMonth = () => {
      const thisMonth = currMonth - 1;
      document.getElementById("calendar").innerHTML = "";

      if (thisMonth < 0) {
        setCurrYear(currYear - 1);
        setCurrMonth(11);
      } else {
        setCurrMonth(currMonth - 1);
      }
    };

    useEffect(() => {
      const calendar = document.getElementById("calendar");
      const dayOne = new Date(currYear, currMonth).getDay();
      const numDays = 32 - new Date(currYear, currMonth, 32).getDate();

      let d = 1;
      for (let i  = 0; i < 6; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < 7; j++) {
          let col = document.createElement("td");
          if (d > numDays) {
            break;
          } else if (i === 0 && j < dayOne) {
            let colText = document.createTextNode("");
            col.appendChild(colText);
            row.appendChild(col);
          } else {
            let colText = document.createTextNode(d);
            col.appendChild(colText);

            if (d === currDate.getDate() && currMonth === currDate.getMonth() && currYear === currDate.getFullYear()) {
              col.classList.add("today");
            }

            col.onclick = () => {
              setDate((currMonth + 1) + "/" + col.textContent + "/" + currYear);
            }

            row.appendChild(col);

            d++;
          }
        }
        calendar.appendChild(row);
      }
    }, [currMonth])

    const toggleCalendar = () => {
      setCalendarOpen(!calendarOpen);
    }

    // everytime the date is picked, render in the available times for that day
    useEffect(() => {
      // query for available times given a date
      const query = {
        'date': ''
      }
      // return an array of appts with their ids and their times
      const returnJSON = [{'apptid': '', 'time': ''}, {}, {}]
    }, [date])

    const navigate = useNavigate();

    const Schedule = () => {

      // post a appt into db
      const detailsJSON = {
        'id': '', //patientId
        'name': '', //dentistName (and then you gotta get the id for the appt table)
        'type': '',
        'date': '',
        'time': '',
        'purpose': ''
      }
      navigate("/apptConfirm")
      //do database storing shit
    };

    return (
      <>
          <NavBar />
          {/* This is the form */}
          <div className='w-[100vw] h-[88vh] bg-dg flex flex-col items-center'>
            <div className='w-[38vw] h-[70vh] mt-auto mb-auto rounded-3xl bg-g flex flex-wrap overflow-y-scroll justify-evenly content-start py-8'>
              {/* Input Name */}
              <input onChange={(e) => setPatientName(e.target.value)} placeholder='Enter Name' className='w-[35%] h-8 fourkay:w-[40%] rounded-lg mb-12 pl-2'></input>

              {/* Select Dentist Type */}
              <select onChange={(e) => setDentistType(e.target.value)} className='w-[35%] h-8 fourkay:w-[40%] rounded-lg mb-12' >
                <option value="" disabled selected >Select Dentist Type</option>
                <option value="orthodontist" >Orthodontist</option>
                <option value="surgeon" >Oral Surgeon</option>
                <option value="general" >General Cleaning</option>
              </select>

                {/* Select Dentist (+ an invisible field to keep the structure) */}
                <select className='w-[35%] fourkay:w-[40%] h-8 invisible mb-12'></select>
                <select onChange={(e) => setDentistName(e.target.value)} className='w-[35%] fourkay:w-[40%] h-8 rounded-lg mb-12'>
                  <option value="" disabled selected >Select Dentist Name</option>
                </select>

                <div id="picked-date" className='w-[35%] h-8 fourkay:w-[40%] bg-white flex flex-row rounded-lg' >
                  <p className='w-5/6 h-full'>{date}</p>
                  <button  onClick={toggleCalendar} className='w-1/6 h-full hover:bg-[#587354] flex justify-center items-center'><img src={IconCalendar} className='w-[60%] h-auto'></img></button>
                </div>

                <input onChange={(e) => setTime(e.target.value)} placeholder='HH:MM' className='w-[35%] h-8 fourkay:w-[40%] rounded-lg pl-2' ></input>

                <div id="calender-header" className={`flex flex-row flex-wrap content-start w-[250px] h-[190px] mt-2 border-2 border-black rounded-md overflow-hidden ${calendarOpen ? '' : 'invisible'}`} >
                  <div className='flex flex-row w-full h-[15%] justify-between'>
                    <button onClick={prevMonth} className='w-1/6 h-full font-black bg-g hover:bg-[#587354]'>&lt;</button>
                    <p id="month" className='w-3/6 h-full pt-1'>{MONTHS[currMonth]} {currYear}</p>
                    <button onClick={nextMonth} className='w-1/6 h-full font-black bg-g hover:bg-[#587354]'>&gt;</button>
                  </div>
                  
                  <table className='w-full h-85%'>
                    <thead>
                      <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                      </tr>
                    </thead>
                    <tbody id="calendar">

                    </tbody>
                  </table>
                </div>

                <select className='w-[35%] h-8 invisible'></select>

                
                {/* <select className='w-[100%] h-8 invisible mb-12'></select> */}
                <div className='w-4/5 h-1/3 flex flex-col items-center min-h-0'>
                  <p className='text-3xl text-white font-semibold p-1'>Purpose of Visit</p>
                  <textarea onChange={(e) => setPurpose(e.target.value)} className='w-full h-full rounded-xl pl-2 pt-2 min-h-0'></textarea>
                </div>
              </div>

              {/* This is the Schedule Button */}
              <button onClick={Schedule} className='w-[14vw] h-[7vh] bg-g hover:bg-[#587354] rounded-xl mb-12 mt-4 text-white font-bold text-3xl'>Schedule</button>
        </div>
      </>
    )
  }
  export default RequestAppt;
  