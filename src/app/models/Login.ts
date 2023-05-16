import { BooleanValueAccessor } from '@ionic/angular';
import { LoginAdditionalInfo } from './LoginAdditionalInfo';
import { IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';

export interface Login {
    id?: string,
    name?: string
    login?: string,
    password?: string,
    type?: number, // 2: client, 1: employee sitter, 0: admin sitter
    activated?: boolean,
    info?: LoginAdditionalInfo,
    isRoleSitter?: boolean,
    isAdmin?: boolean,
    changePassword?: boolean;
    subscription?: IAPProduct,
    consent?: boolean
}