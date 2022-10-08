import { BadRequestError } from "../errors";
import eventConfig from "../../configs/eventConfig.json";

export default function validateLevel(level: string): string {
  if (level.length === 0 || level === "undefined") {
    return eventConfig.EVENT_LEVEL_DEFAULT;
  } else if (eventConfig.EVENT_LEVELS.includes(level)) {
    return level;
  } else {
    throw new BadRequestError(
      `Invalid event level. eventConfig. Only ${eventConfig.EVENT_LEVELS.map(
        (level) => `"${level}"`
      ).join(", ")} are allowed.`
    );
  }
}
