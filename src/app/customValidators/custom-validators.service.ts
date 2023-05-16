import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable()
export class CustomValidatorsService {
  checkIfPasswordIsTheSame(password: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && control.value != password) {
            return { 'notEqual': true };
        }
        return null;
    };    
  }  

 patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
  
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }
}
  