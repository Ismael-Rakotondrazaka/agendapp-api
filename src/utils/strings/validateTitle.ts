import { BadRequestError } from "../errors";
import validator from "validator";
import todoConfig from "../../configs/todoConfig.json";

export default function validateTitle(title: string): string {
  title = title.trim();

  if (
    !validator.isLength(title, {
      min: todoConfig.TODO_TITLE_MIN_LENGTH,
    })
  ) {
    throw new BadRequestError(
      `${todoConfig.TODO_TITLE_MIN_LENGTH} is the minimum allowed for (todos') title`
    );
  }

  if (
    !validator.isLength(title, {
      max: todoConfig.TODO_TITLE_MAX_LENGTH,
    })
  ) {
    throw new BadRequestError(
      `${todoConfig.TODO_TITLE_MAX_LENGTH} is the maximum allowed for (todos') title`
    );
  }

  return title;
}
