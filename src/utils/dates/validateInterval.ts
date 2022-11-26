import eventConfig from "../../configs/eventConfig.json";
import roundDateTo from "./roundDateTo";
import { BadRequestError } from "../errors";

export default function validateInterval(
  start: Date | string | number,
  end: Date | string | number,
  timezoneOffset: number
): {
  start: Date;
  end: Date;
} {
  // round them
  const startDate = roundDateTo(start, eventConfig.EVENT_INTERVAL_MINUTES);
  const endDate = roundDateTo(end, eventConfig.EVENT_INTERVAL_MINUTES);

  if (endDate.getTime() <= startDate.getTime()) {
    throw new BadRequestError(
      "Invalid interval. startAt must be before endAt."
    );
  }

  const diff = endDate.getTime() - startDate.getTime(); // ms
  const intervalToReferMs = eventConfig.EVENT_INTERVAL_MINUTES * 60 * 1000;
  // check if interval is less than default minimum interval
  if (diff < intervalToReferMs) {
    throw new BadRequestError(
      `Invalid interval. ${eventConfig.EVENT_INTERVAL_MINUTES}mn is the minimum interval allowed.`
    );
  }

  // turn the utc date into Date
  const startUTC = new Date(
    startDate.getUTCFullYear(),
    startDate.getUTCMonth(),
    startDate.getUTCDate(),
    startDate.getUTCHours(),
    startDate.getUTCMinutes()
  );
  const endUTC = new Date(
    endDate.getUTCFullYear(),
    endDate.getUTCMonth(),
    endDate.getUTCDate(),
    endDate.getUTCHours(),
    endDate.getUTCMinutes()
  );

  // dates that mimic the user local dates
  const startRelatif = new Date(
    startUTC.getTime() - timezoneOffset * 60 * 1000
  );
  const endRelatif = new Date(endUTC.getTime() - timezoneOffset * 60 * 1000);

  // check if terminals of the interval are on different days
  if (
    startRelatif.getFullYear() !== endRelatif.getFullYear() ||
    startRelatif.getMonth() !== endRelatif.getMonth() ||
    startRelatif.getDate() !== endRelatif.getDate()
  ) {
    if (startRelatif.getHours() !== 0 && endRelatif.getHours() !== 0) {
      throw new BadRequestError(
        "Invalid interval. startAt and endAt are on different days."
      );
    }
  }

  // return the rounded dates
  return {
    start: startDate,
    end: endDate,
  };
}
