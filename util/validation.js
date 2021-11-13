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

function checkUserValidation(email, password, name, street, postalcode, city) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 8 &&
    name &&
    !name.trim("") &&
    street &&
    !street.trim("") &&
    postalcode &&
    postalcode.trim().lenght === 5 &&
    city &&
    !city.trim("")
  );
}

function emailsIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  checkUserValidation: checkUserValidation,
  emailsIsConfirmed: emailsIsConfirmed,
};
