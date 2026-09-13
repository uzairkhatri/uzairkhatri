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
      replyTo?: string;
    }) => Promise<{ messageId: string }>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const body = (await request.json()) as {
          name?: string;
          email?: string;
          message?: string;
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
        const message = (body.message || "").trim().slice(0, 3000);

        if (!name || !email || !message) {
          return new Response(
            JSON.stringify({ error: "Name, email, and message are required." }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        // Dispatch directly through Cloudflare Workers email binding to your verified Gmail
        await env.EMAIL.send({
          to: "uz.khatri@gmail.com",
          from: "hello@uzairkhatri.com",
          subject: `Architecture Inquiry from ${name} (uzairkhatri.com)`,
          text: `New architecture inquiry from uzairkhatri.com:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
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
