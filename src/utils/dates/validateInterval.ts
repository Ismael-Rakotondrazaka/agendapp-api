import todoConfig from "../../configs/todoConfig.json";
import roundDateTo from "./roundDateTo";
import { BadRequestError } from "../errors";

export default function validateInterval(
  start: Date | string | number,
  end: Date | string | number
): {
  start: Date;
  end: Date;
} {
  const startDate = roundDateTo(start, todoConfig.TODO_INTERVAL_MINUTES);
  const endDate = roundDateTo(end, todoConfig.TODO_INTERVAL_MINUTES);

  const diff = endDate.getTime() - startDate.getTime(); // ms
  const intervalToReferMs = todoConfig.TODO_INTERVAL_MINUTES * 60 * 1000;
  // check if interval is less than default minimum interval
  if (diff < intervalToReferMs) {
    throw new BadRequestError(
      `Invalid interval. ${todoConfig.TODO_INTERVAL_MINUTES}mn is the minimum interval allowed between startAt and endAt.`
    );
  }

  // check if terminals of the interval are on different days
  if (
    startDate.getFullYear() !== endDate.getFullYear() ||
    startDate.getMonth() !== endDate.getMonth() ||
    startDate.getDate() !== endDate.getDate()
  ) {
    throw new BadRequestError(
      "Invalid interval. startAt and endAt are on different days."
    );
  }

  return {
    start: startDate,
    end: endDate,
  };
}
