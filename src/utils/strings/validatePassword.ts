import validator from "validator";
import userConfig from "../../configs/userConfig.json";
import { BadRequestError } from "../errors";

function validatePassword(password: string): boolean {
  if (
    !validator.isLength(password, {
      min: userConfig.PASSWORD_LENGTH_MIN,
    })
  ) {
    throw new BadRequestError(
      `${userConfig.PASSWORD_LENGTH_MIN} is the minimum allowed length for the password.`
    );
  }

  return true;
}

export default validatePassword;
