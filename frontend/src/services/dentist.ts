import { getAuthToken } from "./auth";
import { baseUrl } from "./constants";
import { Dentist } from "./types";

export function getDentist(id: number): Promise<Dentist> {
    return fetch(`${baseUrl}/dentist/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        },
    })
    .then((res: Response) => res.json())
}

export function getDentists(): Promise<Dentist[]> {
    return fetch(`${baseUrl}/dentist`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        },
    })
    .then((res: Response) => res.json())
}