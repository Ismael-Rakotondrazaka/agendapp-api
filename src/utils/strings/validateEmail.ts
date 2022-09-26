import validator from "validator";
import { BadRequestError } from "../errors";

function validateEmail(email: string): string {
  email = email.trim();
  if (!validator.isEmail(email)) {
    throw new BadRequestError("Invalid email address");
  }

  return email;
}

export default validateEmail;
