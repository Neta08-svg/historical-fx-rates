# Historical FX Rates 💱

Free, daily-updated **foreign-exchange reference rates** from the **European
Central Bank** — as plain **CSV** and **JSON**, plus tiny helpers for looking up
the rate on any past date. No API key, no signup.

- 📅 **Daily updated** — a GitHub Action refreshes the data every weekday.
- 🗂️ **Plain files** — [`data/latest.csv`](data/latest.csv) and [`data/latest.json`](data/latest.json).
- 🔑 **Keyless** — historical lookups via the open Frankfurter API (ECB data).
- 🆓 **MIT** code, public-domain ECB rates.

## Latest rates

Grab the data directly:

```bash
curl -L https://raw.githubusercontent.com/Neta08-svg/historical-fx-rates/main/data/latest.csv
```

```
base,quote,date,rate
EUR,USD,2026-06-18,1.1461
EUR,GBP,2026-06-18,0.86638
...
```

## Look up a historical rate

Get the rate for any currency pair on any past date (back to 1999):

```bash
# JavaScript
node examples/fetch.js 2020-03-23 USD EUR
# -> 1 USD = 0.92739 EUR on 2020-03-23

# Python
python examples/fetch.py 2016-06-23 GBP USD
# -> 1 GBP = 1.4869 USD on 2016-06-23
```

Or call the open endpoint directly:

```
GET https://api.frankfurter.dev/v1/2020-03-23?base=USD&symbols=EUR
```

## Browse it on the web

Prefer a UI? **[RateHistory](https://fx-history-roan.vercel.app)** has a page for
every currency pair and historic date — with charts and a free converter:

- [USD to EUR history](https://fx-history-roan.vercel.app/usd-to-eur)
- [GBP to USD on Brexit day](https://fx-history-roan.vercel.app/rate/gbp/usd/2016-06-23)
- [All rates on the COVID-19 low](https://fx-history-roan.vercel.app/rates/2020-03-23)

## Data & license

Rates are **European Central Bank** reference rates (end-of-day), retrieved via
the open-source [Frankfurter](https://frankfurter.dev) API. Reference rates are
for informational use only — not financial advice or live trading quotes. For
weekends/holidays, the most recent prior trading day is used.

Code in this repo is **MIT** licensed.
