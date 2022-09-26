export default function roundDateTo(
  date: Date | string | number,
  minute = 15
): Date {
  const result = new Date(date);
  result.setSeconds(0);
  result.setMilliseconds(0);

  const newMinutes = Math.round(result.getMinutes() / minute) * minute; // get 0, 15, 30, 60
  const diff = newMinutes - result.getMinutes();
  const diffMilliSeconds = diff * 60 * 1000;

  result.setTime(result.getTime() + diffMilliSeconds);
  return result;
}
