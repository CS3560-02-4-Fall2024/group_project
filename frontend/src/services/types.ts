export type userType = 'dentist' | 'patient';

export type Dentist = {
    id: number,
    officeId: number,
    email: string,
    name: string,
    type: string,
}

export type Availability = {
    id: number,
    dentistId: number,
    timeSlot: string,
    status: string,
}

export type Appointment = {
    patientId: number,
    dentistId: number,
    timeSlot: string,
    purpose: string,
}