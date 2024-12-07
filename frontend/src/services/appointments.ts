import { getAuthToken, getUser } from "./auth";
import { baseUrl } from "./constants";
import { Appointment, userType } from "./types";

export function getAppointments(userType: userType): Promise<any[]> {
    return fetch(`${baseUrl}/${userType}/appointments`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        },
    })
    .then((res: Response) => res.json())
}

export function cancelAppointment(appointmentId: number): Promise<boolean> {
    return fetch(`${baseUrl}/appointment/${appointmentId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        },
    })
    .then((res: Response) => res.json())
    .catch((err) => false);
}

export function bookAppointment(appointment: Appointment): Promise<any> {
    console.log('attempted', appointment);
    
    return fetch(`${baseUrl}/appointment`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + getAuthToken(),
        },
        body: JSON.stringify(appointment),
    })
    .then((response) => response.json())
}