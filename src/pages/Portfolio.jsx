import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

import portfolio from "../assets/portfolio project.png";
import project1  from "../assets/restaurent project.png";
import project2  from "../assets/bootstrap project.png";
import project3  from "../assets/project-2.jpg";
import project4  from "../assets/petstore project.png";
import project5  from "../assets/project-5.jpg";
import project6  from "../assets/project-6.jpg";
import project7  from "../assets/project-7.jpg";
import project8  from "../assets/project-8.jpg";

/* ── Project data ── */
const PROJECTS = [
  { img: portfolio, title: "Portfolio",   desc: "Personal portfolio using React.js",                          url: "https://prakash-raj-portfolio-website.netlify.app/" },
  { img: project1,  title: "Project 1",   desc: "Restaurant website using HTML, CSS",                         url: "https://prakashraj2404.github.io/Restaurent/" },
  { img: project2,  title: "Project 2",   desc: "Learning Platform using HTML, Bootstrap",                    url: "https://prakashraj2404.github.io/Bootstrap-Project/" },
  { img: project3,  title: "Project 3",   desc: "Photoshop project (Group) — HTML, CSS, Bootstrap",           url: "https://prakashraj2404.github.io/Group-Project/" },
  { img: project4,  title: "Project 4",   desc: "Petstore project (Group) — HTML, CSS, Bootstrap",            url: "https://prakashraj2404.github.io/Petstore-Project/" },
  { img: project5,  title: "Project 5",   desc: "JS Project — On Going",                                      url: "" },
  { img: project6,  title: "Coming Soon", desc: "",                                                            url: "" },
  { img: project7,  title: "Coming Soon", desc: "",                                                            url: "" },
  { img: project8,  title: "Coming Soon", desc: "",                                                            url: "" },
];

/* ── FadeUp animation wrapper ── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
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

/* ── Project card ── */
function ProjectCard({ img, title, desc, url, delay }) {
  const isSoon = title === "Coming Soon";

  return (
    <FadeUp delay={delay} className="group relative w-77.5 h-49 rounded-lg overflow-hidden shrink-0 shadow-md">
      {/* Image */}
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay — slides up from bottom */}
      <div className="
        absolute inset-x-0 bottom-0 h-full
        bg-zinc-900/95 dark:bg-black/95
        flex flex-col items-center justify-center
        gap-3 px-5
        translate-y-full group-hover:translate-y-0
        transition-transform duration-500 ease-out
        rounded-lg
      ">
        {isSoon ? (
          <p className="font-poppins font-bold text-base uppercase tracking-widest text-zinc-400">
            Coming Soon
          </p>
        ) : (
          <>
            <h3 className="font-poppins font-black text-lg uppercase tracking-wide text-white">
              {title}
            </h3>
            <p className="font-['Open_Sans'] text-sm text-zinc-300 text-center leading-snug">
              {desc}
            </p>
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer">
                <button className="
                  flex items-center gap-2
                  font-poppins font-bold text-xs uppercase tracking-widest
                  px-5 py-2 rounded-full
                  border-2 border-red-500 text-white
                  bg-transparent cursor-pointer
                  transition-colors duration-300
                  hover:bg-red-500
                ">
                  Visit Site <FaExternalLinkAlt className="text-[10px]" />
                </button>
              </a>
            )}
          </>
        )}
      </div>
    </FadeUp>
  );
}

/* ══════════════════════════════
   MAIN COMPONENT
══════════════════════════════ */
export default function Portfolio() {
  return (
    <div className="
      min-h-screen w-full text-center
      bg-white dark:bg-zinc-950
      transition-colors duration-500
      pb-24 md:pr-20
    ">

      {/* ── Page header — same pattern as About ── */}
      <FadeUp className="relative text-center pt-10 pb-6 select-none overflow-hidden">
        <div className="relative inline-block mx-auto">
          {/* Watermark */}
          <span
            className="
              block font-poppins font-black uppercase leading-none tracking-tighter
              text-zinc-100 dark:text-zinc-900
              pointer-events-none transition-colors duration-500
            "
            style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
          >
            Works
          </span>
          {/* Foreground title */}
          <h2
            className="
              absolute inset-0 flex items-center justify-center
              font-poppins font-black uppercase
              text-zinc-800 dark:text-white
              z-10 transition-colors duration-500 whitespace-nowrap
            "
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
          >
            <span className="text-zinc-500 dark:text-zinc-400">My</span>
            &nbsp;
            <span className="text-red-500">Portfolio</span>
          </h2>
        </div>
        <div className="mx-auto mt-3 w-16 h-1 rounded-full bg-red-500" />
      </FadeUp>

      {/* ── Projects grid ── */}
      <section className="
        flex flex-wrap justify-center items-center
        gap-8
        pt-6 pb-4
      ">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={i} {...p} delay={i * 80} />
        ))}
      </section>

    </div>
  );
}