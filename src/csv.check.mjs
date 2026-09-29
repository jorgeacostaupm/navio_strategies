import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { parseCsv } from "./csv.js";

const sample = parseCsv(readFileSync(new URL("../public/examples/example.csv", import.meta.url), "utf8"));
assert.equal(sample.length, 5);
assert.equal(sample[0].age, 28);
assert.deepEqual(parseCsv('\uFEFFname,value\r\n"Ana, María",42\r\n'), [{ name: "Ana, María", value: 42 }]);
assert.equal(parseCsv('note\n"first\nsecond"')[0].note, "first\nsecond");
for (const invalid of ["", "name", "name,\na,b", "a,a\n1,2", "a,b\n1", "a,b\n1,2,3"]) {
  assert.throws(() => parseCsv(invalid));
}
console.log("CSV checks passed");
