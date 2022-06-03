export const datesValidator = (date1: Date|void, date2: Date|void, presentPosition: boolean) => {
    const dateBegin = date1 ? new Date(date1) : undefined;
    const dateEnd = date2 ? new Date(date2) : undefined;

    if (presentPosition && date2 === undefined) {
      return false;
    } else if (date2 === undefined || date1 === undefined) {
      return true;
    }

    if (!presentPosition && dateBegin >= dateEnd) {
      return true;
    } else {
      return false;
    }
};
