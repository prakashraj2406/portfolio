import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { RiMailOpenFill } from "react-icons/ri";
import { FaSquarePhone } from "react-icons/fa6";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

/* ─── EmailJS config ─── */
const EJS_SERVICE = "service_fikfrsd";
const EJS_TEMPLATE = "template_mqrix25";
const EJS_KEY = "7pEh6v6GdpXjcr9HZ";

/* ─── Social links ─── */
const SOCIALS = [
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaXTwitter, href: "#", label: "Twitter" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  {
    Icon: FaLinkedin,
    href: "https://www.linkedin.com/in/prakash-raj-m/",
    label: "LinkedIn",
  },
  {
    Icon: FaGithub,
    href: "https://github.com/prakashraj2406",
    label: "GitHub",
  },
];

/* ─── FadeUp wrapper ─── */
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Toast popup ─── */
function Toast({ type, message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, []);

  const isSuccess = type === "success";

  return (
    <div
      className={`
      fixed top-8 left-1/2 -translate-x-1/2 z-999
      flex items-center gap-3
      px-6 py-4 rounded-2xl shadow-2xl
      font-poppins font-semibold text-sm uppercase tracking-wide
      transition-all duration-300
      ${
        isSuccess
          ? "bg-green-500 text-white shadow-green-500/30"
          : "bg-red-500  text-white shadow-red-500/30"
      }
    `}
    >
      {isSuccess ? (
        <FaCheckCircle className="text-xl shrink-0" />
      ) : (
        <FaTimesCircle className="text-xl shrink-0" />
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <FaTimes />
      </button>
    </div>
  );
}

/* ─── Field error text ─── */
const Err = ({ msg }) =>
  msg ? (
    <span className="text-red-500 text-[11px] font-poppins mt-1 pl-1">
      {msg}
    </span>
  ) : null;

/* ════════════════════════════════
   MAIN COMPONENT
════════════════════════════════ */
export default function Contact() {
  const form = useRef();

  const [fields, setFields] = useState({
    from_name: "",
    from_mail: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null); // { type, message }

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!fields.from_name.trim()) e.from_name = "Name is required.";
    else if (fields.from_name.trim().length < 2)
      e.from_name = "Name must be at least 2 characters.";

    if (!fields.from_mail.trim()) e.from_mail = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.from_mail))
      e.from_mail = "Enter a valid email address.";

    if (!fields.subject.trim()) e.subject = "Subject is required.";
    else if (fields.subject.trim().length < 3)
      e.subject = "Subject must be at least 3 characters.";

    if (!fields.message.trim()) e.message = "Message is required.";
    else if (fields.message.trim().length < 10)
      e.message = "Message must be at least 10 characters.";

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((p) => ({ ...p, [name]: value }));
    // Clear error on type
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSending(true);
    emailjs
      .sendForm(EJS_SERVICE, EJS_TEMPLATE, form.current, { publicKey: EJS_KEY })
      .then(() => {
        setToast({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFields({ from_name: "", from_mail: "", subject: "", message: "" });
        setErrors({});
      })
      .catch(() => {
        setToast({
          type: "error",
          message: "Failed to send. Please try again or email me directly.",
        });
      })
      .finally(() => setSending(false));
  };

  /* ── Shared input classes ── */
  const inputBase = (field) => `
    w-full px-5 py-3.5 rounded-2xl
    bg-white dark:bg-zinc-900
    border-2 transition-colors duration-200 outline-none
    font-['Open_Sans'] text-sm text-zinc-700 dark:text-zinc-200
    placeholder:text-zinc-400 dark:placeholder:text-zinc-600
    placeholder:uppercase placeholder:tracking-wider placeholder:text-xs
    ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-red-300 dark:border-zinc-700 focus:border-red-500 dark:focus:border-red-500"
    }
  `;

  return (
    <>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div
        className="
        min-h-screen w-full
        bg-white dark:bg-zinc-950
        transition-colors duration-500
        pb-24 md:pr-20
      "
      >
        {/* ── Page header — same pattern as About / Portfolio ── */}
        <FadeUp className="relative text-center pt-10 pb-6 select-none overflow-hidden">
          <div className="relative inline-block mx-auto">
            <span
              className="
                block font-poppins font-black uppercase leading-none tracking-tighter
                text-zinc-100 dark:text-zinc-900
                pointer-events-none transition-colors duration-500
              "
              style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
            >
              Contact
            </span>
            <h2
              className="
                absolute inset-0 flex items-center justify-center
                font-poppins font-black uppercase
                text-zinc-800 dark:text-white
                z-10 transition-colors duration-500 whitespace-nowrap
              "
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
            >
              <span className="text-zinc-500 dark:text-zinc-400">Get In</span>
              &nbsp;<span className="text-red-500">Touch</span>
            </h2>
          </div>
          <div className="mx-auto mt-3 w-16 h-1 rounded-full bg-red-500" />
        </FadeUp>

        {/* ── Main content ── */}
        <div
          className="
          flex flex-wrap justify-center items-start
          gap-10 px-2 sm:px-6 pt-4
          max-w-6xl mx-auto
        "
        >
          {/* ── LEFT — Info ── */}
          <FadeUp delay={100} className="flex flex-col gap-6 w-full sm:w-72.5">
            <h3
              className="
              font-poppins font-bold uppercase text-2xl
              text-zinc-600 dark:text-zinc-300
              transition-colors duration-500
            "
            >
              Don't Be Shy!
            </h3>

            <p
              className="
              font-['Open_Sans'] text-sm leading-7
              text-zinc-500 dark:text-zinc-400
              transition-colors duration-500
            "
            >
              Feel free to get in touch with me. I am always open to discussing
              new projects, creative ideas or opportunities to be part of your
              visions.
            </p>

            {/* Mail & Phone */}
            <div className="flex flex-col gap-5">
              {[
                {
                  Icon: RiMailOpenFill,
                  label: "Mail Me",
                  value: "prakashmadhaiyan02@gmail.com",
                  href: "mailto:prakashmadhaiyan02@gmail.com",
                },
                {
                  Icon: FaSquarePhone,
                  label: "Call Me",
                  value: "+91 94894-02877",
                  href: "tel:+919489402877",
                },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <Icon className="text-4xl text-red-500 shrink-0" />
                  <div>
                    <p className="font-['Open_Sans'] text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      {label}
                    </p>
                    <a
                      href={href}
                      className="
                        font-poppins text-[13px] font-bold
                        text-zinc-600 dark:text-zinc-300
                        hover:text-red-500 dark:hover:text-red-400
                        transition-colors duration-200
                        break-all
                      "
                    >
                      {value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-3 flex-wrap">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="
                    w-10 h-10 rounded-full flex items-center justify-center
                    bg-zinc-100 dark:bg-zinc-800
                    text-zinc-500 dark:text-zinc-400 text-base
                    border border-zinc-200 dark:border-zinc-700
                    hover:bg-red-500 hover:text-white hover:border-red-500
                    dark:hover:bg-red-500 dark:hover:text-white dark:hover:border-red-500
                    transition-all duration-300
                  "
                >
                  <Icon />
                </a>
              ))}
            </div>
          </FadeUp>

          {/* ── RIGHT — Form ── */}
          <FadeUp
            delay={200}
            className="
            flex-1 min-w-75 max-w-2xl
            bg-white dark:bg-zinc-900
            border border-zinc-100 dark:border-zinc-800
            rounded-2xl shadow-lg shadow-black/[0.07] dark:shadow-black/40
            p-6 sm:p-8
            transition-colors duration-500
          "
          >
            <form
              ref={form}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Row 1 — Name + Email + Subject */}
              <div className="flex flex-wrap gap-4">
                {/* Name */}
                <div className="flex flex-col flex-1 min-w-45">
                  <input
                    type="text"
                    name="from_name"
                    value={fields.from_name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={inputBase("from_name")}
                  />
                  <Err msg={errors.from_name} />
                </div>

                {/* Email */}
                <div className="flex flex-col flex-1 min-w-45">
                  <input
                    type="email"
                    name="from_mail"
                    value={fields.from_mail}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={inputBase("from_mail")}
                  />
                  <Err msg={errors.from_mail} />
                </div>

                {/* Subject */}
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="subject"
                    value={fields.subject}
                    onChange={handleChange}
                    placeholder="Your Subject"
                    className={inputBase("subject")}
                  />
                  <Err msg={errors.subject} />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <textarea
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={7}
                  className={`${inputBase("message")} resize-vertical`}
                />
                <Err msg={errors.message} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="
                  group self-start
                  flex items-center
                  font-poppins font-bold text-[12px] tracking-[0.15em] uppercase
                  pl-7 rounded-full
                  border-2 border-red-500
                  text-zinc-700 dark:text-zinc-200
                  bg-transparent cursor-pointer overflow-hidden
                  transition-colors duration-300
                  hover:bg-red-500 hover:text-white
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {sending ? "Sending…" : "Send Message"}
                <span
                  className="
                  ml-4 flex items-center justify-center
                  w-12 h-12 rounded-full shrink-0
                  bg-red-500 text-white text-lg
                  transition-colors duration-300
                  group-hover:bg-white group-hover:text-red-500
                "
                >
                  <FaTelegramPlane />
                </span>
              </button>
            </form>
          </FadeUp>
        </div>
      </div>
    </>
  );
}
