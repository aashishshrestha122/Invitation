import { useMemo, useRef, useState } from "react";
import "./App.css";

const photoSources = [
  {
    src: "/photos/IMG_9200.jpg",
    alt: "Couple in the train carriage",
  },
  {
    src: "/photos/IMG_0346.jpg",
    alt: "Close-up couple portrait",
  },
  {
    src: "/photos/IMG_6264.JPG",
    alt: "Wedding photo 6264",
  },
  {
    src: "/photos/IMG_8673.JPG",
    alt: "Wedding photo 8673",
  },
];

const backgroundPhotos = [
  {
    ...photoSources[0],
    left: "2.5%",
    top: "8%",
    width: "22vw",
    height: "24vh",
    rotate: "-8deg",
    delay: "0s",
    duration: "20s",
  },
  {
    ...photoSources[1],
    left: "74%",
    top: "8%",
    width: "22vw",
    height: "24vh",
    rotate: "8deg",
    delay: "-2s",
    duration: "21s",
  },
  {
    ...photoSources[2],
    left: "2.5%",
    top: "58%",
    width: "22vw",
    height: "24vh",
    rotate: "5deg",
    delay: "-4s",
    duration: "19s",
  },
  {
    ...photoSources[3],
    left: "74%",
    top: "58%",
    width: "22vw",
    height: "24vh",
    rotate: "-5deg",
    delay: "-6s",
    duration: "22s",
  },
];

function App() {
  const letterScrollRef = useRef(null);
  const [letterScrollY, setLetterScrollY] = useState(0);

  const onLetterScroll = (event) => {
    setLetterScrollY(event.currentTarget.scrollTop);
  };

  const openProgress = useMemo(
    () => Math.min(1, letterScrollY / 180),
    [letterScrollY],
  );
  const letterY = useMemo(() => 42 - openProgress * 58, [openProgress]);
  const letterScale = useMemo(() => 0.96 + openProgress * 0.04, [openProgress]);
  const letterZ = useMemo(() => (openProgress > 0.02 ? 8 : 4), [openProgress]);
  const frontOpacity = useMemo(
    () => 0.95 - openProgress * 0.28,
    [openProgress],
  );

  return (
    <main className="invitation-page envelope-site">
      <section className="envelope-stage">
        <div className="photo-cloud" aria-hidden="true">
          {backgroundPhotos.map((photo, index) => (
            <div
              className="photo-cloud-card"
              key={`${photo.src}-${index}`}
              style={{
                left: photo.left,
                top: photo.top,
                width: photo.width,
                height: photo.height,
                animationDelay: photo.delay,
                animationDuration: photo.duration,
                ['--base-rotate']: photo.rotate,
              }}
            >
              <img src={photo.src} alt={photo.alt} />
            </div>
          ))}
        </div>

        <p className="scroll-cue">
          Page is fixed. Scroll inside the letter to open and read.
        </p>

        <div className="envelope-wrap">
          <div className="envelope-outline envelope-outline-1"></div>
          <div className="envelope-outline envelope-outline-2"></div>

          <div className="env-back"></div>

          <div
            className="env-letter"
            style={{
              transform: `translate3d(0, ${letterY}px, 0) scale(${letterScale})`,
              zIndex: letterZ,
            }}
          >
            <div
              ref={letterScrollRef}
              onScroll={onLetterScroll}
              className="letter-scroll"
            >
              <div className="letter-safe-top">
                <p>Unfolding invitation</p>
              </div>

              <p className="invite-label">Wedding Invitation</p>
              <h1>Aashish & Subbechya</h1>
              <p className="top-sub">शनिबार, १२ असार २०८३ · Kathmandu</p>

              <section className="content-card">
                <p className="eyebrow">Wedding Details</p>
                <h2>The Big Day</h2>
                <p className="subtext">
                  Janti Swagat 5:30 PM · Phera 7:00 PM · Reception 8:30 PM
                </p>
              </section>

              <section className="content-card">
                <p className="eyebrow">Venue</p>
                <h2>Ashok Party Palace</h2>
                <p className="subtext">Main Heritage Lawn, Kathmandu</p>
                <div className="actions">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    See Map
                  </a>
                </div>
              </section>

              <section className="content-card">
                <p className="eyebrow">Our Story</p>
                <h2>From Chiya to Forever</h2>
                <p className="subtext">
                  A friendship that turned into love, and now into a lifelong
                  promise.
                </p>
              </section>

              <section className="content-card">
                <p className="eyebrow">Gallery</p>
                <div className="photo-strip in-letter">
                  {photoSources.map((photo) => (
                    <img key={photo.src} src={photo.src} alt={photo.alt} />
                  ))}
                </div>
              </section>

              <section className="content-card">
                <p className="eyebrow">All Photos</p>
                <div className="photo-grid-all">
                  {photoSources.map((photo) => (
                    <figure key={`${photo.src}-all`} className="photo-tile">
                      <img src={photo.src} alt={photo.alt} />
                    </figure>
                  ))}
                </div>
              </section>

              <section className="content-card" id="rsvp">
                <p className="eyebrow">RSVP</p>
                <h2>Please confirm your attendance</h2>
                <p className="subtext">
                  Kindly respond by 30 Jestha with number of guests and meal
                  preference.
                </p>
                <div className="actions">
                  <a href="#">Confirm attendance</a>
                </div>
              </section>

              <footer className="site-footer">
                Aashish & Subbechya · With love
              </footer>
            </div>
          </div>

          <div className="env-front" style={{ opacity: frontOpacity }}></div>
          <div
            className="env-flap"
            style={{ transform: `rotateX(${-178 * openProgress}deg)` }}
          ></div>
          <div className="env-seal">AS</div>
        </div>
      </section>
    </main>
  );
}

export default App;
