import { environment } from '@env/environment';

export const emailValidator = (email: string|void, banYopmail: boolean) => {
    const emailMinLength = 5;
    const bannedemail = environment.bannedemail;
    if (!email) {
      return true;
    }  else if (email.length < emailMinLength) {
          return true;
    } else if (!email.includes('@') && !email.includes('.')) {
      return true;
    } else if (banYopmail) {
      for (let i = 0; i < bannedemail.length; i++) {
        if (email.includes(bannedemail[i])) {
            return true;
        }
      }
    } else {
      return false;
    }
};
