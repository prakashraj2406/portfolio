import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoToday, IoPerson, IoTime, IoArrowBack } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { BLOGS, getBlogBySlug } from "../data/blogs";

/* ── FadeUp wrapper ── */
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
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

/* ── Code block with copy feedback ── */
function CodeBlock({ lang, code }) {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-8 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
                <span className="font-poppins text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {lang}
                </span>
                <button
                    onClick={handleCopy}
                    className={`
            font-poppins text-[11px] font-semibold uppercase tracking-wider cursor-pointer
            transition-all duration-300
            ${copied
                            ? "text-green-500 dark:text-green-400"
                            : "text-red-500 hover:text-red-600"
                        }
          `}
                >
                    {copied ? "✓ Copied!" : "Copy"}
                </button>
            </div>
            <pre className="bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 p-5 overflow-x-auto text-sm leading-relaxed">
                <code>{code}</code>
            </pre>
        </div>
    );
}


/* ── Content block renderer ── */
function ContentBlock({ block }) {
    switch (block.type) {
        case "p":
            return (
                <p className="font-['Open_Sans'] text-zinc-600 dark:text-zinc-300 text-[17px] leading-[1.85] mb-6">
                    {block.text}
                </p>
            );

        case "h2":
            return (
                <h2 className="font-poppins font-black uppercase text-xl sm:text-2xl text-zinc-800 dark:text-white mt-12 mb-5 tracking-wide">
                    {block.text}
                </h2>
            );

        case "h3":
            return (
                <h3 className="font-poppins font-bold text-lg text-zinc-800 dark:text-zinc-100 mt-8 mb-3">
                    {block.text}
                </h3>
            );

        case "code":
            return <CodeBlock lang={block.lang} code={block.code} />;

        case "list":
            return (
                <ul className="font-['Open_Sans'] text-zinc-600 dark:text-zinc-300 text-[17px] leading-[1.85] mb-6 space-y-2 pl-2">
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="text-red-500 font-bold mt-1">→</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );

        case "quote":
            return (
                <blockquote className="border-l-4 border-red-500 pl-6 my-8 italic text-zinc-700 dark:text-zinc-300 text-[18px] leading-[1.8]">
                    {block.text}
                </blockquote>
            );

        default:
            return null;
    }
}

/* ── Main Component ── */
export default function BlogDetail() {
    const { slug } = useParams();
    const blog = getBlogBySlug(slug);

    if (!blog) {
        return (
            <div className="min-h-screen w-full bg-white dark:bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">
                <h1 className="font-poppins font-black uppercase text-3xl sm:text-4xl text-zinc-800 dark:text-white mb-4">
                    Post <span className="text-red-500">Not Found</span>
                </h1>
                <p className="font-['Open_Sans'] text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">
                    We couldn't find the post you're looking for. It may have been moved
                    or unpublished.
                </p>
                <Link
                    to="/blog"
                    className="
            font-poppins font-bold text-xs uppercase tracking-wider
            px-6 py-3 rounded-full
            bg-red-500 text-white
            hover:shadow-lg hover:shadow-red-500/30
            transition-all duration-300
          "
                >
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    const currentIndex = BLOGS.findIndex((b) => b.slug === slug);
    const prevBlog = currentIndex > 0 ? BLOGS[currentIndex - 1] : null;
    const nextBlog =
        currentIndex < BLOGS.length - 1 ? BLOGS[currentIndex + 1] : null;

    return (
        <div className="min-h-screen w-full bg-white dark:bg-zinc-950 transition-colors duration-500 pb-24 md:pr-20">
            {/* Back link */}
            <FadeUp className="w-[92%] max-w-3xl mx-auto pt-10 pb-4">
                <Link
                    to="/blog"
                    className="
            inline-flex items-center gap-2
            font-poppins font-bold text-xs uppercase tracking-wider
            text-zinc-500 dark:text-zinc-400
            hover:text-red-500 dark:hover:text-red-500
            transition-colors duration-300
          "
                >
                    <IoArrowBack className="text-base" />
                    Back to All Posts
                </Link>
            </FadeUp>

            {/* Header */}
            <FadeUp
                delay={100}
                className="w-[92%] max-w-3xl mx-auto pt-2 pb-8 text-center"
            >
                <div className="flex items-center justify-center gap-2 mb-6">
                    <FaTag className="text-red-500 text-xs" />
                    <span className="font-poppins text-[11px] font-bold uppercase tracking-[0.15em] text-red-500">
                        {blog.category}
                    </span>
                </div>

                <h1
                    className="
            font-poppins font-black uppercase
            text-zinc-800 dark:text-white
            leading-[1.15] mb-6 tracking-tight
          "
                    style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
                >
                    {blog.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-zinc-500 dark:text-zinc-400 text-sm font-['Open_Sans']">
                    <span className="flex items-center gap-2">
                        <IoPerson className="text-red-500" />
                        By {blog.author}
                    </span>
                    <span className="flex items-center gap-2">
                        <IoToday className="text-red-500" />
                        {blog.date}
                    </span>
                    <span className="flex items-center gap-2">
                        <IoTime className="text-red-500" />
                        {blog.readTime}
                    </span>
                </div>

                <div className="mx-auto mt-6 w-12 h-1 rounded-full bg-red-500" />
            </FadeUp>

            {/* Hero image */}
            <FadeUp
                delay={150}
                className="w-[92%] max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
                <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-[280px] sm:h-[400px] object-cover"
                />
            </FadeUp>

            {/* Article body */}
            <FadeUp delay={200} className="w-[92%] max-w-3xl mx-auto">
                <article>
                    {blog.content.map((block, i) => (
                        <ContentBlock key={i} block={block} />
                    ))}
                </article>
            </FadeUp>

            {/* Divider */}
            <div className="w-1/2 mx-auto h-px bg-zinc-200 dark:bg-zinc-800 my-16" />

            {/* Prev / Next nav */}
            <FadeUp className="w-[92%] max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {prevBlog ? (
                        <Link
                            to={`/blog/${prevBlog.slug}`}
                            className="
                group p-6 rounded-xl
                border border-zinc-200 dark:border-zinc-800
                bg-white dark:bg-zinc-900
                hover:border-red-400 hover:shadow-lg hover:shadow-red-500/10
                transition-all duration-300
              "
                        >
                            <span className="font-poppins text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 block">
                                ← Previous Post
                            </span>
                            <span className="font-poppins font-bold text-zinc-800 dark:text-white group-hover:text-red-500 transition-colors">
                                {prevBlog.title}
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextBlog ? (
                        <Link
                            to={`/blog/${nextBlog.slug}`}
                            className="
                group p-6 rounded-xl text-right
                border border-zinc-200 dark:border-zinc-800
                bg-white dark:bg-zinc-900
                hover:border-red-400 hover:shadow-lg hover:shadow-red-500/10
                transition-all duration-300
              "
                        >
                            <span className="font-poppins text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 block">
                                Next Post →
                            </span>
                            <span className="font-poppins font-bold text-zinc-800 dark:text-white group-hover:text-red-500 transition-colors">
                                {nextBlog.title}
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </FadeUp>
        </div>
    );
}