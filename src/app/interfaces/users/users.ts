import { IRol } from '../rol/rol';

export interface IUsers {
    userId: number,
    name: string,
    lastname: string,
    username: string,
    passcode: string,
    registration_date: Date,
    rol: IRol
}