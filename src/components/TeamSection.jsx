import styles from "../styles/TeamSection.module.css";

/* ✅ Your agent images (change the folder path to your real one) */
import img1 from "../images/pexels-nappy-3460134-removebg-preview.png";
import img2 from "../images/pexels-koolshooters-6976943-removebg-preview.png";
import img3 from "../images/pexels-divinetechygirl-1181424-removebg-preview.png";
import img4 from "../images/pexels-olly-774909-removebg-preview.png";

/* ✅ Your own icons (phone + email) — set paths to your icons */
import phoneIcon from "../icons/message-solid-full.svg";
import mailIcon from "../icons/phone-solid-full.svg";

const AGENTS = [
  {
    id: 1,
    name: "Olivia Chen",
    role: "Lead Agent, Luxury Division",
    tags: ["Luxury", "Rentals"],
    phone: "(123) 456-7890",
    email: "olivia.chen@prestige.com",
    img: img1,
    imgBg: "imgBgWarm",
  },
  {
    id: 2,
    name: "Benjamin Carter",
    role: "Broker, Commercial",
    tags: ["Commercial"],
    phone: "(234) 567-8901",
    email: "ben.carter@prestige.com",
    img: img2,
    imgBg: "imgBgGray",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Rental Specialist",
    tags: ["Rentals"],
    phone: "(345) 678-9012",
    email: "sophia.r@prestige.com",
    img: img3,
    imgBg: "imgBgCool",
  },
  {
    id: 4,
    name: "Liam Goldberg",
    role: "Lead Agent, Downtown",
    tags: ["Downtown", "Condos"],
    phone: "(456) 789-0123",
    email: "liam.g@prestige.com",
    img: img4,
    imgBg: "imgBgBlue",
  },
];

export default function TeamSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Heading */}
        <header className={styles.heading}>
          <h2 className={styles.title}>Meet Our Expert Team</h2>
          <p className={styles.subtitle}>
            The best in the business, dedicated to finding your perfect home.
          </p>
        </header>

        {/* Divider line */}
        <div className={styles.divider} />

        {/* Cards */}
        <div className={styles.grid}>
          {AGENTS.map((agent) => (
            <article key={agent.id} className={styles.card}>
              {/* Image header area */}
              <div className={`${styles.imageWrap} ${styles[agent.imgBg]}`}>
                <img
                  className={styles.avatar}
                  src={agent.img}
                  alt={agent.name}
                />
              </div>

              {/* Card content */}
              <div className={styles.body}>
                <h3 className={styles.name}>{agent.name}</h3>
                <p className={styles.role}>{agent.role}</p>

                {/* Tags */}
                <div className={styles.tags}>
                  {agent.tags.map((t) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Contact */}
                <div className={styles.contact}>
                  <div className={styles.contactRow}>
                    <img
                      className={styles.contactIcon}
                      src={phoneIcon}
                      alt=""
                    />
                    <span className={styles.contactText}>{agent.phone}</span>
                  </div>

                  <div className={styles.contactRow}>
                    <img className={styles.contactIcon} src={mailIcon} alt="" />
                    <span className={styles.contactText}>{agent.email}</span>
                  </div>
                </div>

                {/* Button */}
                <button className={styles.btn} type="button">
                  View Profile
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
