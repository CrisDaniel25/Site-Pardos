import { IPositions } from '../positions/positions';

export interface IPlayers {
    playerId: number,
    name: string,
    lastname: string,
    weight: number,
    height: number,
    positions: IPositions,
    profile_picture: string,
    description: string,
    registration_date: Date
}