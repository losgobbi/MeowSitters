import { LoginAdditionalInfo } from './LoginAdditionalInfo';
import { Login } from './Login';
import { SitterCompany } from './SitterCompany';

export const PENDING: number = 0;
export const FORWARDED: number = 1;
export const CANCELED: number = 2;
export const CONFIRMED: number = 3;
export const REQUEST_CANCEL: number = 4;
export const WAITING_INFO: number = 5;
export const INFO_DONE: number = 6;
export const NOT_DONE: number = 7;
export const DONE: number = 8;

export interface Schedule {
    id? : string,
    createDate?: Date,
    travelDate? : Array<Date>,
    returnDate? : Date
    status? : number, // 0: pending, 1: encaminhado, 2:cancelado, 3:confirmado, 4:realizado
    company? : SitterCompany, //target company for this schedule
    client? : Login,
    sitter? : Login,
    howToReturnKey? : String
    scheduleValue? : number,
}
