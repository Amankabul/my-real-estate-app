import styles from "../styles/SmartWay.module.css";

// ✅ Your icons (based on your screenshot names)
import awardIcon from "../icons/award-solid-full.svg";
import peopleIcon from "../icons/people-group-solid-full.svg";
import boltIcon from "../icons/bolt-solid-full.svg";
import feeIcon from "../icons/floppy-disk-solid-full.svg"; // (you can rename to "tag" later if you want)

const features = [
  {
    id: 1,
    icon: awardIcon,
    title: "Verified Listings Only",
    text: "Every property is carefully vetted to ensure quality and accuracy, giving you peace of mind.",
  },
  {
    id: 2,
    icon: peopleIcon,
    title: "Local Market Experts",
    text: "Our agents have deep roots and unparalleled knowledge of the local market trends.",
  },
  {
    id: 3,
    icon: boltIcon,
    title: "Fast Response Times",
    text: "We are committed to providing prompt and helpful communication every step of the way.",
  },
  {
    id: 4,
    icon: feeIcon,
    title: "No Hidden Fees",
    text: "Our pricing is straightforward and honest, so you can be confident there are no surprises.",
  },
];

const stats = [
  { id: 1, label: "Properties Available", value: "2,500+" },
  { id: 2, label: "Years of Experience", value: "10+" },
  { id: 3, label: "Customer Rating", value: "4.9/5" },
];

export default function SmartWay() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* TOP TITLE */}
        <header className={styles.header}>
          <h2 className={styles.mainTitle}>
            The Smarter Way to Find Your Home
          </h2>
          <p className={styles.mainSubtitle}>
            Your trusted partner in every step of the real estate journey.
          </p>
        </header>

        {/* MAIN LAYOUT */}
        <div className={styles.layout}>
          {/* LEFT: FEATURE CARDS */}
          <div className={styles.featureGrid}>
            {features.map((f) => (
              <article key={f.id} className={styles.featureCard}>
                <div className={styles.featureIconWrap}>
                  <img src={f.icon} alt="" className={styles.featureIcon} />
                </div>

                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureText}>{f.text}</p>
              </article>
            ))}
          </div>

          {/* RIGHT: STATS */}
          <aside className={styles.rightSide}>
            <h3 className={styles.rightTitle}>Proven Results You Can Trust</h3>
            <p className={styles.rightText}>
              Our commitment to excellence is reflected in our numbers and the
              satisfaction of our clients.
            </p>

            <div className={styles.statsStack}>
              {stats.map((s) => (
                <div key={s.id} className={styles.statCard}>
                  <p className={styles.statLabel}>{s.label}</p>
                  <p className={styles.statValue}>{s.value}</p>
                </div>
              ))}
            </div>

            <button className={styles.ctaBtn} type="button">
              Browse Listings
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
