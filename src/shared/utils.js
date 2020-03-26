export const validator = (validators, value) => {
  let isValid = true;

  if (validators.isRequired) {
    isValid = isValid && value.trim() !== '';
  }
  if (validators.maxLength) {
    isValid = isValid && value.length <= validators.maxLength;
  }
  if (validators.minLength) {
    isValid = isValid && value.length >= validators.minLength;
  }
  if (validators.isEmail) {
    const emailRegEx = new RegExp(/^\S+@\S+\.\S+$/);
    isValid = emailRegEx.test(value);
  }
  return isValid;
};
