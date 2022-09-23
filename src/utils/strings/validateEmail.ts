import validator from "validator";
import { BadRequestError } from "../errors";

function validateEmail(firstName: string): boolean {
  if (!validator.isEmail(firstName)) {
    throw new BadRequestError("Invalid email address");
  }

  return true;
}

export default validateEmail;
