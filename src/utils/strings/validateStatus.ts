import { BadRequestError } from "../errors";
import todoConfig from "../../configs/todoConfig.json";

export default function (status: string): string {
  status = status.trim();

  if (!todoConfig.TODO_STATUS.includes(status)) {
    throw new BadRequestError(
      `Invalid status. ${todoConfig.TODO_STATUS.map(
        (status) => `"${status}"`
      ).join(", ")} are allowed.`
    );
  }

  return status;
}
