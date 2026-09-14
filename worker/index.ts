export interface Env {
  ASSETS: {
    fetch: typeof fetch;
  };
  EMAIL: {
    send: (message: {
      to: string;
      from: string;
      subject: string;
      text: string;
      html?: string;
      replyTo?: string;
    }) => Promise<{ messageId: string }>;
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Instant /book shortlink redirect to Calendly booking calendar
    if (url.pathname === "/book" || url.pathname === "/book/") {
      return Response.redirect("https://calendly.com/uz-khatri/30min", 302);
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const body = (await request.json()) as {
          name?: string;
          email?: string;
          message?: string;
          stage?: string;
          _gotcha?: string;
        };

        // Anti-bot honeypot check: If filled, return fake success silently
        if (body._gotcha) {
          return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" },
          });
        }

        const name = (body.name || "").trim().slice(0, 100);
        const email = (body.email || "").trim().slice(0, 100);
        let rawMessage = (body.message || "").trim().slice(0, 3000);
        let stage = (body.stage || "").trim().slice(0, 50);

        if (!name || !email || !rawMessage) {
          return new Response(
            JSON.stringify({ error: "Name, email, and message are required." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        // Parse project stage if embedded in message
        const stageMatch = rawMessage.match(/^\[Project Stage:\s*([^\]]+)\]\s*/i);
        if (stageMatch) {
          if (!stage) stage = stageMatch[1].trim();
          rawMessage = rawMessage.replace(stageMatch[0], "").trim();
        }
        if (!stage) stage = "Prototype";

        const nowFormatted = new Date().toUTCString();

        // High-contrast, executive branded HTML email
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Architecture Inquiry from ${escapeHtml(name)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0d0e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0b0d0e; padding: 36px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 620px; background-color: #131618; border: 1px solid rgba(216, 173, 100, 0.28); border-radius: 12px; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.6);">
          
          <!-- Gold Accent Top Bar -->
          <tr>
            <td style="background: linear-gradient(90deg, #c59b53, #d8ad64, #c59b53); height: 4px;"></td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px 20px 32px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <span style="display: inline-block; font-family: 'SF Mono', Consolas, Monaco, monospace; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #d8ad64; margin-bottom: 8px;">UZAIRKHATRI.COM &bull; ARCHITECTURE DISPATCH</span>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; line-height: 1.25;">New Architecture Inquiry</h1>
            </td>
          </tr>

          <!-- Sender Details Table -->
          <tr>
            <td style="padding: 24px 32px 16px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td width="130" style="padding: 9px 0; font-size: 12px; color: #8e9594; text-transform: uppercase; font-family: 'SF Mono', Consolas, monospace; font-weight: 700; letter-spacing: 0.06em;">Client Name</td>
                  <td style="padding: 9px 0; font-size: 15px; color: #ffffff; font-weight: 600;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td width="130" style="padding: 9px 0; font-size: 12px; color: #8e9594; text-transform: uppercase; font-family: 'SF Mono', Consolas, monospace; font-weight: 700; letter-spacing: 0.06em;">Client Email</td>
                  <td style="padding: 9px 0; font-size: 15px; color: #d8ad64; font-weight: 600;">
                    <a href="mailto:${escapeHtml(email)}" style="color: #d8ad64; text-decoration: none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                <tr>
                  <td width="130" style="padding: 9px 0; font-size: 12px; color: #8e9594; text-transform: uppercase; font-family: 'SF Mono', Consolas, monospace; font-weight: 700; letter-spacing: 0.06em;">Project Stage</td>
                  <td style="padding: 9px 0;">
                    <span style="display: inline-block; padding: 4px 12px; border-radius: 999px; background-color: rgba(197, 155, 83, 0.16); border: 1px solid rgba(216, 173, 100, 0.45); color: #d8ad64; font-size: 12px; font-weight: 700; font-family: 'SF Mono', Consolas, monospace; letter-spacing: 0.05em;">
                      ${escapeHtml(stage)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td width="130" style="padding: 9px 0; font-size: 12px; color: #8e9594; text-transform: uppercase; font-family: 'SF Mono', Consolas, monospace; font-weight: 700; letter-spacing: 0.06em;">Received</td>
                  <td style="padding: 9px 0; font-size: 13px; color: #8e9594; font-family: 'SF Mono', Consolas, monospace;">${nowFormatted}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Container -->
          <tr>
            <td style="padding: 8px 32px 28px 32px;">
              <div style="font-size: 11px; font-family: 'SF Mono', Consolas, monospace; text-transform: uppercase; letter-spacing: 0.08em; color: #8e9594; margin-bottom: 10px; font-weight: 700;">Project Scope &amp; Context:</div>
              <div style="background-color: #0b0d0e; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.65; color: #f0f3f2; white-space: pre-wrap; word-break: break-word;">${escapeHtml(rawMessage)}</div>
            </td>
          </tr>

          <!-- Quick Reply Button -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: Architecture Inquiry - Uzair Khatri (${stage})`)}" style="display: inline-block; width: 100%; text-align: center; background-color: #d8ad64; color: #111418; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px 24px; border-radius: 999px; text-decoration: none; box-sizing: border-box; box-shadow: 0 4px 14px rgba(216, 173, 100, 0.3);">
                      Reply Directly to ${escapeHtml(name)} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; background-color: #0d0f10; border-top: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #656b69;">
                Delivered via Cloudflare Workers API &bull; <a href="https://uzairkhatri.com" style="color: #8e9594; text-decoration: none;">uzairkhatri.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        // Clean Plain Text Fallback
        const text = `============================================================
UZAIRKHATRI.COM • NEW ARCHITECTURE INQUIRY
============================================================

CLIENT DETAILS
------------------------------------------------------------
Name:          ${name}
Email:         ${email}
Project Stage: ${stage}
Timestamp:     ${nowFormatted}

PROJECT SCOPE & CONTEXT
------------------------------------------------------------
${rawMessage}

------------------------------------------------------------
Quick Reply: mailto:${email}?subject=${encodeURIComponent(`Re: Architecture Inquiry - Uzair Khatri (${stage})`)}
Delivered via Cloudflare Workers API (uzairkhatri.com)
============================================================`;

        // Dispatch directly through Cloudflare Workers email binding to your verified Gmail
        await env.EMAIL.send({
          to: "uz.khatri@gmail.com",
          from: "hello@uzairkhatri.com",
          subject: `Architecture Inquiry: ${name} [${stage}]`,
          text,
          html,
          replyTo: email,
        });

        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: err?.message || "Failed to dispatch email" }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Forward all website traffic to static Next.js export assets
    return env.ASSETS.fetch(request);
  },
};
