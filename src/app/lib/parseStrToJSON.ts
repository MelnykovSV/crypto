export default function parseStrToJSON(str: string) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return false;
  }
}
