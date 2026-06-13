import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";

/* ── Project data from resume ── */
const PROJECTS = [
  {
    title: "SlipHub - Payroll Management System",
    desc: "Internal payroll platform where employees securely access official payslips generated from attendance data. Features OTP-based secure login authentication and SQL database schema.",
    tech: ["React.js", "SQL", "Mailjet"],
    url: "#", // Replace with actual live URL
    status: "live",
  },
  {
    title: "Job Career Portal",
    desc: "Full-cycle recruitment portal managing job postings, candidate applications, interview scheduling, and offer letter delivery with secure document uploads.",
    tech: ["MERN Stack", "AWS S3", "Mailjet"],
    url: "#", // Replace with actual live URL
    status: "live",
  },
  {
    title: "Employee User Portal",
    desc: "Comprehensive internal HR portal covering full employee lifecycle — from onboarding to exit documentation with 12+ operational modules.",
    tech: ["MERN Stack", "AWS S3", "Mailjet"],
    url: "#", // Replace with actual live URL
    status: "live",
  },
  {
    title: "Company Blog Portal",
    desc: "Official public-facing blog portal for company website to manage and publish content with dynamic React.js frontend and media management.",
    tech: ["React.js", "MySQL", "AWS S3"],
    url: "#", // Replace with actual live URL
    status: "live",
  },
  {
    title: "Corporate Static Websites",
    desc: "Performance-optimized, fully responsive React.js websites developed for three separate client companies.",
    tech: ["React.js"],
    url: "#", // Replace with actual live URL
    status: "live",
    multiUrl: true,
  },
  {
    title: "Learning Management System (LMS)",
    desc: "Comprehensive LMS platform for managing courses, students, and learning content with collaborative team development.",
    tech: ["MERN Stack"],
    url: "#", // Replace with actual live URL
    status: "live",
  },
];

/* ── Additional projects (showcasing other work) ── */
const ADDITIONAL_PROJECTS = [
  {
    title: "Restaurant Website",
    desc: "Modern restaurant website with menu display and reservation system.",
    tech: ["HTML", "CSS", "JavaScript"],
    url: "https://prakashraj2406.github.io/Restaurent/",
    status: "live",
  },
  {
    title: "Bootstrap Learning Platform",
    desc: "Educational platform built with Bootstrap for responsive design learning.",
    tech: ["HTML", "Bootstrap"],
    url: "https://prakashraj2406.github.io/Bootstrap-Project/",
    status: "live",
  },
  {
    title: "Pet Store Project",
    desc: "E-commerce style pet store website with product listings.",
    tech: ["HTML", "CSS", "Bootstrap"],
    url: "https://prakashraj2406.github.io/Petstore-Project/",
    status: "live",
  },
  {
    title: "Photoshop Group Project",
    desc: "Collaborative design project showcasing Photoshop integration with web technologies.",
    tech: ["HTML", "CSS", "Bootstrap"],
    url: "https://prakashraj2406.github.io/Group-Project/",
    status: "live",
  },
];

/* ── FadeUp animation wrapper ── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Enhanced Project Card with tech tags ── */
function ProjectCard({
  title,
  desc,
  tech,
  url,
  status,
  delay,
  multiUrl = false,
}) {
  return (
    <FadeUp
      delay={delay}
      className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] group"
    >
      <div
        className="
        bg-white dark:bg-zinc-900
        rounded-xl overflow-hidden
        shadow-lg hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-1
        border border-zinc-200 dark:border-zinc-800
        h-full flex flex-col
      "
      >
        {/* Card Header */}
        <div className="p-5 pb-3 flex items-start justify-between">
          <div>
            <h3 className="font-poppins font-bold text-lg text-zinc-800 dark:text-white leading-tight">
              {title}
            </h3>
            {status === "live" && (
              <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-green-600 dark:text-green-400">
                <FaCheckCircle className="text-[10px]" />
                Live in Production
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="px-5 pb-3 flex-grow">
          <p className="font-['Open_Sans'] text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {tech.map((t, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono font-semibold px-2 py-1 rounded-full
                bg-red-50 dark:bg-red-950/30
                text-red-600 dark:text-red-400
                border border-red-200 dark:border-red-800"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="px-5 pb-5">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <button
              className="
              w-full flex items-center justify-center gap-2
              font-poppins font-semibold text-sm uppercase tracking-wider
              px-4 py-2.5 rounded-lg
              bg-red-500 hover:bg-red-600
              text-white
              transition-all duration-300
              cursor-pointer
              shadow-md hover:shadow-lg
            "
            >
              View Project <FaExternalLinkAlt className="text-[11px]" />
            </button>
          </a>
        </div>
      </div>
    </FadeUp>
  );
}

/* ── Section Header Component ── */
function SectionHeader({ watermark, title, highlight, delay = 0 }) {
  return (
    <FadeUp
      delay={delay}
      className="relative text-center pt-6 pb-6 select-none overflow-hidden"
    >
      <div className="relative inline-block mx-auto">
        <span
          className="
            block font-poppins font-black uppercase leading-none tracking-tighter
            text-zinc-100 dark:text-zinc-900
            pointer-events-none transition-colors duration-500
          "
          style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
        >
          {watermark}
        </span>
        <h2
          className="
            absolute inset-0 flex items-center justify-center
            font-poppins font-black uppercase
            text-zinc-800 dark:text-white
            z-10 transition-colors duration-500 whitespace-nowrap
          "
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}
        >
          <span className="text-zinc-500 dark:text-zinc-400">{title}</span>
          &nbsp;
          <span className="text-red-500">{highlight}</span>
        </h2>
      </div>
      <div className="mx-auto mt-2 w-12 h-0.5 rounded-full bg-red-500" />
    </FadeUp>
  );
}

/* ══════════════════════════════
   MAIN COMPONENT
══════════════════════════════ */
export default function Projects() {
  return (
    <div
      className="
      min-h-screen w-full
      bg-white dark:bg-zinc-950
      transition-colors duration-500
      pb-20 px-4 md:px-8 lg:px-12
    "
    >
      {/* ── Enterprise Projects Section ── */}
      <SectionHeader
        watermark="Works"
        title="Enterprise"
        highlight="Projects"
        delay={0}
      />

      <section
        className="
        flex flex-wrap justify-center
        gap-6
        max-w-7xl mx-auto
        pt-2 pb-10
      "
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={i} {...p} delay={i * 80} />
        ))}
      </section>

      {/* ── Additional Showcase Section ── */}
      <SectionHeader
        watermark="More"
        title="Additional"
        highlight="Showcase"
        delay={400}
      />

      <section
        className="
        flex flex-wrap justify-center
        gap-6
        max-w-7xl mx-auto
        pt-2 pb-6
      "
      >
        {ADDITIONAL_PROJECTS.map((p, i) => (
          <ProjectCard key={i} {...p} delay={500 + i * 80} />
        ))}
      </section>

      {/* ── Stats / Summary Banner ── */}
      <FadeUp delay={900} className="max-w-4xl mx-auto mt-10">
        <div
          className="
          bg-gradient-to-r from-red-50 to-zinc-50 dark:from-red-950/20 dark:to-zinc-900/50
          rounded-2xl p-6
          border border-red-100 dark:border-red-900/30
          text-center
        "
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div>
              <p className="font-poppins font-black text-3xl text-red-500">
                7+
              </p>
              <p className="font-['Open_Sans'] text-sm text-zinc-600 dark:text-zinc-400">
                Production Projects
              </p>
            </div>
            <div>
              <p className="font-poppins font-black text-3xl text-red-500">
                12+
              </p>
              <p className="font-['Open_Sans'] text-sm text-zinc-600 dark:text-zinc-400">
                HR Modules Built
              </p>
            </div>
            <div>
              <p className="font-poppins font-black text-3xl text-red-500">
                MERN
              </p>
              <p className="font-['Open_Sans'] text-sm text-zinc-600 dark:text-zinc-400">
                Full Stack Expertise
              </p>
            </div>
          </div>
          <p className="font-['Open_Sans'] text-sm text-zinc-500 dark:text-zinc-500 mt-4">
            Independently architected, developed, and deployed all enterprise
            applications
          </p>
        </div>
      </FadeUp>
    </div>
  );
}
