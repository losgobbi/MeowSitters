import { Addr } from './Addr';
import { Cat } from './Cat';
import { Login } from './Login';
import { SitterCompany } from './SitterCompany';

export interface LoginAdditionalInfo {
    addr? : Addr,
    cats? : Array<Cat> // only for users other than sitters
    company?: SitterCompany, // only for sitters
}
