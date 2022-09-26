import { BadRequestError } from "../errors";
import validator from "validator";
import todoConfig from "../../configs/todoConfig.json";

export default function validateDescription(description: string): string {
  description = description.trim();
  if (description === "undefined") {
    description = "";
  }

  if (
    !validator.isLength(description, {
      max: todoConfig.TODO_DESCRIPTION_MAX_LENGTH,
    })
  ) {
    throw new BadRequestError(
      `${todoConfig.TODO_DESCRIPTION_MAX_LENGTH} is the maximum allowed for (todos') description.`
    );
  }

  return description;
}
