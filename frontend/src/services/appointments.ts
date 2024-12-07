import { getAuthToken, getUser } from "./auth";
import { baseUrl } from "./constants";
import { userType } from "./types";

export function getAppointments(userType: userType): Promise<any[]> {
    const user = getUser();
    return fetch(`${baseUrl}/${userType}/appointments`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        },
    })
    .then((res: Response) => res.json())
}