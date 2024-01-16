export default function formatLineChartData(
  arr: [number, number][]
) {
  const formattedData = arr.map(([date, value]) => ({
    x: new Date(date),
    y: value,
  }));

  return formattedData;
}
