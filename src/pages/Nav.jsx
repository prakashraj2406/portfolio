import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import { MdBrightness5 } from "react-icons/md";
import {
  FaHome,
  FaBriefcase,
  FaEnvelopeOpen,
  FaComments,
} from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

const navLinks = [
  { to: "/", label: "Home", Icon: FaHome },
  { to: "/about", label: "About", Icon: IoPerson },
  { to: "/portfolio", label: "Portfolio", Icon: FaBriefcase },
  { to: "/contact", label: "Contact", Icon: FaEnvelopeOpen },
  { to: "/blog", label: "Blog", Icon: FaComments },
];

export default function Nav() {
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  /* ── Reusable class blocks ── */
  const circle =
    "w-11 h-11 min-w-[2.75rem] min-h-[2.75rem] rounded-full flex items-center justify-center";

  const baseBtn = `${circle} border transition-all duration-300 ease-out cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400`;

  const inactiveLink = `
    bg-white dark:bg-zinc-800/90 border-zinc-200 dark:border-zinc-700
    text-zinc-400 dark:text-zinc-400 shadow-sm
    hover:bg-red-500 hover:border-red-500 hover:text-white
    hover:shadow-md hover:shadow-red-500/25
    dark:hover:bg-red-500 dark:hover:border-red-500 dark:hover:text-white
  `;

  const activeLink = `
    bg-red-500 border-red-500 text-white
    shadow-md shadow-red-500/30 dark:shadow-red-700/40 scale-110
  `;

  return (
    <>
      {/* ══════════════════════════════════════════
          DESKTOP — fixed right sidebar (md+)
      ══════════════════════════════════════════ */}
      <aside className="hidden md:flex fixed right-5 top-0 z-50 h-screen flex-col items-center justify-center gap-3 pointer-events-none">
        {/* Theme toggle */}
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
          className={`
            pointer-events-auto mb-3 text-xl
            ${baseBtn}
            bg-white dark:bg-zinc-800/90 border-zinc-200 dark:border-zinc-700
            text-zinc-500 dark:text-zinc-300 shadow-sm
            hover:text-red-500 hover:border-red-300
            dark:hover:text-red-400 dark:hover:border-red-600
          `}
        >
          {dark ? <MdBrightness5 /> : <CiDark />}
        </button>

        {/* Divider dot */}
        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-600 mb-1" />

        {/* Nav links */}
        {navLinks.map(({ to, label, Icon }) => (
          <div key={to} className="pointer-events-auto relative group">
            <Link
              to={to}
              aria-label={label}
              className={`${baseBtn} text-[1.05rem] ${isActive(to) ? activeLink : inactiveLink}`}
            >
              <Icon />
            </Link>

            {/* Tooltip */}
            <span
              className="
              absolute right-13 top-1/2 -translate-y-1/2
              px-3 py-1.5 rounded-lg
              bg-zinc-900 dark:bg-zinc-100
              text-white dark:text-zinc-900
              text-[11px] font-semibold font-poppins tracking-widest uppercase whitespace-nowrap
              opacity-0 pointer-events-none translate-x-2
              group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-200 shadow-lg
            "
            >
              {label}
              {/* Arrow pointing right */}
              <span
                className="
                absolute left-full top-1/2 -translate-y-1/2
                border-4 border-transparent border-l-zinc-900 dark:border-l-zinc-100
              "
              />
            </span>
          </div>
        ))}
      </aside>

      {/* ══════════════════════════════════════════
          MOBILE — fixed bottom bar (< md)
      ══════════════════════════════════════════ */}
      <nav
        className="
        md:hidden fixed bottom-0 left-0 right-0 z-50
        bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md
        border-t border-zinc-200 dark:border-zinc-700/60
        px-2 pt-2 pb-3
        flex items-center justify-around
      "
      >
        {navLinks.map(({ to, label, Icon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              aria-label={label}
              className="flex flex-col items-center gap-0.5 group"
            >
              <span
                className={`
                w-10 h-10 min-w-10 rounded-full
                flex items-center justify-center text-base
                transition-all duration-300
                ${
                  active
                    ? "bg-red-500 text-white shadow-md shadow-red-500/30 scale-110"
                    : "text-zinc-400 dark:text-zinc-500 group-hover:text-red-500 dark:group-hover:text-red-400"
                }
              `}
              >
                <Icon />
              </span>
              <span
                className={`
                text-[9px] font-semibold font-poppins tracking-widest uppercase
                transition-colors duration-300
                ${
                  active
                    ? "text-red-500"
                    : "text-zinc-400 dark:text-zinc-500 group-hover:text-red-400"
                }
              `}
              >
                {label}
              </span>
            </Link>
          );
        })}

        {/* Theme toggle */}
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
          className="flex flex-col items-center gap-0.5 group"
        >
          <span
            className="
            w-10 h-10 min-w-10 rounded-full
            flex items-center justify-center text-base
            text-zinc-400 dark:text-zinc-500
            group-hover:text-red-500 dark:group-hover:text-red-400
            transition-colors duration-300
          "
          >
            {dark ? <MdBrightness5 /> : <CiDark />}
          </span>
          <span className="text-[9px] font-semibold font-poppins tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
            {dark ? "Light" : "Dark"}
          </span>
        </button>
      </nav>

      {/* Spacer so page content clears the mobile nav */}
      {/* <div className="md:hidden h-18" /> */}
    </>
  );
}
