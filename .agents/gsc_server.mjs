#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, 'gsc-credentials.json');
const SITE_URL = process.env.GSC_SITE_URL || 'sc-domain:uzairkhatri.com';

let cachedToken = null;
let tokenExpiresAt = 0;

function createJwt(serviceAccountEmail, privateKey, scopes) {
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: serviceAccountEmail,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
  const unsignedToken = `${b64(header)}.${b64(claim)}`;
  
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  const signature = sign.sign(privateKey, 'base64url');

  return `${unsignedToken}.${signature}`;
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && tokenExpiresAt > now + 60) {
    return cachedToken;
  }

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(`GSC Credentials file not found at: ${CREDENTIALS_PATH}`);
  }

  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const jwt = createJwt(
    creds.client_email,
    creds.private_key,
    [
      'https://www.googleapis.com/auth/webmasters.readonly',
      'https://www.googleapis.com/auth/webmasters'
    ]
  );

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to fetch Google OAuth token: ${errText}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = now + (data.expires_in || 3600);
  return cachedToken;
}

const TOOLS = [
  {
    name: 'get_gsc_search_analytics',
    description: 'Query search traffic analytics (clicks, impressions, CTR, average position) for uzairkhatri.com from Google Search Console.',
    inputSchema: {
      type: 'object',
      properties: {
        startDate: {
          type: 'string',
          description: 'Start date in YYYY-MM-DD format (e.g. "2026-08-15"). Defaults to 28 days ago.'
        },
        endDate: {
          type: 'string',
          description: 'End date in YYYY-MM-DD format (e.g. "2026-09-12"). Defaults to 2 days ago (latest available GSC data).'
        },
        dimensions: {
          type: 'array',
          items: { type: 'string', enum: ['query', 'page', 'country', 'device'] },
          description: 'Dimensions to group by (e.g. ["query"] for keywords or ["page"] for URLs). Default is ["query"].'
        },
        rowLimit: {
          type: 'number',
          description: 'Maximum number of rows to return (1-500). Default is 25.'
        }
      }
    }
  },
  {
    name: 'inspect_gsc_url',
    description: 'Inspect a specific URL with Google Search Console URL Inspection API to check real-time indexing status, crawl status, mobile usability, and canonical URL.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'The full URL to inspect (e.g. "https://uzairkhatri.com/" or "https://uzairkhatri.com/sitemap.xml").'
        }
      },
      required: ['url']
    }
  },
  {
    name: 'get_gsc_sitemaps',
    description: 'List all submitted sitemaps in Google Search Console, including pending status, last downloaded date, warning count, and error count.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'submit_gsc_sitemap',
    description: 'Submit or re-submit a sitemap URL to Google Search Console.',
    inputSchema: {
      type: 'object',
      properties: {
        sitemapUrl: {
          type: 'string',
          description: 'The sitemap URL to submit. Defaults to "https://uzairkhatri.com/sitemap.xml".'
        }
      }
    }
  }
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

async function handleToolCall(name, args = {}) {
  const token = await getAccessToken();

  switch (name) {
    case 'get_gsc_search_analytics': {
      const now = new Date();
      const defaultEnd = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
      const defaultStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

      const body = {
        startDate: args.startDate || formatDate(defaultStart),
        endDate: args.endDate || formatDate(defaultEnd),
        dimensions: args.dimensions || ['query'],
        rowLimit: args.rowLimit || 25
      };

      const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`GSC API error (${res.status}): ${err}`);
      }

      const data = await res.json();
      return {
        property: SITE_URL,
        dateRange: { start: body.startDate, end: body.endDate },
        dimensions: body.dimensions,
        rows: (data.rows || []).map(r => ({
          keys: r.keys,
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: `${(r.ctr * 100).toFixed(2)}%`,
          position: r.position?.toFixed(1)
        })),
        totalRowsFound: (data.rows || []).length
      };
    }

    case 'inspect_gsc_url': {
      const inspectUrl = args.url;
      const url = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inspectionUrl: inspectUrl,
          siteUrl: SITE_URL
        })
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`URL Inspection error (${res.status}): ${err}`);
      }

      const data = await res.json();
      const ir = data.inspectionResult || {};
      const isr = ir.indexStatusResult || {};

      return {
        url: inspectUrl,
        verdict: isr.verdict || 'UNKNOWN',
        coverageState: isr.coverageState || 'Unknown',
        robotsTxtState: isr.robotsTxtState || 'Unknown',
        indexingState: isr.indexingState || 'Unknown',
        pageFetchState: isr.pageFetchState || 'Unknown',
        googleCanonical: isr.googleCanonical || null,
        userCanonical: isr.userCanonical || null,
        lastCrawlTime: isr.lastCrawlTime || null,
        crawledAs: isr.crawledAs || null,
        searchConsoleLink: ir.inspectionResultLink || null
      };
    }

    case 'get_gsc_sitemaps': {
      const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps`;
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Sitemaps fetch error (${res.status}): ${err}`);
      }

      const data = await res.json();
      return {
        property: SITE_URL,
        sitemaps: data.sitemap || []
      };
    }

    case 'submit_gsc_sitemap': {
      const sitemap = args.sitemapUrl || 'https://uzairkhatri.com/sitemap.xml';
      const url = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(sitemap)}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok && res.status !== 204) {
        const err = await res.text();
        throw new Error(`Sitemap submission error (${res.status}): ${err}`);
      }

      return {
        success: true,
        message: `Sitemap ${sitemap} successfully submitted to ${SITE_URL}.`,
        statusCode: res.status
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// Stdio JSON-RPC MCP Server Loop
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + '\n');
}

rl.on('line', async (line) => {
  if (!line.trim()) return;

  try {
    const req = JSON.parse(line);
    const { id, method, params } = req;

    if (method === 'initialize') {
      send({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: {
            name: 'google-search-console',
            version: '1.0.0'
          }
        }
      });
      return;
    }

    if (method === 'notifications/initialized') {
      return;
    }

    if (method === 'ping') {
      send({ jsonrpc: '2.0', id, result: {} });
      return;
    }

    if (method === 'tools/list') {
      send({
        jsonrpc: '2.0',
        id,
        result: { tools: TOOLS }
      });
      return;
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};
      try {
        const output = await handleToolCall(toolName, toolArgs);
        send({
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(output, null, 2)
              }
            ]
          }
        });
      } catch (err) {
        send({
          jsonrpc: '2.0',
          id,
          result: {
            isError: true,
            content: [
              {
                type: 'text',
                text: `Tool Error: ${err.message}`
              }
            ]
          }
        });
      }
      return;
    }

    if (id !== undefined) {
      send({
        jsonrpc: '2.0',
        id,
        error: {
          code: -32601,
          message: `Method not found: ${method}`
        }
      });
    }
  } catch (err) {
    // Malformed JSON
  }
});
