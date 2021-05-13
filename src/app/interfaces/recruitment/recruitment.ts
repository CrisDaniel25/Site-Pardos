import { IPositions } from '../positions/positions';

export interface IRecruitment {
    recruitmentId: number,
    name: string,
    lastname: string,
    phone_number: string,
    email: string,
    weight: number,
    height: number,
    identification_card: string,
    positions: IPositions,
    certificate_path: string,
    registration_date: Date
}