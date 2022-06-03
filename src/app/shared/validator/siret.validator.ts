export const siretValidator = (siret: number|void) => {
    const siretLength = 14;

    if (!siret) {
      return true;
    } else if (siret.toString().length !== siretLength) {
      return true;
    } else if (isNaN(Number(siret))) {
      return true;
    } else {
      return false;
    }
};
