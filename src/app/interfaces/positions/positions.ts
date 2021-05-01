import { ITeam } from '../Team/team';

export interface IPositions {
    positionId: number,
    initial: string,
    fullname: string
    registration_date: Date
    team: ITeam
}