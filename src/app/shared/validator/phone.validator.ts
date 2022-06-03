export const phoneValidator = (phone: string|void) => {
    const phoneLength = 10;


    if (!phone) {
      return true;
    } else if (isNaN(Number(phone))) {
        return true;
    } else if (phone.toString().length !== phoneLength) {
      return true;
    } else {
      return false;
    }
};
