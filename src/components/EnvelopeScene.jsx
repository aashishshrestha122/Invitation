import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MusicToggle from "./MusicToggle";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 11) % 100}%`,
  size: 8 + ((i * 7) % 18),
  duration: 8 + (i % 6),
  delay: (i % 5) * 0.3,
}));

const flowerPetals = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 7) % 100}%`,
  size: 16 + ((i * 7) % 13),
  duration: 4.2 + (i % 5) * 0.38,
  delay: (i % 7) * 0.12,
  sway: i % 2 === 0 ? 1 : -1,
  color: [
    "#ff1744",
    "#ffea00",
    "#00e676",
    "#00b0ff",
    "#d500f9",
    "#ff6d00",
    "#f50057",
    "#ffffff",
  ][i % 8],
}));

const COUNTDOWN_TARGET = new Date("2026-12-02T00:00:00");
const RSVP_EMAIL = "aashishshrestha12@gmail.com";

function getRsvpMailto(isAttending) {
  const response = isAttending
    ? "We are happy to attend your wedding!"
    : "We are sorry we cannot attend your wedding.";
  const body = `${response}\n\nGuest name(s):\nNumber attending (if applicable):`;

  return `mailto:${RSVP_EMAIL}?subject=${encodeURIComponent(
    `Wedding RSVP: ${isAttending ? "Going" : "Unable to attend"}`,
  )}&body=${encodeURIComponent(body)}`;
}

function FlowerBloom({ id, color }) {
  const gradientId = `flower-petal-gradient-${id}`;

  return (
    <svg viewBox="0 0 48 48" width="1em" height="1em" aria-hidden="true">
      <defs>
        <radialGradient id={gradientId} cx="30%" cy="24%" r="78%">
          <stop offset="0%" stopColor="#fff9da" />
          <stop offset="38%" stopColor={color} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      {Array.from({ length: 8 }, (_, index) => (
        <path
          key={index}
          d="M24 23 C17.5 18.5 18.5 9.5 24 4 C29.5 9.5 30.5 18.5 24 23 Z"
          transform={`rotate(${index * 45} 24 24)`}
          fill={`url(#${gradientId})`}
          stroke="rgba(255,255,255,0.82)"
          strokeWidth="1.15"
        />
      ))}
      <circle
        cx="24"
        cy="24"
        r="6.4"
        fill="#ffd96a"
        stroke="#fff8d7"
        strokeWidth="1.5"
      />
      <circle cx="21.8" cy="21.8" r="1.55" fill="#fffdf2" />
    </svg>
  );
}

function getCountdownParts(targetDate) {
  const now = new Date();
  const diffMs = Math.max(0, targetDate.getTime() - now.getTime());

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function WeddingCountdown() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdownParts(COUNTDOWN_TARGET));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="mt-3 grid grid-cols-4 gap-2">
      {[
        [countdown.days, "Days"],
        [String(countdown.hours).padStart(2, "0"), "Hours"],
        [String(countdown.minutes).padStart(2, "0"), "Mins"],
        [String(countdown.seconds).padStart(2, "0"), "Secs"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="wedding-count rounded-lg border border-[#7f5d40] bg-[#29212f] p-2 text-center"
        >
          <p className="font-display text-xl text-[#f1d6e6] sm:text-2xl">
            {value}
          </p>
          <p className="text-[0.68rem] uppercase tracking-[0.12em] text-[#c7a790]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function EnvelopeScene({ backgroundImage }) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className={`aurora-bg wedding-stage ${isOpen ? "wedding-open" : ""} relative h-full overflow-hidden px-2 py-3 sm:px-6 sm:py-8`}
    >
      <MusicToggle />
      <div
        className="wedding-backdrop pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover object-[center_55%] brightness-110 saturate-110"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,19,20,0.08)_0%,rgba(38,19,20,0.16)_52%,rgba(25,15,20,0.38)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_18%,rgba(35,16,21,0.12)_100%)]" />
      </div>

      <div className="floating-glow left-[-10rem] top-[20%] h-80 w-80 bg-[#6f2f4c]" />
      <div className="floating-glow right-[-8rem] top-[46%] h-72 w-72 bg-[#8f6330]" />
      <div className="floating-glow bottom-[6%] left-[20%] h-64 w-64 bg-[#2a2330]" />

      <div className="wedding-particles pointer-events-none absolute inset-0 opacity-70">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-[#f2d7ae] blur-[1px]"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
            }}
            animate={
              isOpen
                ? { opacity: 0 }
                : { y: [0, -32, 0], opacity: [0.1, 0.85, 0.2] }
            }
            transition={
              isOpen
                ? { duration: 0.16, ease: "easeOut" }
                : {
                    duration: particle.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: particle.delay,
                  }
            }
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <motion.div
          className={`wedding-envelope-frame relative mx-auto mt-12 h-[84svh] max-h-[720px] min-h-[460px] w-[min(96vw,760px)] sm:mt-14 sm:h-[78vh] sm:min-h-[520px] sm:w-[min(94vw,760px)] ${isOpen ? "" : "cursor-pointer"}`}
          onClick={() => {
            if (!isOpen) setIsOpen(true);
          }}
        >
          <div className="pointer-events-none absolute -inset-2 rounded-[30px] border border-[#8f6330]/50" />
          <div className="pointer-events-none absolute -inset-4 rounded-[36px] border border-[#d3ad73]/28" />
          <div className="pointer-events-none absolute inset-[8%] rounded-[28px] border border-white/6 bg-black/10 blur-[2px]" />

          <motion.div
            id="wedding-invitation-letter"
            className="wedding-letter absolute bottom-[8%] left-3 right-3 top-[16%] z-[4] overflow-hidden rounded-xl border border-[#7f5a36] bg-[linear-gradient(145deg,#211a23,#1a1520)] px-3 py-4 shadow-[0_22px_30px_rgba(8,7,12,0.45)] sm:left-4 sm:right-4 sm:px-4 sm:py-5 md:left-12 md:right-12 md:px-5 md:py-6"
            aria-hidden={!isOpen}
            initial={false}
            animate={{
              y: isOpen ? "0%" : "12%",
              scale: isOpen ? 1 : 0.96,
              opacity: isOpen ? 1 : 0,
            }}
            transition={{
              y: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.54, ease: [0.22, 1, 0.36, 1] },
              opacity: {
                duration: isOpen ? 0.34 : 0.24,
                delay: isOpen ? 0.1 : 0.04,
                ease: "easeInOut",
              },
            }}
            style={{
              zIndex: isOpen ? 8 : 4,
              pointerEvents: isOpen ? "auto" : "none",
            }}
          >
            <div className="wedding-letter-scroll h-full overflow-y-auto pr-1 text-left [scrollbar-width:thin]">
              <p className="section-tag wedding-kicker">
                शुभ विवाह · Wedding Invitation
              </p>
              <h2 className="wedding-title mt-1 font-display text-2xl text-[#f1d6e6] sm:text-3xl md:text-4xl">
                Join Us as We Tie the Knot!
              </h2>
              <p className="wedding-date mt-1 text-sm text-[#cbb4c5] md:text-base">
                Wednesday, 2 December 2026 · Lalitpur, Nepal
              </p>

              <article className="glass-card wedding-card mt-4 rounded-2xl p-4 md:p-5">
                <p className="section-tag wedding-kicker">
                  The sacred celebration
                </p>
                <h3 className="wedding-heading mt-1 font-display text-2xl text-[#f1d6e6] sm:text-3xl">
                  With Love, We Say "I Do"
                </h3>
                <ul className="wedding-copy mt-2 space-y-1 text-sm text-[#cdb7c7]">
                  <li>Time: 5:30 PM</li>
                  <li>Venue: Star Banquet, Imadole</li>
                </ul>
              </article>

              <article className="glass-card wedding-card mt-3 rounded-2xl p-4 md:p-5">
                {/* <p className="section-tag wedding-kicker">Our story</p> */}
                <h3 className="wedding-heading mt-1 font-display text-2xl text-[#f1d6e6] sm:text-3xl">
                  The Beginning of Forever
                </h3>
                <p className="wedding-copy mt-2 text-sm leading-relaxed text-[#cdb7c7]">
                  With love, joy, and the blessings of our families, We are
                  delighted to invite you to celebrate one of the most beautiful
                  moments of our lives — our wedding! As we begin this new
                  chapter together, your presence, love, and blessings would
                  mean the world to us. We would be truly honoured to have you
                  join us and make our special day even more memorable. Let’s
                  come together to celebrate love, laughter, and a lifetime of
                  togetherness. Your presence will make our celebration
                  complete. <br /> ❤️ With love, Aashish & Subbu
                </p>
              </article>

              <article className="glass-card wedding-card mt-3 rounded-2xl p-4 text-center md:p-5">
                <p className="section-tag wedding-kicker">Kindly reply</p>
                <h3 className="wedding-heading mt-1 font-display text-2xl text-[#f1d6e6] sm:text-3xl">
                  Will you celebrate with us?
                </h3>
                <p className="wedding-copy mt-2 text-sm">
                  Choose an option to open a prefilled email. Please send it to
                  confirm your reply.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <a
                    className="wedding-action inline-flex"
                    href={getRsvpMailto(true)}
                  >
                    Joyfully attending <span aria-hidden="true">♡</span>
                  </a>
                  <a
                    className="wedding-action inline-flex"
                    href={getRsvpMailto(false)}
                  >
                    Unable to attend
                  </a>
                </div>
              </article>

              <article className="glass-card wedding-card mt-3 rounded-2xl p-4 md:p-5">
                <p className="section-tag wedding-kicker">Reception</p>
                <h3 className="wedding-heading mt-1 font-display text-2xl text-[#f1d6e6] sm:text-3xl">
                  Until we say “I do”
                </h3>
                <p className="wedding-copy mt-2 text-sm text-[#cdb7c7]">
                  Counting down to 2 December 2026
                </p>
                <WeddingCountdown />
              </article>
            </div>
          </motion.div>

          {isOpen && !prefersReducedMotion && (
            <div className="wedding-flower-confetti" aria-hidden="true">
              {flowerPetals.map((petal) => (
                <motion.span
                  key={petal.id}
                  className="wedding-flower-petal"
                  style={{
                    left: petal.left,
                    color: petal.color,
                    fontSize: petal.size,
                  }}
                  initial={{
                    y: "-8vh",
                    x: 0,
                    rotate: 0,
                    opacity: 0,
                    scale: 0.55,
                  }}
                  animate={{
                    y: ["-8vh", "112vh"],
                    x: [0, 30 * petal.sway, -12 * petal.sway, 18 * petal.sway],
                    rotate: [0, 180 * petal.sway, 360 * petal.sway],
                    opacity: [0, 1, 1, 0],
                    scale: [0.55, 1, 0.9],
                  }}
                  transition={{
                    y: {
                      duration: petal.duration,
                      delay: petal.delay,
                      ease: "linear",
                    },
                    x: {
                      duration: petal.duration,
                      delay: petal.delay,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: petal.duration,
                      delay: petal.delay,
                      ease: "linear",
                    },
                    opacity: {
                      duration: petal.duration,
                      delay: petal.delay,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: petal.duration,
                      delay: petal.delay,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <FlowerBloom id={petal.id} color={petal.color} />
                </motion.span>
              ))}
            </div>
          )}

          <div
            className={`wedding-envelope relative h-full w-full overflow-hidden rounded-[30px] border border-[#5d3f2b] bg-gradient-to-br from-[#6b4a32] via-[#4f3528] to-[#3a2824] shadow-[0_24px_36px_rgba(8,7,12,0.5)] ${isOpen ? "" : "cursor-pointer"}`}
            onClick={() => {
              if (!isOpen) setIsOpen(true);
            }}
          >
            <motion.div
              className="wedding-flap absolute inset-x-0 top-0 z-[6] h-[40%] origin-top rounded-t-[30px] border-y border-[#6b4a32] bg-gradient-to-b from-[#886243] to-[#4b3328] shadow-[0_8px_18px_rgba(8,7,12,0.35)]"
              animate={{ rotateX: isOpen ? -176 : 0 }}
              transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="wedding-front pointer-events-none absolute inset-0 z-[5] clip-envelope-front rounded-[30px] border border-[#6b4a32] bg-gradient-to-br from-[#7b5638] via-[#5f412d] to-[#422f26]"
              animate={{ opacity: isOpen ? 0.72 : 1 }}
              transition={{ duration: 0.58, ease: "easeInOut" }}
            />
            <div className="pointer-events-none absolute inset-0 z-[5] clip-envelope-front bg-[linear-gradient(180deg,rgba(236,209,174,0.16),rgba(255,255,255,0.02))]" />
            <div
              className="pointer-events-none absolute bottom-0 left-0 z-[5] h-[66%] w-1/2 border-r border-[#7a5639]/55"
              style={{ clipPath: "polygon(0 0, 100% 55%, 100% 100%, 0 100%)" }}
            />
            <div
              className="pointer-events-none absolute bottom-0 right-0 z-[5] h-[66%] w-1/2 border-l border-[#7a5639]/55"
              style={{ clipPath: "polygon(0 55%, 100% 0, 100% 100%, 0 100%)" }}
            />
            <div className="pointer-events-none absolute bottom-[16%] left-1/2 z-[5] h-[24%] w-px -translate-x-1/2 bg-[#7a5639]/55" />
          </div>
          <button
            type="button"
            className="wedding-seal absolute left-1/2 top-1/2 z-[10] grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#a97993] bg-gradient-to-br from-[#7f3551] to-[#3e1b2b] shadow-xl"
            aria-label={
              isOpen
                ? "Close the wedding invitation"
                : "Open the wedding invitation"
            }
            aria-controls="wedding-invitation-letter"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <motion.span
              key={isOpen ? "close" : "monogram"}
              className="font-display text-2xl font-semibold tracking-wide text-[#fff4d2]"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {isOpen ? "×" : "AS"}
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
