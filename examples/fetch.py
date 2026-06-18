"""Get a historical exchange rate (ECB data, via Frankfurter — keyless, free).

Usage: python fetch.py 2020-03-23 USD EUR
"""
import sys
import urllib.request
import json

date = sys.argv[1] if len(sys.argv) > 1 else "2020-03-23"
frm = sys.argv[2] if len(sys.argv) > 2 else "USD"
to = sys.argv[3] if len(sys.argv) > 3 else "EUR"

url = f"https://api.frankfurter.dev/v1/{date}?base={frm}&symbols={to}"
with urllib.request.urlopen(url) as r:
    data = json.load(r)

print(f"1 {frm} = {data['rates'][to]} {to} on {data['date']}")
