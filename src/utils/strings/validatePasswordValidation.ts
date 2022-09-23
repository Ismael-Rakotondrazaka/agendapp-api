import { BadRequestError } from "../errors";

function validatePasswordValidation(
  passwordValidation: string,
  password: string
) {
  if (passwordValidation !== password) {
    throw new BadRequestError("Different password validation and password");
  }
}

export default validatePasswordValidation;
