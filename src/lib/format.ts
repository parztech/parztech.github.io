const dateFormatter = new Intl.DateTimeFormat("hy-AM", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(date: string) {
  return dateFormatter.format(new Date(date));
}

export function formatReadingTime(minutes: number) {
  return `${minutes} րոպե`;
}
