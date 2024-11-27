import {ResultSetHeader, RowDataPacket} from 'mysql2';
import {connection as db} from '../db';

export interface Availability extends RowDataPacket {
    availabilityID: number;
    appointmentID: number;
    patientID: number;
    dentistID: number;
    date: Date;
    timeSlot: string;
    isBooked: boolean;
}

export class AvailabilityView {
    appointmentID: number;
    patientID: number;
    dentistID: number;
    date: Date;
    timeSlot: string;
    isBooked: boolean;

    constructor(availability: Availability) {
        this.date = availability.date;
        this.timeSlot = availability.timeSlot;
        this.isBooked = availability.isBooked;
    }
}

export abstract class AvailabilityTable {
    static insert(availability: Availability): Promise<Availability> {
        return new Promise((resolve, reject) => {
            db.query<ResultSetHeader>(
                `
INSERT INTO availability (date, timeSlot, isBooked) 
VALUES (?,?,?);
`,
                [
                    availability.date,
                    availability.timeSlot,
                    availability.isBooked
                ],
                (err, res) => {
                    if (err) reject(err);
                    else
                        this.getById(res.insertId)
                            .then((availability: Availability) => resolve(availability!))
                            .catch(reject);
                },
            );
        });
    }

    static getById(availabilityID: number): Promise<Availability> {
        return new Promise<Availability>((resolve, reject) => {
            db.query<Availability[]>(
                'SELECT * FROM availability WHERE availabilityID = ?',
                [availabilityID],
                (err, res) => {
                    if (err) reject(err);
                    else if (res.length == 0) reject('availability not found');
                    else resolve(res?.[0]);
                },
            );
        });
    }

    static getByAppointmentID(appointmentID: number): Promise<Availability> {
        return new Promise<Availability>((resolve, reject) => {
            db.query<Availability[]>(
                'SELECT * FROM availability WHERE appointmentID = ?',
                [appointmentID],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

    static getByPatientId(patientID: number): Promise<Availability> {
        return new Promise<Availability>((resolve, reject) => {
            db.query<Availability[]>(
                'SELECT * FROM availability WHERE patientID = ?',
                [patientID],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

    static getByDentistID(dentistID: number): Promise<Availability> {
        return new Promise<Availability>((resolve, reject) => {
            db.query<Availability[]>(
                'SELECT * FROM availability WHERE dentistID = ?',
                [dentistID],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }
}