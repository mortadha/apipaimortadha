export const passwordValidator = (password: string|void) => {
  const mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})');

  // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
  // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
  // (?=.*[0-9])	The string must contain at least 1 numeric character
  // (?=.[!@#\$%\^&])	The string must contain at least one special character
  // (?=.{8,})	The string must be eight characters or longer

  let strongEnough = true;

  if (typeof(password) === 'string') {
    strongEnough = mediumRegex.test(password);
  } else {
    strongEnough = false;
  }
  if (!password || password === '') {
    return true;
  } else if (!strongEnough) {
    return true;
  } else {
    return false;
  }
};
