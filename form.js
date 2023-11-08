const form = document.getElementById("form");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/; // minimo 8 caracteres maximo 15 , al menos 1 mayuscula , 1 minuscula , 1 digito, no espacio en blanco ,  1 caracter especial
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const isEmpty = (value) => {
  value === "";
};

const isBetween = (length, min, max) => {
  length > min && length < max;
};

const isEmailValid = (email) => {
  return EMAIL_REGEX.test(email);
};

const isPasswordValid = (password) => {
  return PASSWORD_REGEX.test(password);
};

const isPhoneValid = (phone) => {
  return PHONE_REGEX.test(phone);
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const errorContainer = formField.querySelector("small");
  errorContainer.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  formField.classList.add("success");
  const successContainer = formField.querySelector("small");
  successContainer.textContent = "";
};

const checkUserName = () => {
  let valid = false;
  const min = 4;
  const max = 20;

  const userName = usernameInput.value.trim();
  if (isEmpty(userName)) {
    showError(usernameInput, "el nombre de usuario es obligatorio.");
  } else if (!isBetween(userName.length, min, max)) {
    showError(
      usernameInput,
      `el nombre debe tener entre ${min} y ${max} caracteres.`
    );
  } else {
    showSuccess(usernameInput);
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailInput.value.trim();
  if (isEmpty(email)) {
    showError(emailInput, "el email es obligatorio");
  } else if (!isEmailValid(email)) {
    showError(emailInput, "el email no es valido");
  } else {
    showSuccess(emailInput);
    valid = true;
  }
  return valid;
};

const checkPassword = () => {
  let valid = false;
  const password = passwordInput.value.trim();
  if (isEmpty(password)) {
    showError(passwordInput, "la contraseña es obligatoria");
  } else if (!isPasswordValid(password)) {
    showError(
      passwordInput,
      "la contraenia debe tener minimo 8 caracteres, una mayuscula, una minuscula y un simbolo"
    );
  } else {
    showSuccess(passwordInput);
    valid = true;
  }
  return valid;
};

const checkPhone = () => {
  let valid = false;
  const phone = phoneInput.value.trim();
  if (isEmpty(phone)) {
    showError(phoneInput, "el numero de telefono es obligatorio");
  } else if (!isPhoneValid(phone)) {
    showError(phoneInput, "el telefono es invalido");
  } else {
    showSuccess(phoneInput);
    valid = true;
  }
  return valid;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isUserNameValid = checkUserName();
  const isEmailValid = checkEmail();
  const isPasswordValid = checkPassword();
  const isPhoneValid = checkPhone();

  const isFormValid =
    isUserNameValid && isEmailValid && isPasswordValid && isPhoneValid;
  if (isFormValid) {
    form.submit();
  }
  console.log(isFormValid, "is form valid");
});
