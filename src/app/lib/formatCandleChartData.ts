export default function formatCandleChartData(
  arr: number[][]
) {
  const formattedData = arr.map(([date, ...numbers]) => ({
    x: new Date(date),
    y: [...numbers],
  }));

  return formattedData ;
}
