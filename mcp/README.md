# RateHistory MCP server

Exposes the [RateHistory](https://fx.wrapper-agency.com) historical-FX API as MCP
tools so AI agents (Claude, Cursor, …) can fetch exchange rates natively.

## Tools
- `get_rate(from, to, date)` — ECB reference rate for a pair on a past date.
- `get_timeseries(from, to, start, end)` — daily series between two dates.

Data: European Central Bank reference rates. No API key needed for these endpoints.

## Run (stdio)
```bash
cd mcp && npm install && node server.mjs
```

## Use in an MCP client
Add to your client config, e.g.:
```json
{
  "mcpServers": {
    "ratehistory": { "command": "node", "args": ["/path/to/mcp/server.mjs"] }
  }
}
```
