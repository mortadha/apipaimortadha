export const nameValidator = (name: string|void, maxLength: number = -1) => {
    const nameLength = 2;

    if (!name || name === '') {
      return true;
    } else if (name.length < nameLength) {
      return true;
    } else if (maxLength !== -1 && name.length > maxLength) {
      return true;
    } else {
      return false;
    }
};
