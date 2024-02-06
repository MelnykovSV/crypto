export default function roundPrice(price: number) {
  const rounderPrice = price.toFixed(
    1 - Math.floor(Math.log(price) / Math.log(10))
  );

  return rounderPrice;
}
