export default (date: Date): boolean => {
  const now: Date = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() ===
      new Date(now.getTime() - 24 * 60 * 60 * 1000).getMonth() &&
    date.getDate() === new Date(now.getTime() - 24 * 60 * 60 * 1000).getDate()
  );
};
