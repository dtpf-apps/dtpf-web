export function minLenghtValidation(inputData: string, minLength: number) {
  if (inputData?.length >= minLength) {
    return true;
  } else {
    return false;
  }
}

export function isNumberValidation(inputData: string) {
  const isNumber = /^\d+$/;
  const resultValidation = isNumber.test(inputData);
  if (resultValidation) {
    return true;
  } else {
    return false;
  }
}

export function emailValidation(inputData: string) {
  const emailValid =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
  const resultValidation = emailValid.test(inputData);
  if (resultValidation) {
    return true;
  } else {
    return false;
  }
}

export function isPhoneNumberValidation(inputData: string) {
  const isPhoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g;
  const resultValidation = isPhoneNumber.test(inputData);
  if (resultValidation) {
    return true;
  } else {
    return false;
  }
}

export function inputValidationStyle(e: any, addOrRemove: 'add' | 'remove', className: string) {
  if (addOrRemove === 'add') {
    return e.target.classList.add(`form-validation-${className}`);
  } else if (addOrRemove === 'remove') {
    return e.target.classList.remove(`form-validation-${className}`);
  } else {
    console.error(`${addOrRemove} in input.${e.target.name} is an invalid parameter`);
  }
}
