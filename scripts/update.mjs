// Fetch the latest ECB reference rates (via Frankfurter, keyless) and write
// data/latest.json + data/latest.csv. Run daily by a GitHub Action.
import { writeFileSync } from "node:fs";

const API = "https://api.frankfurter.dev/v1/latest?base=EUR";

const res = await fetch(API);
if (!res.ok) {
  console.error("Failed to fetch rates:", res.status);
  process.exit(1);
}
const data = await res.json();
const { date, rates } = data;
const codes = Object.keys(rates).sort();

const json = {
  source: "European Central Bank (ECB) reference rates, via Frankfurter",
  base: "EUR",
  date,
  rates,
};
writeFileSync("data/latest.json", JSON.stringify(json, null, 2) + "\n");

const csv = [
  "base,quote,date,rate",
  ...codes.map((q) => `EUR,${q},${date},${rates[q]}`),
].join("\n");
writeFileSync("data/latest.csv", csv + "\n");

console.log(`Wrote ${codes.length} rates for ${date}`);
