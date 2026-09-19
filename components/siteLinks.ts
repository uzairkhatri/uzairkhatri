export const BOOKING_URL = "https://calendly.com/uz-khatri/30min";

export const EMAIL_ADDRESS = "hello@uzairkhatri.com";
export const UPWORK_URL = "https://www.upwork.com/freelancers/~016ea0db5e9fc0e887";


export const EMAIL_URL = `mailto:${EMAIL_ADDRESS}`;

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string) {
  if (!BASE_PATH) return path;
  if (path === "/") return BASE_PATH;
  return `${BASE_PATH}${path}`;
}
export const CV_URL = withBasePath("/Uzair-Iqbal-AI-Architect-CV.pdf");
