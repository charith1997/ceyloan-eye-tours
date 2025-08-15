export function formatDuration(duration: string) {
  const numbers = duration?.match(/\d+/g);
  
  if (numbers && numbers.length >= 2) {
    const days = numbers[0];
    const nights = numbers[1];
    return `${days} Days | ${nights} Nights`;
  }
  
  return duration;
}