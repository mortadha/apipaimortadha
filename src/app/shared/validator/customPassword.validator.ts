import { FormControl } from '@angular/forms';
import { environment } from '@env/environment';

export function ValidatePasswordCustom(form: FormControl) {

    const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})');

    // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
    // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
    // (?=.*[0-9])	The string must contain at least 1 numeric character
    // (?=.[!@#\$%\^&])	The string must contain at least one special character
    // (?=.{8,})	The string must be eight characters or longer

  // need to exit if the value is null unless it will break
  if (form.value === null) {
    return {
      ValidatePassword : {
        valid : false
      }
    };
  }

  if (!mediumRegex.test(form.value) && form.value.length as string) {
    return {
        ValidatePassword : {
        valid : false
      }
    };
  }
}
