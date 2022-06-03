import { FormControl } from '@angular/forms';
import { environment } from '@env/environment';

export function ValidateMailCustom(c: FormControl) {
  // need to exit if the value is null unless it will break
  if (c.value === null) {
    return {
      ValidateMail : {
        valid : false
      }
    };
  }

  if (!c.value.includes('@') || !c.value.includes('.')) {
    return {
      ValidateMail : {
        valid : false
      }
    };
  }

  for (let i = 0; i < environment.bannedemail.length; i++) {
    if (c.value.includes(environment.bannedemail[i])) {
      return {
        ValidateMail : {
          valid : false
        }
      };
    } else {
      return null;
    }
  }
}
