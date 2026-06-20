#!/usr/bin/env node
// RateHistory MCP server — exposes the live HTTP API as MCP tools so agents
// (Claude, Cursor, …) can fetch historical FX rates natively. Thin wrapper:
// each tool just calls the existing /api/v1 endpoint and returns the JSON.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const BASE = process.env.RATEHISTORY_BASE || "https://fx.wrapper-agency.com";

const server = new McpServer({ name: "ratehistory", version: "1.0.0" });

server.registerTool(
  "get_rate",
  {
    description:
      "Historical foreign-exchange rate for a currency pair on a given past date (ECB reference rates). Returns JSON.",
    inputSchema: {
      from: z.string().describe("Base currency, ISO 4217 (e.g. USD)"),
      to: z.string().describe("Quote currency, ISO 4217 (e.g. EUR)"),
      date: z.string().describe("Date YYYY-MM-DD (a past market day)"),
    },
  },
  async ({ from, to, date }) => {
    const url = `${BASE}/api/v1/rate?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
    const r = await fetch(url);
    return { content: [{ type: "text", text: await r.text() }] };
  }
);

server.registerTool(
  "get_timeseries",
  {
    description:
      "Daily exchange-rate time series for a currency pair between two dates (ECB). Returns JSON.",
    inputSchema: {
      from: z.string().describe("Base currency, ISO 4217"),
      to: z.string().describe("Quote currency, ISO 4217"),
      start: z.string().describe("Start date YYYY-MM-DD"),
      end: z.string().describe("End date YYYY-MM-DD"),
    },
  },
  async ({ from, to, start, end }) => {
    const url = `${BASE}/api/v1/timeseries?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`;
    const r = await fetch(url);
    return { content: [{ type: "text", text: await r.text() }] };
  }
);

await server.connect(new StdioServerTransport());
