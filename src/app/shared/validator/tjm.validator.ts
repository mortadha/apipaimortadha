export const tjmValidator = (tjm) => {
    const tjmMinValue = 1;
    if (!tjm) {
      return true;
    } else if (tjm < tjmMinValue) {
      return true;
    } else if (tjm.toString().indexOf('.') !== -1 ) {
      return true;
    } else {
      return false;
    }
};
