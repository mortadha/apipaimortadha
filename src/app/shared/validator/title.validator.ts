export const titleValidator = (title: string|void) => {
    const titleMinLength = 5;

    if (!title) {
      return true;
    } else if (title.length < titleMinLength) {
      return true;
    } else {
      return false;
    }
};
