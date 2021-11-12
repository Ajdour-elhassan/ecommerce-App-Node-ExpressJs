// set varialble without  an empty value
function isEmpty(value) {
  return !value && value.trim() === "";
}

// Set another function for email & password
function userCredentials(email, password) {
  return (
    email && email.includes("@") && password && password.trim().length >= 8
  );
}

function checkUserValidation(email, password, name, street, postal, city) {
  const useIsValid =
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 8 &&
    name &&
    !name.trim("") &&
    street &&
    !street.trim("") &&
    postal &&
    postal.trim().lenght === 5 &&
    city &&
    !city.trim("");

  if (!useIsValid) {
    return;
  }

  return useIsValid;
}

module.exports = checkUserValidation;
