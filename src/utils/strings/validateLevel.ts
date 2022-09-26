import { BadRequestError } from "../errors";
import todoConfig from "../../configs/todoConfig.json";

export default function validateLevel(level: string): string {
  if (level.length === 0 || level === "undefined") {
    return todoConfig.TODO_LEVEL_DEFAULT;
  } else if (todoConfig.TODO_LEVELS.includes(level)) {
    return level;
  } else {
    throw new BadRequestError(
      `Invalid todo level. todoConfig. Only ${todoConfig.TODO_LEVELS.map(
        (level) => `"${level}"`
      ).join(", ")} are allowed.`
    );
  }
}
