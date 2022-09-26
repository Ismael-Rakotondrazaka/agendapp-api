import validator from "validator";
import userConfig from "../../configs/userConfig.json";
import { BadRequestError } from "../errors";

function validateFirstName(firstName: string): string {
  firstName = firstName.trim();
  if (!validator.isAlpha(firstName)) {
    throw new BadRequestError(
      "firstName contains non english alphabet characters"
    );
  }

  if (
    !validator.isLength(firstName, {
      min: userConfig.FIRST_NAME_LENGTH_MIN,
    })
  ) {
    throw new BadRequestError(
      `${userConfig.FIRST_NAME_LENGTH_MIN} is the minimum allowed length for firstName`
    );
  }

  if (
    !validator.isLength(firstName, {
      max: userConfig.FIRST_NAME_LENGTH_MAX,
    })
  ) {
    throw new BadRequestError(
      `${userConfig.FIRST_NAME_LENGTH_MAX} is the maximum allowed length for firstName`
    );
  }

  return firstName;
}

export default validateFirstName;
