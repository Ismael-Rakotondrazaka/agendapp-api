import { BadRequestError } from "../errors";
import validator from "validator";
import eventConfig from "../../configs/eventConfig.json";

export default function validateDescription(description: string): string {
  description = description.trim();
  if (description === "undefined") {
    description = "";
  }

  if (
    !validator.isLength(description, {
      max: eventConfig.EVENT_DESCRIPTION_MAX_LENGTH,
    })
  ) {
    throw new BadRequestError(
      `${eventConfig.EVENT_DESCRIPTION_MAX_LENGTH} is the maximum characters allowed for events' description.`
    );
  }

  return description;
}
