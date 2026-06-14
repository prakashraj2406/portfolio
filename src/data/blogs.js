import Blog1 from "../assets/project-6.jpg";
import Blog2 from "../assets/project-2.jpg";
import Blog3 from "../assets/project-7.jpg";
import Blog4 from "../assets/blog4.jpg";
import Blog5 from "../assets/blog5.jpg";
import Blog6 from "../assets/blog6.jpg";

export const BLOGS = [
  {
    slug: "building-sliphub-at-scale",
    img: Blog1,
    date: "12th Mar, 2026",
    author: "Prakash",
    readTime: "7 min read",
    category: "Production Systems",
    title: "Building SlipHub at Scale",
    excerpt:
      "Architecting an end-to-end payroll platform with React, MySQL, and Mailjet — from OTP auth to attendance-driven payslip generation.",
    content: [
      {
        type: "p",
        text: "SlipHub started as a one-line request: 'let employees download their payslips from a portal instead of HR emailing PDFs.' Six months later, it's a production system pulling salary data from attendance logs, generating prorated slips for partial months, and shipping OTP-secured access to every employee in the company.",
      },
      {
        type: "p",
        text: "Here's what shipped, and what I'd do differently if I started over.",
      },
      { type: "h2", text: "Why MySQL, Not MongoDB" },
      {
        type: "p",
        text: "My instinct was MongoDB — it's what I'd used for every previous project. But payroll data is deeply relational. An employee has one salary structure, many attendance records, many payslips. Joining a Mongo aggregation across those collections to compute LOP days felt fragile. MySQL with proper foreign keys made the data model self-documenting, and accountants could run ad-hoc reports without me writing a single endpoint.",
      },
      {
        type: "p",
        text: "Lesson: pick the database that matches the data shape, not the stack you're comfortable with.",
      },
      { type: "h2", text: "OTP Login with Mailjet" },
      {
        type: "p",
        text: "Employees shouldn't need a password to view their own payslips — that's friction for a feature they'll use twice a month. Email OTP via Mailjet was the right call: zero password storage, zero forgot-password flows, near-instant delivery.",
      },
      {
        type: "code",
        lang: "javascript",
        code: `// routes/auth.js
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000;

  await OTP.upsert({ email, otp, expiresAt });

  await mailjet.post("send", { version: "v3.1" }).request({
    Messages: [{
      From: { Email: "noreply@company.com", Name: "SlipHub" },
      To: [{ Email: email }],
      Subject: "Your SlipHub login code",
      TextPart: \`Your OTP is \${otp}. Valid for 5 minutes.\`,
    }],
  });

  res.json({ success: true });
});`,
      },
      { type: "h2", text: "Attendance → Payslip Pipeline" },
      {
        type: "p",
        text: "The hard part isn't generating PDFs. It's the rules engine that decides what a 'working day' is when an employee took half a day, came in late twice, and had a public holiday in the middle of their leave. Sandwich leave detection alone took three iterations to get right.",
      },
      {
        type: "p",
        text: "I ended up modeling each cycle as a sequence of day objects, each tagged with a category (present, absent, leave, holiday, weekend), then running a single reduce over the array. Every business rule became a transformation on this sequence, which made the logic testable without spinning up a database.",
      },
      { type: "h2", text: "Takeaways" },
      {
        type: "list",
        items: [
          "Match your database to the data shape, not your comfort zone.",
          "OTP beats passwords for low-frequency authentication.",
          "Model business logic as transformations on plain data, not database queries.",
          "Prorated slips and sandwich-leave rules will eat more time than you budget. Plan accordingly.",
        ],
      },
    ],
  },
  {
    slug: "secure-otp-auth-in-mern",
    img: Blog2,
    date: "5th Feb, 2026",
    author: "Prakash",
    readTime: "6 min read",
    category: "Security",
    title: "Secure OTP Auth in MERN",
    excerpt:
      "Implementing dual-channel OTP verification with Mailjet for email and Twilio for SMS, backed by JWT middleware for a hardened MERN stack.",
    content: [
      {
        type: "p",
        text: "SMS-only OTP is fragile. Delivery rates fluctuate by carrier, costs add up at scale, and some countries restrict transactional SMS entirely. I built a dual-channel system: email via Mailjet, SMS via Twilio, with JWT-backed sessions on top.",
      },
      { type: "h2", text: "Why Two Channels" },
      {
        type: "p",
        text: "Users pick the channel that's most reliable for them. Some have spotty SMS but reliable email. Some are the opposite. Letting them choose dropped our login failure rate from 8% to under 1% in the first month.",
      },
      { type: "h2", text: "The Twilio Side" },
      {
        type: "code",
        lang: "javascript",
        code: `import twilio from "twilio";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export async function sendSmsOtp(phone, otp) {
  return client.messages.create({
    body: \`Your verification code is \${otp}. Valid for 5 minutes.\`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  });
}`,
      },
      { type: "h2", text: "JWT Verification Middleware" },
      {
        type: "p",
        text: "Once OTP is verified, I issue a short-lived access token (15 min) and a long-lived refresh token (7 days). The access token gets attached to every protected request; the refresh token lives in an HTTP-only cookie.",
      },
      {
        type: "code",
        lang: "javascript",
        code: `export function verifyJwt(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}`,
      },
      { type: "h2", text: "Pitfalls to Avoid" },
      {
        type: "list",
        items: [
          "Don't store OTPs in plaintext. Hash them like passwords.",
          "Rate-limit OTP requests per identifier (email/phone), not just per IP.",
          "Set OTP expiry server-side. Don't trust client clocks.",
          "Log every OTP attempt for fraud analysis.",
        ],
      },
    ],
  },
  {
    slug: "aws-s3-presigned-urls-done-right",
    img: Blog3,
    date: "18th Dec, 2025",
    author: "Prakash",
    readTime: "8 min read",
    category: "Cloud Infrastructure",
    title: "AWS S3 Presigned URLs Done Right",
    excerpt:
      "Why your presigned uploads break in production and how I fixed signing clock offsets across regions — a debugging story worth sharing.",
    content: [
      {
        type: "p",
        text: "Presigned URLs are the right way to upload files to S3 from the browser — your server signs a short-lived URL, the browser uploads directly, your backend never sees the file bytes. Simple in theory. In production, it broke in three different ways.",
      },
      { type: "h2", text: "Why Presigned Beats Proxying" },
      {
        type: "p",
        text: "The naive approach is to POST the file to your Express server and have it forward to S3. This means every upload eats your server's bandwidth, memory, and time. With presigned URLs, your server signs a 5-minute permission slip and the browser does the heavy lifting.",
      },
      { type: "h2", text: "Generating the URL" },
      {
        type: "code",
        lang: "javascript",
        code: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "ap-south-1" });

export async function getUploadUrl(key, contentType) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(s3, command, { expiresIn: 300 });
}`,
      },
      { type: "h2", text: "The Clock Offset Bug" },
      {
        type: "p",
        text: "Uploads worked perfectly in dev. In production, they started failing intermittently with 403 SignatureDoesNotMatch errors — but only on certain server instances. After two days of debugging, I traced it to NTP drift on one of our EC2 instances. AWS validates presigned URL signatures against a tight time window. If your server's clock drifts by more than 15 minutes, signatures generated on that server become invalid.",
      },
      {
        type: "p",
        text: "Fix: enable chrony on all instances, monitor clock skew via CloudWatch, and add a startup check that rejects deploys if the server clock is off by more than 30 seconds.",
      },
      { type: "h2", text: "CORS — The Other Footgun" },
      {
        type: "p",
        text: "S3 buckets need an explicit CORS policy to accept browser uploads. Without it, your fetch will fail at the preflight stage and your error message won't even mention CORS — it'll just say 'Network Error'. Set the CORS rule to allow PUT, your origin, and the headers you actually send (Content-Type at minimum).",
      },
      { type: "h2", text: "Takeaways" },
      {
        type: "list",
        items: [
          "Use presigned URLs for any file upload over a few hundred KB.",
          "Monitor server clock skew. AWS is unforgiving about this.",
          "Configure CORS on the bucket before you wonder why uploads fail.",
          "Set realistic URL expiry (5 minutes is usually enough — don't go to hours).",
        ],
      },
    ],
  },
  {
    slug: "redux-toolkit-at-scale",
    img: Blog4,
    date: "22nd Oct, 2025",
    author: "Prakash",
    readTime: "9 min read",
    category: "Architecture",
    title: "Redux Toolkit at Scale",
    excerpt:
      "A typed Service → Slice → Thunk → Selector pattern that keeps large React and TypeScript applications maintainable without ceremony.",
    content: [
      {
        type: "p",
        text: "Most Redux Toolkit tutorials are counters. Real applications have 30 slices, async flows in every direction, and TypeScript types that need to flow from the API to the component. Here's the four-layer pattern that's kept our HR Management codebase maintainable for the last six months.",
      },
      { type: "h2", text: "The Four Layers" },
      {
        type: "list",
        items: [
          "Service — pure async functions that talk to the API. No Redux awareness.",
          "Slice — state shape, reducers, sync actions.",
          "Thunk — orchestrates a service call and dispatches slice actions.",
          "Selector — the only public way components read state.",
        ],
      },
      {
        type: "p",
        text: "The discipline: components never import slices directly. They import selectors for reading and thunks for writing. This means you can refactor the slice's internal shape without touching a single component.",
      },
      { type: "h2", text: "The Service Layer" },
      {
        type: "code",
        lang: "typescript",
        code: `// services/employeeService.ts
import axios from "../lib/axios";
import type { Employee, EmployeeFilter } from "../types/employee";

export const employeeService = {
  list: (filter: EmployeeFilter) =>
    axios.get<Employee[]>("/employees", { params: filter }),

  create: (payload: Partial<Employee>) =>
    axios.post<Employee>("/employees", payload),

  update: (id: string, payload: Partial<Employee>) =>
    axios.put<Employee>(\`/employees/\${id}\`, payload),
};`,
      },
      { type: "h2", text: "Thunks Bridge Service and Slice" },
      {
        type: "code",
        lang: "typescript",
        code: `// thunks/employeeThunks.ts
export const fetchEmployees = createAsyncThunk(
  "employees/fetch",
  async (filter: EmployeeFilter, { rejectWithValue }) => {
    try {
      const { data } = await employeeService.list(filter);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);`,
      },
      { type: "h2", text: "Selectors as a Public API" },
      {
        type: "p",
        text: "Every piece of state a component reads goes through a selector. This sounds excessive until you need to add memoization, derive computed state, or rename a field. With selectors, all of that is a one-file change. Without them, it's a grep across hundreds of components.",
      },
      { type: "h2", text: "Why This Scales" },
      {
        type: "p",
        text: "Each layer has one job. Services don't know about Redux. Slices don't know about HTTP. Components don't know about state shape. New developers can be productive on one layer without understanding the others. That's the actual win.",
      },
    ],
  },
  {
    slug: "micro-frontends-with-module-federation",
    img: Blog5,
    date: "7th Aug, 2025",
    author: "Prakash",
    readTime: "8 min read",
    category: "Architecture",
    title: "Micro Frontends with Module Federation",
    excerpt:
      "From a MERN monolith to a Webpack 5 Module Federation setup — shell, remotes, API gateway, and the database-per-service pattern explained.",
    content: [
      {
        type: "p",
        text: "When two teams are blocked behind a single front-end deploy, micro frontends start looking attractive. Webpack 5's Module Federation lets you compose independently deployed React apps into one product without iframes, without a runtime framework, and without giving up React.",
      },
      { type: "h2", text: "Shell + Remote Pattern" },
      {
        type: "p",
        text: "One app — the shell — owns the layout, routing, and shared dependencies (React, ReactDOM, your design system). Remote apps expose specific routes or components. The shell loads them at runtime over the network.",
      },
      {
        type: "p",
        text: "Practically: the shell knows '/orders is owned by the orders team' but doesn't bundle their code. When a user visits /orders, the shell fetches the orders remote's bundle and renders it inside the shell's layout.",
      },
      { type: "h2", text: "Webpack Config" },
      {
        type: "code",
        lang: "javascript",
        code: `// shell/webpack.config.js
new ModuleFederationPlugin({
  name: "shell",
  remotes: {
    orders: "orders@http://orders.app/remoteEntry.js",
    billing: "billing@http://billing.app/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
  },
});`,
      },
      { type: "h2", text: "The Backend Mirrors the Frontend" },
      {
        type: "p",
        text: "Each remote MFE has its own backend service. They talk to an API gateway, which routes to the right service. Each service owns its database — no shared tables, no cross-service joins. This sounds like overhead until you realize it's what lets each team deploy independently.",
      },
      { type: "h2", text: "When Not to Use This" },
      {
        type: "p",
        text: "If you have one team and a single monolith deploying smoothly, micro frontends will add complexity for no benefit. The real value shows up when independent teams need independent deploy cycles. Until then, optimize the monolith.",
      },
    ],
  },
  {
    slug: "leading-a-dev-team-as-a-junior-lead",
    img: Blog6,
    date: "30th May, 2025",
    author: "Prakash",
    readTime: "5 min read",
    category: "Leadership",
    title: "Leading a Dev Team as a Junior Lead",
    excerpt:
      "Establishing coding standards, Git workflows, and a code-review culture while training freshers — what worked, what didn't, and what I'd change.",
    content: [
      {
        type: "p",
        text: "A year into my first developer role, I was promoted to Senior Software Developer and Team Lead. I was still figuring things out myself. Here's what I learned about leading and training a team while being relatively junior.",
      },
      { type: "h2", text: "Standards Without Tyranny" },
      {
        type: "p",
        text: "Early on, I tried to enforce every preference I had — naming conventions, file structures, commit message formats. It didn't land. People resisted not because the rules were wrong, but because they hadn't agreed to them.",
      },
      {
        type: "p",
        text: "What worked: pick the three rules that matter most (for us: Prettier on save, conventional commits, no direct pushes to main) and let everything else be a preference, not a rule. Three things people will follow. Thirty things they'll ignore.",
      },
      { type: "h2", text: "Code Reviews That Teach" },
      {
        type: "p",
        text: "The temptation is to review code like a gatekeeper — block until perfect. With freshers, this kills morale and slows learning. The shift that helped: phrase comments as questions, not commands. 'Why did you choose X here?' opens a conversation. 'Change X to Y' closes one.",
      },
      { type: "h2", text: "Mentoring Freshers" },
      {
        type: "p",
        text: "The most useful thing I did was pair programming for the first two weeks. Not 'watch me code' — actually rotating who drives every 25 minutes. Freshers picked up debugging instincts, IDE shortcuts, and our codebase conventions faster than any documentation could deliver.",
      },
      { type: "h2", text: "The Hardest Part" },
      {
        type: "p",
        text: "Knowing when not to help. Sometimes the right thing is to let a junior struggle through a problem for an hour. They learn more from that hour than from me jumping in at minute five. Watching someone struggle when you know the answer is uncomfortable. Do it anyway.",
      },
    ],
  },
];

export function getBlogBySlug(slug) {
  return BLOGS.find((b) => b.slug === slug);
}