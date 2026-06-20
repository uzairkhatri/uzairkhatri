"use client";

import Image from "next/image";
import styles from "./About.module.css";
import { BOOKING_URL, withBasePath } from "./siteLinks";
import { useTiltAndGlow } from "./useTiltAndGlow";

const workflow = [
  ["01", "Clarity Session", "We map the product goal, current system, constraints, and architecture risks before anyone starts building around assumptions."],
  ["02", "Architecture Blueprint", "I design the agents, APIs, queues, data stores, observability, and operational boundaries needed for production."],
  ["03", "Build or Guide", "I either build the critical path directly or work with your team as the architect reviewing decisions, code, and delivery tradeoffs."],
  ["04", "Production Handoff", "We harden the system for real users: monitoring, failure paths, performance, ownership, and scale-readiness."],
];

const principles = [
  {
    rule: "01",
    core: "Reliability First",
    detail: "The model is only 5% of a production AI system.",
    impact: "System vulnerabilities lie in state routing, queues, rate-limiting, database lock-safety, and API failover structures—not the LLM itself."
  },
  {
    rule: "02",
    core: "Observability Built-In",
    detail: "If your team cannot trace the agent at 2 AM, the architecture is not finished.",
    impact: "Every multi-agent workflow must publish structured trace contexts, latencies, and token logs, rather than black-box console outputs."
  },
  {
    rule: "03",
    core: "Automation Over Repetition",
    detail: "A demo without regression tests and deployment queues is not production.",
    impact: "Manual work matching, unmonitored scripts, and fragile cron jobs must be refactored into self-healing, transactional backend services."
  },
  {
    rule: "04",
    core: "Scale By Design",
    detail: "Distributed lock safety and memory states must scale horizontally.",
    impact: "State machine transitions, concurrency lock protection (Redis Redlock), and vector retrieval must remain stable under load."
  },
  {
    rule: "05",
    core: "AI Where It Matters",
    detail: "Do not replace simple deterministic code with unpredictable model calls.",
    impact: "LLM agents are for creative reasoning, text understanding, or routing. Keep billing, accounting, and scheduling flows strictly deterministic."
  }
];

const stackIcons: Record<string, React.ReactNode> = {
  "OpenAI": (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chipIcon} aria-hidden="true">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  "Claude": (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chipIcon} aria-hidden="true">
      <path d="M10.154 0L0 24h5.275l1.62-4.14h7.026L15.545 24H21L10.154 0zm.83 15.658L13.14 10.2l2.25 5.458h-4.406z" />
    </svg>
  ),
  "LangGraph": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.chipIcon} aria-hidden="true">
      <circle cx="12" cy="5" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="5" cy="18" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="18" r="2.5" fill="currentColor" stroke="none" />
      <path d="M10.5 7L6.5 15.5M13.5 7l5 8.5M8 18h8" />
    </svg>
  ),
  "LangChain": (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chipIcon} aria-hidden="true">
      <path d="M12.923 0a.728.728 0 0 0-.613.332l-3.328 5.253a.364.364 0 0 1-.614.004L5.04 0.334A.728.728 0 0 0 4.427 0H.728A.728.728 0 0 0 0 .728v3.699c0 .265.143.51.376.643l5.04 2.879c.148.085.33.085.478 0l3.326-1.9 3.325 1.9c.148.085.33.085.478 0l5.04-2.88a.728.728 0 0 0 .377-.642V.728A.728.728 0 0 0 17.272 0zm.45 9.077c-.147-.084-.33-.084-.477 0l-3.326 1.9-3.326-1.9a.324.324 0 0 0-.324 0c-.098.056-.153.16-.153.27v7.411c0 .114.06.218.16.275l5.035 2.877c.148.085.33.085.478 0l5.036-2.877c.1.057.16.16.16.275v-7.41ic0-.112-.056-.215-.154-.271z" />
    </svg>
  ),
  "FastAPI": (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chipIcon} aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.89 12.87l-2.02 1.63c-.11.09-.27.1-.4.02l-1.92-1.25a.333.333 0 0 0-.47.09l-1.63 2.53c-.09.14-.26.2-.42.14l-2.18-.77a.335.335 0 0 1-.16-.48l3.19-5.83c.1-.18.34-.22.49-.07l1.73 1.67c.1.1.27.1.38-.01l3.52-3.41c.14-.14.38-.05.39.15l.1 5.23c0 .16-.1.3-.24.36z" />
    </svg>
  ),
  "Python": (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chipIcon} aria-hidden="true">
      <path d="M14.258.192a5.12 5.12 0 0 0-3.385 1.437l-.321.321a.485.485 0 0 0 .034.717l.79.626a.484.484 0 0 0 .616-.038l.318-.318c.883-.883 2.115-.972 3.109-.296.994.675 1.343 1.956.88 3.1-.462 1.144-1.583 1.868-2.81 1.815H9.288v-1.45a3.882 3.882 0 0 0-3.88-3.88H1.45A1.45 1.45 0 0 0 0 3.962v5.819a1.45 1.45 0 0 0 1.45 1.45h4.159v1.45a3.88 3.88 0 0 0 3.88 3.88H14.5a1.45 1.45 0 0 0 1.45-1.45V9.292a1.45 1.45 0 0 0-1.45-1.45h-4.159v-1.45a3.882 3.882 0 0 0 3.88-3.88h3.818A1.45 1.45 0 0 0 19.5 1.062V.7a5.12 5.12 0 0 0-5.242-.508zM5.146 5.854a.729.729 0 1 1 0-1.458.729.729 0 0 1 0 1.458zm9.708 8.292a.73.73 0 1 1 0-1.46.73.73 0 0 1 0 1.46z" />
    </svg>
  ),
  "AWS": (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chipIcon} aria-hidden="true">
      <path d="M11.455 2.18c-3.136.035-6.077.925-8.528 2.502a.855.855 0 00-.097 1.31l1.706 1.706a.715.715 0 001.004-.004 9.07 9.07 0 015.823-1.637 9.012 9.012 0 015.826 1.633.722.722 0 001.007.004l1.688-1.688a.861.861 0 00-.083-1.32c-2.433-1.597-5.362-2.506-8.527-2.506zm-9.062 6.645A.77.77 0 001.7 9.387c1.782 2.395 4.316 4.316 7.327 5.378a.747.747 0 00.91-.497l.805-2.296a.729.729 0 00-.395-.873c-2.025-.97-3.792-2.457-5.074-4.298a.74.74 0 00-1.026-.145L1.874 8.784a.458.458 0 00.52.04zm18.125 0a.458.458 0 00.52-.04l-2.355-1.877a.737.737 0 00-1.023.143c-1.282 1.844-3.05 3.33-5.078 4.3a.732.732 0 00-.395.874l.805 2.296a.753.753 0 00.914.497c3.007-1.066 5.538-2.987 7.32-5.385.072-.1.218-.184.292-.208zm-9.063 6.945c-2.884.05-5.594.757-7.906 2.05a.81.81 0 00-.142 1.258l1.79 1.79a.74.74 0 00.993.036 11.233 11.233 0 015.228-1.246 11.212 11.212 0 015.23 1.246.745.745 0 00.997-.036l1.772-1.772a.815.815 0 00-.13-.13 11.288 11.288 0 00-7.832-3.226z" />
    </svg>
  ),
  "Redis": (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chipIcon} aria-hidden="true">
      <path d="M22.71 13.145c-1.66 2.092-3.452 4.483-7.038 4.483-3.203 0-4.397-2.825-4.48-5.12.701 1.484 2.073 2.685 4.214 2.63 4.117-.133 6.94-3.852 6.94-7.239 0-4.05-3.022-6.972-8.268-6.972-3.752 0-8.4 1.428-11.455 3.685C2.59 6.937 3.885 9.958 4.35 9.626c2.648-1.904 4.748-3.13 6.784-3.744C8.12 9.244.886 17.05 0 18.425c.1 1.261 1.66 4.648 2.424 4.648.232 0 .431-.133.664-.365a100.49 100.49 0 0 0 5.54-6.765c.222 3.104 1.748 6.898 6.014 6.898 3.819 0 7.604-2.756 9.33-8.965.2-.764-.73-1.361-1.261-.73zm-4.349-5.013c0 1.959-1.926 2.922-3.685 2.922-.941 0-1.664-.247-2.235-.568 1.051-1.592 2.092-3.225 3.21-4.973 1.972.334 2.71 1.43 2.71 2.619z" />
    </svg>
  ),
  "PostgreSQL": (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chipIcon} aria-hidden="true">
      <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0529-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" />
    </svg>
  ),
  "Docker": (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chipIcon} aria-hidden="true">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
    </svg>
  ),
  "SQS": (
    <svg viewBox="0 0 24 24" fill="currentColor" className={styles.chipIcon} aria-hidden="true">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm0 1.5A10.5 10.5 0 0 1 22.5 12 10.5 10.5 0 0 1 12 22.5 10.5 10.5 0 0 1 1.5 12 10.5 10.5 0 0 1 12 1.5zm-5.25 4.5A.75.75 0 0 0 6 6.75v10.5A.75.75 0 0 0 6.75 18h10.5A.75.75 0 0 0 18 17.25V6.75A.75.75 0 0 0 17.25 6H6.75zm.75 1.5h9v9h-9v-9zm1.5 1.5v6l4.5-3-4.5-3z" />
    </svg>
  )
};

const stack = [
  "OpenAI",
  "Claude",
  "LangGraph",
  "LangChain",
  "FastAPI",
  "Python",
  "AWS",
  "Redis",
  "PostgreSQL",
  "Docker",
  "SQS",
];

function PrincipleCard({ item }: { item: typeof principles[0] }) {
  const tiltGlow = useTiltAndGlow({ maxTilt: 6, scale: 1.015 });
  return (
    <article
      ref={tiltGlow.ref}
      onMouseMove={tiltGlow.onMouseMove}
      onMouseLeave={tiltGlow.onMouseLeave}
      style={tiltGlow.style}
      className={`${styles.principleCard} reveal-item`}
    >
      <header className={styles.cardHeader}>
        <span className={styles.ruleBadge}>RULE {item.rule}</span>
        <span className={styles.glowDot} />
      </header>
      <h4 style={{ margin: "0.2rem 0", fontSize: "1.25rem", color: "var(--gold-bright)", fontWeight: 700 }}>
        {item.core}
      </h4>
      <blockquote style={{ fontSize: "1.02rem", fontStyle: "italic", color: "#ffffff", lineHeight: "1.4", minHeight: "auto", border: "none", padding: 0 }}>
        &ldquo;{item.detail}&rdquo;
      </blockquote>
      <p className={styles.impactLine}>
        <span>Operational Impact:</span> {item.impact}
      </p>
    </article>
  );
}

export default function About() {
  const visualTilt = useTiltAndGlow({ maxTilt: 6, scale: 1.02 });

  return (
    <section id="about" className={`${styles.section} reveal-section`} aria-label="How Uzair Khatri thinks and works">
      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.principles}>
        <header className={styles.principlesHeader}>
          <div className="section-eyebrow"><span />How I think</div>
          <h3>Strong opinions on production AI. No hedging.</h3>
        </header>
        <div className={styles.principlesGrid}>
          {principles.map((item) => (
            <PrincipleCard key={item.rule} item={item} />
          ))}
        </div>
      </div>


      <div className={styles.workflow}>
        <header className={styles.workflowHeader}>
          <div className="section-eyebrow"><span />How I work</div>
          <h3>Clear decisions before expensive code.</h3>
          <p>
            My role is to reduce architecture risk early, then keep execution honest as the system
            moves toward production.
          </p>
        </header>

        <div className={styles.workflowContent}>
          <div className={styles.workflowGrid}>
            {workflow.map(([number, title, text]) => (
              <article className={`${styles.workflowStep} reveal-item`} key={title}>
                <span>{number}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div 
            ref={visualTilt.ref}
            onMouseMove={visualTilt.onMouseMove}
            onMouseLeave={visualTilt.onMouseLeave}
            style={visualTilt.style}
            className={`${styles.workflowVisual} reveal-item`}
          >
            <Image
              src={withBasePath("/img/profile/ai_system_architecture_3d.png")}
              alt="AI Systems 3D Schematic Diagram"
              width={600}
              height={600}
              priority
              style={{ objectFit: "contain", borderRadius: "12px", width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>





      <div className={styles.toolkitGrid}>
        {/* Left Column: Core Stack */}
        <div className={styles.toolkitBlock}>
          <header className={styles.toolkitBlockHeader}>
            <div className="section-eyebrow"><span />Technical Toolkit</div>
            <h3 className={styles.toolkitTitle}>Core Stack</h3>
            <p className={styles.toolkitDescription}>
              Production-hardened tools and frameworks I leverage to design, build, and orchestrate resilient AI systems.
            </p>
          </header>
          <div className={styles.chipGrid}>
            {stack.map((item) => (
              <span className={styles.chip} key={item}>
                {stackIcons[item]}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>


    </section>
  );
}
