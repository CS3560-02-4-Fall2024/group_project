import { getAuthToken, getUser } from "./auth";
import { baseUrl } from "./constants";
import { userType } from "./types";

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