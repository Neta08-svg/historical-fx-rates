// Get a historical exchange rate (ECB data, via Frankfurter — keyless, free).
// Usage: node fetch.js 2020-03-23 USD EUR
const [, , date = "2020-03-23", from = "USD", to = "EUR"] = process.argv;

const res = await fetch(
  `https://api.frankfurter.dev/v1/${date}?base=${from}&symbols=${to}`
);
const data = await res.json();
console.log(`1 ${from} = ${data.rates[to]} ${to} on ${data.date}`);
