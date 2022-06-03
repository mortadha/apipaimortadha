export const durationValidator = (duration: number|void, durationType) => {
    const durationMin = 1;
    if (!duration) {
      return true;
    } else if (duration < durationMin) {
      return true;
    } else if (duration.toString().indexOf('.') !== -1 ) {
      return true;
    } else {
      return false;
    }
};
