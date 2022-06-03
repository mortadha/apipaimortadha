export const availabilityDateValidator = (date: Date|void, availabilityType: number) => {
    if (availabilityType === 0 && Date === null) {
      return true;
    } else {
      return false;
    }
};
