import { getAuthToken } from "./auth";
import { baseUrl } from "./constants";

export function getDentist(id: number): Promise<any> {
    return fetch(`${baseUrl}/dentist/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getAuthToken(),
        },
    })
    .then((res: Response) => res.json())
}