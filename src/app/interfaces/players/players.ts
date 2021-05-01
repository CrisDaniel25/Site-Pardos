import { IPositions } from '../positions/positions';

export interface IPlayers {
    playerId: number,
    name: string,
    lastname: string,
    number: number,
    weight: number,
    height: number,
    active: boolean,
    captain: boolean,
    positions: IPositions,
    profile_picture_path: string,
    description: string,
    registration_date: Date
}