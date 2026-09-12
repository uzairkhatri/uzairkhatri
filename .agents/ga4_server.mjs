#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, 'ga-credentials.json');
const PROPERTY_ID = process.env.GA4_PROPERTY_ID || '553870935';

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
    throw new Error(`Credentials file not found at: ${CREDENTIALS_PATH}`);
  }

  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const jwt = createJwt(
    creds.client_email,
    creds.private_key,
    ['https://www.googleapis.com/auth/analytics.readonly']
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

async function runGA4Report(endpoint, body) {
  const token = await getAccessToken();
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:${endpoint}`;
  
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
    throw new Error(`GA4 API error (${res.status}): ${err}`);
  }

  return await res.json();
}

const TOOLS = [
  {
    name: 'get_ga4_realtime_users',
    description: 'Get real-time active users currently on uzairkhatri.com in the last 30 minutes, grouped by country and page path.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'get_ga4_traffic_overview',
    description: 'Get overall traffic metrics (active users, total page views, sessions, new users) for a specified date range.',
    inputSchema: {
      type: 'object',
      properties: {
        startDate: {
          type: 'string',
          description: 'Start date e.g. "7daysAgo", "30daysAgo", or "YYYY-MM-DD". Defaults to "7daysAgo".'
        },
        endDate: {
          type: 'string',
          description: 'End date e.g. "today", "yesterday", or "YYYY-MM-DD". Defaults to "today".'
        }
      }
    }
  },
  {
    name: 'get_ga4_top_pages',
    description: 'Get top viewed pages, screen pageviews, active users, and average engagement time per page.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Max number of pages to return. Default 10.'
        },
        startDate: {
          type: 'string',
          description: 'Start date e.g. "7daysAgo", "30daysAgo". Default "7daysAgo".'
        },
        endDate: {
          type: 'string',
          description: 'End date e.g. "today". Default "today".'
        }
      }
    }
  },
  {
    name: 'get_ga4_demographics',
    description: 'Get user breakdown by country, city, and device category.',
    inputSchema: {
      type: 'object',
      properties: {
        startDate: {
          type: 'string',
          description: 'Start date e.g. "7daysAgo", "30daysAgo". Default "7daysAgo".'
        },
        endDate: {
          type: 'string',
          description: 'End date e.g. "today". Default "today".'
        }
      }
    }
  }
];

async function handleToolCall(name, args = {}) {
  switch (name) {
    case 'get_ga4_realtime_users': {
      const result = await runGA4Report('runRealtimeReport', {
        metrics: [{ name: 'activeUsers' }],
        dimensions: [{ name: 'country' }, { name: 'unifiedScreenName' }]
      });
      const rows = result.rows || [];
      const total = rows.reduce((sum, r) => sum + parseInt(r.metricValues[0].value || '0', 10), 0);
      return {
        totalActiveUsers: total,
        breakdown: rows.map(r => ({
          country: r.dimensionValues[0]?.value || 'Unknown',
          page: r.dimensionValues[1]?.value || '/',
          activeUsers: parseInt(r.metricValues[0]?.value || '0', 10)
        }))
      };
    }

    case 'get_ga4_traffic_overview': {
      const startDate = args.startDate || '7daysAgo';
      const endDate = args.endDate || 'today';
      const result = await runGA4Report('runReport', {
        dateRanges: [{ startDate, endDate }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'newUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'userEngagementDuration' }
        ]
      });
      const row = result.rows?.[0];
      if (!row) {
        return { message: 'No traffic data recorded for this period.' };
      }
      return {
        period: `${startDate} to ${endDate}`,
        activeUsers: parseInt(row.metricValues[0]?.value || '0', 10),
        newUsers: parseInt(row.metricValues[1]?.value || '0', 10),
        sessions: parseInt(row.metricValues[2]?.value || '0', 10),
        screenPageViews: parseInt(row.metricValues[3]?.value || '0', 10),
        totalEngagementSeconds: parseInt(row.metricValues[4]?.value || '0', 10)
      };
    }

    case 'get_ga4_top_pages': {
      const limit = args.limit || 10;
      const startDate = args.startDate || '7daysAgo';
      const endDate = args.endDate || 'today';
      const result = await runGA4Report('runReport', {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'activeUsers' },
          { name: 'userEngagementDuration' }
        ],
        limit
      });
      const rows = result.rows || [];
      return rows.map(r => {
        const views = parseInt(r.metricValues[0]?.value || '0', 10);
        const users = parseInt(r.metricValues[1]?.value || '0', 10);
        const duration = parseInt(r.metricValues[2]?.value || '0', 10);
        return {
          path: r.dimensionValues[0]?.value || '/',
          title: r.dimensionValues[1]?.value || '',
          views,
          activeUsers: users,
          avgEngagementSeconds: users > 0 ? Math.round(duration / users) : 0
        };
      });
    }

    case 'get_ga4_demographics': {
      const startDate = args.startDate || '7daysAgo';
      const endDate = args.endDate || 'today';
      const result = await runGA4Report('runReport', {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'country' }, { name: 'city' }, { name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }]
      });
      const rows = result.rows || [];
      return rows.map(r => ({
        country: r.dimensionValues[0]?.value || 'Unknown',
        city: r.dimensionValues[1]?.value || 'Unknown',
        device: r.dimensionValues[2]?.value || 'Unknown',
        activeUsers: parseInt(r.metricValues[0]?.value || '0', 10),
        views: parseInt(r.metricValues[1]?.value || '0', 10)
      }));
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// MCP stdio JSON-RPC loop
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
          capabilities: {
            tools: {}
          },
          serverInfo: {
            name: 'google-analytics',
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
        result: {
          tools: TOOLS
        }
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

    // Unhandled method
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
  } catch (parseErr) {
    // Malformed JSON
  }
});
