import { getAuthToken } from "./auth";
import { baseUrl } from "./constants";
import { Availability } from "./types";

export function getAvailability(dentistId: number): Promise<Availability[]> {
    return fetch(`${baseUrl}/availability/${dentistId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        }
    })
    .then((res: Response) => res.json());
}