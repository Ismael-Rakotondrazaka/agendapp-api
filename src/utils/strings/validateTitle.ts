import { BadRequestError } from "../errors";
import validator from "validator";
import eventConfig from "../../configs/eventConfig.json";

export default function validateTitle(title: string): string {
  title = title.trim();

  if (
    !validator.isLength(title, {
      min: eventConfig.EVENT_TITLE_MIN_LENGTH,
    })
  ) {
    throw new BadRequestError(
      `${eventConfig.EVENT_TITLE_MIN_LENGTH} is the minimum allowed for events' title.`
    );
  }

  if (
    !validator.isLength(title, {
      max: eventConfig.EVENT_TITLE_MAX_LENGTH,
    })
  ) {
    throw new BadRequestError(
      `${eventConfig.EVENT_TITLE_MAX_LENGTH} is the maximum allowed for events' title.`
    );
  }

  return title;
}
