export function formatDuration(duration: string) {
  const numbers = duration?.match(/\d+/g);

  if (numbers && numbers.length >= 2) {
    const days = numbers[0];
    const nights = numbers[1];
    return `${days} Days | ${nights} Nights`;
  }

  return "0 Days | 0 Nights";
}

export function checkIfSortedOrder(data: any[]) {
  let filteredData = [];
  filteredData = data.filter(
    (item) =>
      (item.day_no === null || item.day_no === "") &&
      (item.sort_order === null || item.sort_order === "")
  );
  if (filteredData.length > 0) {
    return false;
  }
  return true;
}
