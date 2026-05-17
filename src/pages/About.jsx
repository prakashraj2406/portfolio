import { useEffect, useRef, useState } from "react";
import { FaDownload, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import resume from "../assets/Prakash_Raj.pdf";

/* ── Skill data ── */
const SKILLS = [
  { label: "HTML & CSS", pct: 95, color: "#ef4444" },
  { label: "JavaScript", pct: 90, color: "#facc15" },
  { label: "React", pct: 85, color: "#38bdf8" },
  { label: "Node.js", pct: 65, color: "#6366f1" },
  { label: "MongoDB", pct: 75, color: "#22c55e" },
  { label: "Bootstrap", pct: 98, color: "#3b3b3b" },
];

/* ── Timeline data ── */
const TIMELINE = [
  {
    period: "2025 – Present",
    role: "Senior Software Developer",
    org: "Yoho Technologies",
    place: "Chennai",
    desc: "Working on production-grade projects with a cross-functional team, focusing on both front-end and back-end development using the MERN stack. Designing and implementing scalable software solutions that align with client requirements.",
    type: "work",
  },
  {
    period: "2024",
    role: "Web Developer",
    org: "Login 360",
    place: "",
    desc: "Designed front-end templates using CSS and Bootstrap. Worked with React.js for component-based UI development and handled API integration in small to mid-scale projects.",
    type: "work",
  },
  {
    period: "2019 – 2023",
    role: "B.Tech – Information Technology",
    org: "SKCET",
    place: "Coimbatore",
    desc: "Graduated from Sri Krishna College of Engineering and Technology with a CGPA of 7.53. Gained a strong foundation in software engineering, data structures, and web technologies.",
    type: "edu",
  },
  {
    period: "2018 – 2019",
    role: "Higher Secondary Education (HSE)",
    org: "VMHSS",
    place: "Bargur",
    desc: "Completed Higher Secondary Education at Vailankanni Matric Higher Secondary School with 56.4%.",
    type: "edu",
  },
  {
    period: "2016 – 2017",
    role: "SSLC",
    org: "KMHSS",
    place: "Bargur",
    desc: "Completed Secondary School Leaving Certificate at Kanakadasa Matric Higher Secondary School with 88.4%.",
    type: "edu",
  },
];

/* ── Animated skill bar ── */
function SkillBar({ label, pct, color, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(pct), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref} className="w-full">
      {/* Label row */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-poppins text-sm font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
          {label}
        </span>
        <span
          className="font-poppins text-sm font-black tabular-nums"
          style={{ color }}
        >
          {width}%
        </span>
      </div>

      {/* Track */}
      <div className="relative h-2.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        {/* Animated fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: color,
            transitionDuration: "1.2s",
            boxShadow: `0 0 8px ${color}55`,
          }}
        />
        {/* Shimmer overlay on fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${width}%`,
            background:
              "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.35) 50%,transparent 100%)",
            backgroundSize: "200% 100%",
            animation: width > 0 ? "shimmer 2s infinite" : "none",
            transitionDuration: "1.2s",
            transition: "width 1.2s ease-out",
          }}
        />
      </div>
    </div>
  );
}

/* ── Fade-in-up wrapper ── */
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
      { threshold: 0.15 },
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
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function About() {
  return (
    <>
      {/* Shimmer keyframe injected once */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>

      <div
        className="
        min-h-screen w-full
        bg-white dark:bg-zinc-950
        text-zinc-800 dark:text-white
        transition-colors duration-500
        pb-24 pr-16 md:pr-20
      "
      >
        {/* ── Page header ── */}
        <FadeUp className="relative text-center pt-6 pb-6 select-none overflow-hidden">
          <div className="relative inline-block mx-auto">
            {/* Watermark behind */}
            <span
              className="
        block font-poppins font-black uppercase leading-none tracking-tighter
        text-zinc-100 dark:text-zinc-900
        pointer-events-none transition-colors duration-500
      "
              style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
            >
              About
            </span>

            {/* Title centered */}
            <h2
              className="
        absolute inset-0 flex items-center justify-center
        font-poppins font-black uppercase
        text-zinc-800 dark:text-white
        z-10 transition-colors duration-500
        whitespace-nowrap
      "
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
            >
              About&nbsp;<span className="text-red-500">Me</span>
            </h2>
          </div>

          <div className="mx-auto mt-3 w-16 h-1 rounded-full bg-red-500" />
        </FadeUp>

        {/* ── Personal info + stat boxes ── */}
        <FadeUp
          delay={100}
          className="
          w-[92%] max-w-5xl mx-auto
          flex flex-col md:flex-row
          gap-10 items-start
          mb-16
        "
        >
          {/* Info columns */}
          <section className="flex flex-col sm:flex-row gap-10 flex-1">
            <div className="flex flex-col gap-5 font-['Open_Sans'] text-md text-zinc-500 dark:text-zinc-400">
              {[
                ["First Name", "Prakash Raj"],
                ["Last Name", "M"],
                ["Address", "Krishnagiri, 635-104"],
                ["Phone", "+91 94894-02877"],
                ["E-mail", "prakashmadhaiyan02@gmail.com"],
              ].map(([k, v]) => (
                <p key={k}>
                  {k} :{" "}
                  <span className="font-bold text-zinc-700 dark:text-zinc-200">
                    {v}
                  </span>
                </p>
              ))}

              <a href={resume} download className="mt-5 self-start">
                <button
                  className="
                  group flex items-center gap-0
                  font-poppins font-bold text-[12px] tracking-[0.15em] uppercase
                  pl-6 rounded-full
                  border-2 border-red-500
                  text-zinc-700 dark:text-zinc-200 bg-transparent cursor-pointer overflow-hidden
                  transition-colors duration-300 hover:bg-red-500 hover:text-white
                "
                >
                  Download CV
                  <span
                    className="
                    ml-4 flex items-center justify-center
                    w-11 h-11 rounded-full shrink-0
                    bg-red-500 text-white text-base
                    transition-colors duration-300
                    group-hover:bg-white group-hover:text-red-500
                  "
                  >
                    <FaDownload />
                  </span>
                </button>
              </a>
            </div>

            <div className="flex flex-col gap-5 font-['Open_Sans'] text-md text-zinc-500 dark:text-zinc-400">
              {[
                ["Freelance", "Available"],
                ["Skills", "Full-stack Developer"],
                ["Experience", "1.5 Years"],
                ["Languages", "English, Telugu, Tamil"],
              ].map(([k, v]) => (
                <p key={k}>
                  {k} :{" "}
                  <span className="font-bold text-zinc-700 dark:text-zinc-200">
                    {v}
                  </span>
                </p>
              ))}
            </div>
          </section>

          {/* Stat boxes */}
<section className="grid grid-cols-2 gap-4">
  {[
    { num: "1.5+", label: "Years Experience" },
    { num: "10+", label: "Projects Completed" },
    { num: "100+", label: "Positive Reviews" },
  ].map(({ num, label }) => (
    <div
      key={label}
      className="
        w-full h-36 rounded-xl
        border border-zinc-200 dark:border-zinc-700
        bg-white dark:bg-zinc-900
        flex flex-col justify-center
        p-5
        transition-all duration-300
        hover:border-red-400 hover:shadow-lg hover:shadow-red-500/10
        hover:-translate-y-1
      "
    >
      <span className="font-poppins font-black text-3xl text-red-500 leading-none">
        {num}
      </span>
      <span className="font-['Open_Sans'] text-xs font-semibold uppercase text-zinc-400 dark:text-zinc-500 mt-2 tracking-wide leading-tight">
        {label}
      </span>
    </div>
  ))}
</section>
        </FadeUp>

        {/* ── Divider ── */}
        <div className="w-1/2 mx-auto h-px bg-zinc-200 dark:bg-zinc-800 mb-16" />

        {/* ── Skills ── */}
        <FadeUp delay={100} className="w-[92%] max-w-3xl mx-auto mb-6">
          <h3 className="font-poppins font-black uppercase text-2xl sm:text-3xl mb-1">
            My <span className="text-red-500">Skills</span>
          </h3>
          <div className="w-10 h-1 rounded-full bg-red-500 mb-10" />

          <div className="flex flex-col gap-7">
            {SKILLS.map(({ label, pct, color }, i) => (
              <SkillBar
                key={label}
                label={label}
                pct={pct}
                color={color}
                delay={i * 120}
              />
            ))}
          </div>
        </FadeUp>

        {/* ── Divider ── */}
        <div className="w-1/2 mx-auto h-px bg-zinc-200 dark:bg-zinc-800 my-16" />

        {/* ── Timeline ── */}
        <FadeUp delay={100} className="w-[92%] max-w-4xl mx-auto">
          <h3 className="font-poppins font-black uppercase text-2xl sm:text-3xl mb-1">
            My <span className="text-red-500">Journey</span>
          </h3>
          <div className="w-10 h-1 rounded-full bg-red-500 mb-12" />

          <div className="flex flex-wrap gap-8">
            {TIMELINE.map((item, i) => (
              <FadeUp
                key={i}
                delay={i * 100}
                className="
                relative flex-1 min-w-70 max-w-129
                pl-7
                border-l-2 border-zinc-200 dark:border-zinc-700
              "
              >
                {/* Icon dot */}
                <span
                  className="
                  absolute -left-5.5 top-0
                  w-10 h-10 rounded-full
                  bg-red-500 text-white
                  flex items-center justify-center text-base
                  shadow-md shadow-red-500/30
                "
                >
                  {item.type === "work" ? <FaBriefcase /> : <FaGraduationCap />}
                </span>

                {/* Period badge */}
                <span
                  className="
                  inline-block mb-3
                  font-['Open_Sans'] text-xs font-bold
                  px-3 py-1 rounded-full
                  bg-zinc-100 dark:bg-zinc-800
                  text-zinc-600 dark:text-zinc-400
                  tracking-wide
                "
                >
                  {item.period}
                </span>

                {/* Role */}
                <p className="font-poppins font-bold uppercase text-sm text-zinc-800 dark:text-zinc-100 mb-0.5 leading-snug">
                  {item.role}{" "}
                  <span className="text-zinc-400 dark:text-zinc-500 font-semibold normal-case">
                    — {item.org}
                    {item.place ? `, ${item.place}` : ""}
                  </span>
                </p>

                {/* Description */}
                <p className="font-['Open_Sans'] text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-2">
                  {item.desc}
                </p>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
      </div>
    </>
  );
}
