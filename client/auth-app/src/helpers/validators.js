export const validatePasswords = (password, confirmPassword) => {
  if (
    password.trim().length < 6 ||
    !/[A-Za-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    return "Password must be at least 6 characters and include at least one letter and one number";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return false;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "Invalid email format";
  }
  return false;
};

export const validateName = (name) => {
  if (typeof name !== "string" || name.trim().length === 0) {
    return "Name cannot be empty";
  }
  return false;
};

export const validateRegisterForm = (form) => {
  const errors = {};
  const username = String(form.get("name"));
  const email = String(form.get("email"));
  const password = String(form.get("password"));
  const confirmPassword = String(form.get("confirm"));

  const validationPasswordError = validatePasswords(password, confirmPassword);
  if (validationPasswordError) {
    errors.password = validationPasswordError;
  }

  const validationEmailError = validateEmail(email);
  if (validationEmailError) {
    errors.email = validationEmailError;
  }

  const validationNameError = validateName(username);
  if (validationNameError) {
    errors.name = validationNameError;
  }

  return errors;
};
