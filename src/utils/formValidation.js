export function minLenghtValidation(inputData, minLength) {
  if (inputData?.length >= minLength) {
    return true;
  } else {
    return false;
  }
}

export function isNumberValidation(inputData) {
  const isNumber = /^\d+$/;
  const resultValidation = isNumber.test(inputData);
  if (resultValidation) {
    return true;
  } else {
    return false;
  }
}

export function emailValidation(inputData) {
  const emailValid =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
  const resultValidation = emailValid.test(inputData);
  if (resultValidation) {
    return true;
  } else {
    return false;
  }
}

export function isPhoneNumberValidation(inputData) {
  const isPhoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
  const resultValidation = isPhoneNumber.test(inputData);
  if (resultValidation) {
    return true;
  } else {
    return false;
  }
}

export function inputValidationStyle(e, addOrRemove, className) {
  if (addOrRemove === 'add') {
    return e.target.classList.add(`form-validation-${className}`);
  } else if (addOrRemove === 'remove') {
    return e.target.classList.remove(`form-validation-${className}`);
  } else {
    console.error(`${addOrRemove} in input.${e.target.name} is an invalid parameter`);
  }
}
