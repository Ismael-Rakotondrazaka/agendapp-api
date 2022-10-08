import { BadRequestError } from "../errors";
import eventConfig from "../../configs/eventConfig.json";

export default function (status: string): string {
  status = status.trim();

  if (!eventConfig.EVENT_STATUS.includes(status)) {
    throw new BadRequestError(
      `Invalid status. ${eventConfig.EVENT_STATUS.map(
        (status) => `"${status}"`
      ).join(", ")} are allowed.`
    );
  }

  return status;
}
