import { useState, useEffect } from "react";

import { getDentist } from "../services/dentist";
import { cancelAppointment } from "../services/appointments";

export default function Appointment({ timeSlot, dentistId, purpose, id }) {
    const date = new Date(timeSlot);
    const [dentist, setDentist] = useState();

    useEffect(() => {
        getDentist(dentistId)
            .then((value) => setDentist(value))
            .catch((err) => console.log(err));
    }, [])

    const handleCancelAppointment = () => {
        cancelAppointment(id)
            .then((val) => {
                setDeleted((state) => state + val.deleted);
            })
            .catch((err) => console.log(err))
    };

    return (
        <div className="flex-flow rounded-xl mb-3 bg-g w-[100%] twelve:w-[80%]">
            <div className="pt-2 pl-3 text-white text-[.99vw]">
                <p className="font-bold">{date.toString()}</p>
                <p><b>Dentist: </b>{dentist && dentist.name}</p>
                <p>{purpose}</p>
            </div>
            <div className="flex justify-center">
                <button onClick={handleCancelAppointment} className="text-white hover:text-[#587354] rounded-lg font-bold text-[.92vw] mb-3">Cancel Appointment</button>
            </div>
        </div>
    )
}