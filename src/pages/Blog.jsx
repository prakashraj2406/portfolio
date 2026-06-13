import { useEffect, useRef, useState } from "react";
import { IoToday, IoPerson } from "react-icons/io5";
import { FaLink } from "react-icons/fa";

import Blog1 from "../assets/project-6.jpg";
import Blog2 from "../assets/project-2.jpg";
import Blog3 from "../assets/project-7.jpg";
import Blog4 from "../assets/blog4.jpg";
import Blog5 from "../assets/blog5.jpg";
import Blog6 from "../assets/blog6.jpg";

/* ── Blog data ── */
const BLOGS = [
  {
    img: Blog1,
    date: "21st May, 2021",
    author: "Admin",
    title: "Web Developer",
    excerpt: "Jim Morrison says — when the music's over, turn off the light.",
    url: "#",
  },
  {
    img: Blog2,
    date: "8th Aug, 2022",
    author: "Prakash",
    title: "Branding",
    excerpt: "How to be appreciated for your hard work as a developer.",
    url: "#",
  },
  {
    img: Blog3,
    date: "14th Dec, 2022",
    author: "Leo",
    title: "Social Media",
    excerpt: "How designers and developers can collaborate better.",
    url: "#",
  },
  {
    img: Blog4,
    date: "17th Mar, 2024",
    author: "Jeru",
    title: "UI/UX Design",
    excerpt: "Angular team enlarges to request blog — team work by design.",
    url: "#",
  },
  {
    img: Blog5,
    date: "9th July, 2023",
    author: "Ram",
    title: "Responsive Design",
    excerpt: "How to create a responsive website using HTML and CSS.",
    url: "#",
  },
  {
    img: Blog6,
    date: "24th March, 2023",
    author: "Subash",
    title: "Shopify",
    excerpt: "We build teams that enlarge requests into blog-ready goals.",
    url: "#",
  },
];

/* ── FadeUp wrapper ── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
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
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Blog card ── */
function BlogCard({ img, date, author, title, excerpt, url, delay }) {
  return (
    <FadeUp
      delay={delay}
      className="
        relative
        w-full
        max-w-95
        min-h-125
        bg-white dark:bg-zinc-900
        rounded-[20px]
        overflow-hidden
        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        transition-all duration-500
        flex flex-col
        hover:-translate-y-2
      "
    >
      {/* Image */}
      <div className="w-full h-60 overflow-hidden rounded-t-[20px]">
        <img
          src={img}
          alt={title}
          className="
            w-full h-full object-cover
            transition-transform duration-2000
            hover:scale-110
            cursor-pointer
          "
        />
      </div>

      {/* Date + Author */}
      <div
        className="
          absolute top-55 left-1/2 -translate-x-1/2
          flex items-center gap-2
          bg-zinc-900 dark:bg-black
          px-4 py-2 rounded-xl
          shadow-lg z-10
          whitespace-nowrap
        "
      >
        <IoToday className="text-red-500 text-sm" />
        <span className="text-white text-xs">{date}</span>
        <IoPerson className="text-red-500 text-sm" />
        <span className="text-white text-xs">By {author}</span>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center px-6 pt-12 pb-6 flex-1">
        <h3 className="font-poppins font-bold text-[22px] text-zinc-800 dark:text-white mb-3">
          {title}
        </h3>

        <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-7 mb-6">
          {excerpt}
        </p>

        <a href={url} target="_blank" rel="noopener noreferrer">
          <button
            className="
              flex items-center gap-2
              bg-red-500 text-white
              px-6 py-3 rounded-full
              font-semibold text-sm
              transition-all duration-300
              hover:px-8 hover:shadow-lg hover:shadow-red-500/30
            "
          >
            Read More
            <span className="bg-white text-red-500 w-7 h-7 rounded-full flex items-center justify-center text-xs">
              <FaLink />
            </span>
          </button>
        </a>
      </div>
    </FadeUp>
  );
}

/* ── Main Component ── */
export default function Blog() {
  return (
    <div
      className="
        min-h-screen w-full
        bg-white dark:bg-zinc-950
        transition-colors duration-500
        pb-24 md:pr-20
      "
    >
      {/* Header */}
      <FadeUp className="relative text-center pt-10 pb-6 select-none overflow-hidden">
        <div className="relative inline-block mx-auto">
          <span
            className="
              block font-poppins font-black uppercase
              leading-none tracking-tighter
              text-zinc-100 dark:text-zinc-900
            "
            style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
          >
            Posts
          </span>

          <h2
            className="
              absolute inset-0 flex items-center justify-center
              font-poppins font-black uppercase
              text-zinc-800 dark:text-white
              whitespace-nowrap
            "
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
          >
            <span className="text-zinc-500 dark:text-zinc-400">My</span>
            &nbsp;<span className="text-red-500">Blog</span>
          </h2>
        </div>

        <div className="mx-auto mt-3 w-16 h-1 rounded-full bg-red-500" />
      </FadeUp>

      {/* Cards Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
            place-items-center
          "
        >
          {BLOGS.map((blog, index) => (
            <BlogCard key={index} {...blog} delay={index * 100} />
          ))}
        </div>
      </div>
    </div>
  );
}
