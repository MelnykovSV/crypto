export default function roundValue(value: number) {
  if (value >= 1) {
    return value.toFixed(2);
  } else if (value === 0) {
    return "0.0000";
  } else {
    const roundedValue = value.toFixed(3 - Math.floor(Math.log10(value)));

    return roundedValue;
  }
}
