import { Login } from './Login';

export interface SitterCompany {
    id? : string,
    name? : string,
    dailyValue? : number,
    isMinimalValue? : boolean,
    sitters? : Array<Login>,
    iconthumbURL? : String,
    visible? : Boolean, // modal-newSchedule uses this
    skills?: string,
    phoneNumber?: string,// represents the manager of the company
    allowList?: boolean
}
