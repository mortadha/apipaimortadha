export const zipcodeValidator = (zipcode: number | null) => {
    if (!zipcode) {
      return true;
    } else if (zipcode < 0) {
      return true;
    } else if (zipcode.toString().length !== 5) {
      return true;
    } else if (zipcode.toString().indexOf('.') !== -1 ) {
      return true;
    } else {
      return false;
    }
};
