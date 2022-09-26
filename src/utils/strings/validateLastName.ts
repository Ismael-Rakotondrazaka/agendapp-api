import validator from "validator";
import userConfig from "../../configs/userConfig.json";
import { BadRequestError } from "../errors";

function validateLastName(lastName: string): string {
  lastName = lastName.trim();

  if (!validator.isAlpha(lastName)) {
    throw new BadRequestError(
      "lastName contains non english alphabet characters"
    );
  }

  if (
    !validator.isLength(lastName, {
      min: userConfig.LAST_NAME_LENGTH_MIN,
    })
  ) {
    throw new BadRequestError(
      `${userConfig.LAST_NAME_LENGTH_MIN} is the minimum allowed length for the last name`
    );
  }

  if (
    !validator.isLength(lastName, {
      max: userConfig.LAST_NAME_LENGTH_MAX,
    })
  ) {
    throw new BadRequestError(
      `${userConfig.LAST_NAME_LENGTH_MAX} is the maximum allowed length for the last name`
    );
  }

  return lastName;
}

export default validateLastName;
