import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {

 

  constructor() {
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
        'required': 'Required',
        'invalidEmailAddress': 'L\'adresse mail est incorrect',
        'invalidPassword': 'Mot de passe invalide. le mot de passe doit avoit en moins 6 caractères, et au moins 1 nombre.',
        'invalidConfPassword': 'Mot de passe différent.',
        'minlength': `Taille minimal ${validatorValue.requiredLength}`
    };

    return config[validatorName];
}


static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
    } else {
        return { 'invalidEmailAddress': true };
    }
}

static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        return null;
    } else {
        return { 'invalidPassword': true };
    }
}  
static confirmPasswordValidator(c) {
  if(!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd= c.parent.get('confirmpass')

  if(!pwd || !cpwd) return null;
  if (pwd.value !== cpwd.value) {
    return { 'invalidConfPassword': true };

}
}
}