import { autoType, csvParseRows } from "d3-dsv";

export function parseCsv(text) {
  const [headers, ...rows] = csvParseRows(text.replace(/^\uFEFF/, ""));
  if (!headers || headers.some((name) => !name.trim())) {
    throw new Error("The CSV must have a header with column names.");
  }
  if (new Set(headers).size !== headers.length) {
    throw new Error("Column names must be unique.");
  }
  if (!rows.length) throw new Error("The CSV contains no data.");
  return rows.map((values, index) => {
    if (values.length !== headers.length) {
      throw new Error(`Record ${index + 1} does not have ${headers.length} fields.`);
    }
    return autoType(Object.fromEntries(headers.map((name, i) => [name, values[i]])));
  });
}
