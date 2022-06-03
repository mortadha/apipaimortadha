export const descriptionValidator = (description: string|void, maxLength: number = 400) => {

    if (description && description.length >= maxLength) {
      return true;
    } else {
      return false;
    }
};
