import { baseUrl } from "./constants";

export function signIn(userType: 'dentist' | 'patient', email: string, password: string): Promise<boolean> {
    return fetch(`${baseUrl}/auth/${userType}/login`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then((value: Response) => value.json())
    .then((value: any) => {
        localStorage.setItem('authToken', value.authToken);
        localStorage.setItem('user', JSON.stringify(value.user));
        return true;
    })
    .catch((err) => {
        return false;
    })
}

export function isSignedIn(): boolean {
    if (localStorage.getItem('authToken')) return true;
    return false;
}

export function logOut(): void {
    localStorage.setItem('authToken', '');
    localStorage.setItem('user', '');
}

export function getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '');
}