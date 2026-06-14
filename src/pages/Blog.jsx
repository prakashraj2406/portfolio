import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoToday, IoPerson, IoTime, IoArrowForward } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { BLOGS } from "../data/blogs";

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
function BlogCard({
  img,
  date,
  author,
  title,
  excerpt,
  slug,
  category,
  readTime,
  delay,
}) {
  return (
    <FadeUp delay={delay} className="w-full">
      <Link to={`/blog/${slug}`} className="block group h-full">
        <article
          className="
            relative h-full flex flex-col
            bg-white dark:bg-zinc-900
            rounded-2xl overflow-hidden
            border border-zinc-200 dark:border-zinc-800
            shadow-sm dark:shadow-none
            hover:border-red-400 dark:hover:border-red-500
            hover:shadow-xl hover:shadow-red-500/10
            hover:-translate-y-2
            transition-all duration-500
            cursor-pointer
          "
        >
          {/* Preview image with category overlay */}
          <div className="relative w-full h-56 overflow-hidden">
            <img
              src={img}
              alt={title}
              className="
                w-full h-full object-cover
                transition-transform duration-700
                group-hover:scale-110
              "
            />
            {/* Gradient overlay for category readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Category pill */}
            {category && (
              <span
                className="
                  absolute top-4 left-4
                  inline-flex items-center gap-1.5
                  bg-red-500 text-white
                  font-poppins text-[10px] font-bold uppercase tracking-wider
                  px-3 py-1.5 rounded-full
                  shadow-lg shadow-red-500/30
                "
              >
                <FaTag className="text-[9px]" />
                {category}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6">
            {/* Meta row — date + read time */}
            <div className="flex items-center gap-4 mb-3 text-zinc-400 dark:text-zinc-500 text-xs font-['Open_Sans']">
              <span className="flex items-center gap-1.5">
                <IoToday className="text-red-500 text-sm" />
                {date}
              </span>
              {readTime && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <span className="flex items-center gap-1.5">
                    <IoTime className="text-red-500 text-sm" />
                    {readTime}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h3
              className="
                font-poppins font-bold text-[19px] leading-tight
                text-zinc-800 dark:text-white
                mb-3 line-clamp-2
                group-hover:text-red-500 dark:group-hover:text-red-500
                transition-colors duration-300
              "
            >
              {title}
            </h3>

            {/* Excerpt */}
            <p className="font-['Open_Sans'] text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
              {excerpt}
            </p>

            {/* Footer — author + read more */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-['Open_Sans']">
                <IoPerson className="text-red-500 text-sm" />
                By <span className="font-semibold text-zinc-700 dark:text-zinc-200">{author}</span>
              </span>

              <span
                className="
                  inline-flex items-center gap-1.5
                  font-poppins text-xs font-bold uppercase tracking-wider
                  text-red-500
                  group-hover:gap-3
                  transition-all duration-300
                "
              >
                Read More
                <IoArrowForward className="text-sm" />
              </span>
            </div>
          </div>
        </article>
      </Link>
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

        <p className="font-['Open_Sans'] text-zinc-500 dark:text-zinc-400 text-sm sm:text-base mt-6 max-w-xl mx-auto px-4">
          Field notes from shipping production systems — payroll, auth, cloud
          storage, and the lessons that don't make it into tutorials.
        </p>
      </FadeUp>

      {/* Cards Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6 lg:gap-8
          "
        >
          {BLOGS.map((blog, index) => (
            <BlogCard key={blog.slug} {...blog} delay={index * 100} />
          ))}
        </div>
      </div>
    </div>
  );
}