import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/ti";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Prakash from "../assets/Prakash.png";
import Resume from "../assets/Prakash_Raj.pdf";

/* ── Typewriter hook ── */
const ROLES = [
  "Web Developer.",
  "UI Designer.",
  "MERN Stack Dev.",
  "Problem Solver.",
];

function useTypewriter(words, speed = 100, pause = 1800) {
  const elRef = useRef(null);
  useEffect(() => {
    let wi = 0, ci = 0, deleting = false, timer;
    const tick = () => {
      const word = words[wi];
      if (elRef.current) elRef.current.textContent = word.slice(0, ci);
      if (!deleting && ci === word.length) {
        timer = setTimeout(() => { deleting = true; tick(); }, pause);
        return;
      }
      if (deleting && ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
      ci += deleting ? -1 : 1;
      timer = setTimeout(tick, deleting ? speed / 2 : speed);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);
  return elRef;
}

export default function Home() {
  const typeRef = useTypewriter(ROLES);

  return (
    <main className="
      min-h-screen w-full
      bg-white dark:bg-zinc-950
      flex items-stretch
      transition-colors duration-500
      overflow-hidden
    ">

      {/* ══════════════════════════════════
          LEFT — Image Panel (desktop only)
      ══════════════════════════════════ */}
      <section className="
        hidden md:flex
        relative w-[40%] shrink-0
        items-center justify-center
        overflow-hidden
      ">
        {/* Red diagonal slash */}
        <div className="
          absolute inset-0
          bg-red-500 dark:bg-red-600
          [clip-path:polygon(0_0,38%_0,58%_100%,0%_100%)]
        " />

        {/* Photo card — static, no animation on desktop */}
        <div className="relative z-10 mt-8 ml-14">
          {/* Soft backing frame */}
          <div className="
            absolute -inset-2 rounded-4xl
            bg-white/25 dark:bg-white/10
            backdrop-blur-sm
          " />

          <img
            src={Prakash}
            alt="Prakash Raj"
            className="
              relative z-10
              h-[calc(100vh-100px)] max-h-150 w-95
              object-cover object-top
              rounded-[1.75rem]
              shadow-2xl shadow-black/25
            "
          />

          {/* Badge — Projects */}
          <div className="
            absolute -left-10 top-14 z-20
            bg-white dark:bg-zinc-800
            border border-zinc-100 dark:border-zinc-700
            rounded-2xl shadow-xl
            px-4 py-3 flex flex-col items-center min-w-21
          ">
            <span className="text-2xl font-black text-red-500 font-poppins leading-none">10+</span>
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-poppins mt-0.5">
              Projects
            </span>
          </div>

          {/* Badge — Experience */}
          <div className="
            absolute -right-8 bottom-20 z-20
            bg-white dark:bg-zinc-800
            border border-zinc-100 dark:border-zinc-700
            rounded-2xl shadow-xl
            px-4 py-3 flex flex-col items-center min-w-21
          ">
            <span className="text-2xl font-black text-red-500 font-poppins leading-none">1.5+</span>
            <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-poppins mt-0.5">
              Years Exp.
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          RIGHT — Content
      ══════════════════════════════════ */}
      <section className="
        flex-1 flex flex-col justify-center
        px-8 sm:px-10 md:px-14 lg:px-16
        py-20 md:py-0
        pr-16 md:pr-20
      ">

        {/* Eyebrow label */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-10 h-0.5 bg-red-500 rounded-full" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-red-500 font-poppins">
            Portfolio
          </span>
        </div>

        {/* ── Mobile photo — spinning ring circle ── */}
        <div className="md:hidden flex justify-center mb-10">
          <div className="relative w-52 h-52">
            {/* Conic spinning ring — mobile only */}
            <div className="
              absolute inset-0 rounded-full
              bg-[conic-gradient(from_0deg,#ef4444,#fca5a5,#ffffff,#ef4444)]
              animate-spin [animation-duration:4s]
            " />
            {/* Gap between ring and photo */}
            <div className="absolute inset-1.25 rounded-full bg-white dark:bg-zinc-950 transition-colors duration-500" />
            <img
              src={Prakash}
              alt="Prakash Raj"
              className="
                absolute inset-2.25 rounded-full
                object-cover object-top
                w-[calc(100%-18px)] h-[calc(100%-18px)]
              "
            />
          </div>
        </div>

        {/* Name heading */}
        <h1 className="
          font-poppins font-black uppercase leading-[1.05]
          text-[2.4rem] sm:text-5xl lg:text-[3.6rem]
          text-zinc-900 dark:text-white
          mb-3 transition-colors duration-500
        ">
          I'm <span className="text-red-500">Prakash</span> Raj.
        </h1>

        {/* Typewriter line */}
        <h2 className="
          font-poppins font-bold uppercase
          text-lg sm:text-2xl lg:text-[1.6rem]
          text-zinc-400 dark:text-zinc-500
          mb-5 flex items-center gap-1.5 min-h-9
          transition-colors duration-500
        ">
          <span ref={typeRef} className="text-zinc-700 dark:text-zinc-300 transition-colors duration-500" />
          {/* blinking cursor */}
          <span className="inline-block w-0.5 h-5 sm:h-6 bg-red-500 animate-pulse" />
        </h2>

        {/* Red accent bar */}
        <div className="w-14 h-0.75 rounded-full bg-red-500 mb-7" />

        {/* Bio paragraph */}
        <p className="
          font-['Open_Sans'] text-base sm:text-[1.05rem] leading-[1.95]
          text-zinc-500 dark:text-zinc-400
          max-w-120 mb-10
          transition-colors duration-500
        ">
          I'm a{" "}
          <span className="font-bold text-zinc-800 dark:text-zinc-200">Software Developer</span>
          {" "}with{" "}
          <span className="font-bold text-zinc-800 dark:text-zinc-200">1.5 years of experience</span>
          {" "}building scalable web applications. Specialized in the{" "}
          <span className="font-bold text-zinc-800 dark:text-zinc-200">MERN stack</span>
          , focused on crafting clean, performant &amp; user‑friendly experiences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-10">

          {/* Primary — More About Me */}
          <Link to="/about">
            <button className="
              group
              flex items-center
              font-poppins font-bold text-[12px] tracking-[0.15em] uppercase
              pl-7 rounded-full
              border-2 border-red-500
              text-zinc-700 dark:text-zinc-200
              bg-transparent cursor-pointer overflow-hidden
              transition-colors duration-300
              hover:bg-red-500 hover:text-white
            ">
              More About Me
              <span className="
                ml-4 flex items-center justify-center
                w-12 h-12 rounded-full shrink-0
                bg-red-500 text-white text-lg
                transition-colors duration-300
                group-hover:bg-white group-hover:text-red-500
              ">
                <TiArrowRightThick />
              </span>
            </button>
          </Link>

          {/* Secondary — Download CV */}
          <a
            href={Resume}
            download
            className="
              font-poppins font-bold text-[12px] tracking-[0.15em] uppercase
              px-7 py-3.5 rounded-full
              border-2 border-zinc-300 dark:border-zinc-600
              text-zinc-500 dark:text-zinc-400
              transition-all duration-300
              hover:border-red-500 hover:text-red-500
              dark:hover:border-red-500 dark:hover:text-red-400
            "
          >
            Download CV
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-500 font-poppins">
            Find me on
          </span>
          <div className="w-8 h-px bg-zinc-300 dark:bg-zinc-600 transition-colors duration-500" />

          {[
            { href: "https://github.com",   Icon: FaGithub,   label: "GitHub"   },
            { href: "https://linkedin.com", Icon: FaLinkedin, label: "LinkedIn" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="
                w-10 h-10 rounded-full
                flex items-center justify-center text-base
                border-2 border-zinc-200 dark:border-zinc-700
                text-zinc-400 dark:text-zinc-500
                transition-all duration-300
                hover:bg-red-500 hover:border-red-500 hover:text-white
                dark:hover:bg-red-500 dark:hover:border-red-500 dark:hover:text-white
              "
            >
              <Icon />
            </a>
          ))}
        </div>

      </section>
    </main>
  );
}