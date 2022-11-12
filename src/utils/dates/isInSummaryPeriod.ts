import isYesterday from "./isYesterday";
import eventConfig from "../../configs/eventConfig.json";

export default function isInSummaryPeriod(date: Date): boolean {
  const now = new Date();

  return (
    isYesterday(date) &&
    now.getHours() === 0 &&
    now.getMinutes() <= eventConfig.EVENT_SUMMARY_PERIOD_MINUTES
  );
}
