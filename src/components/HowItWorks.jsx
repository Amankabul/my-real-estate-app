import { useEffect, useRef, useState } from "react";
import styles from "../styles/HowItWorks.module.css";

import iconSearch from "../icons/magnifying-glass-solid-full.svg";
import iconCalendar from "../icons/calendar-regular-full.svg";
import iconOffer from "../icons/sheet-plastic-solid-full.svg";
import iconKey from "../icons/key-solid-full.svg";

const steps = [
  {
    id: 1,
    icon: iconSearch,
    title: "Search Properties",
    text: "Browse thousands of listings, use powerful filters to narrow your search, and save your favorite properties.",
  },
  {
    id: 2,
    icon: iconCalendar,
    title: "Schedule a Viewing",
    text: "Found a place you love? Book a tour online or in-person directly from the listing page in just a few clicks.",
  },
  {
    id: 3,
    icon: iconOffer,
    title: "Make an Offer",
    text: "Our platform helps you submit a secure and competitive offer with the guidance of our expert agents.",
  },
  {
    id: 4,
    icon: iconKey,
    title: "Move In",
    text: "From offer acceptance to closing, we support you right up to the moment you get the keys to your new dream home.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.sectionVisible : ""}`}
    >
      <div className={styles.container}>
        {/* Heading */}
        <header className={styles.header}>
          <h2 className={styles.title}>
            How Buying a Home With Us <br />
            Works
          </h2>
          <p className={styles.subtitle}>
            We&apos;ve simplified the process into four easy steps to get you
            into your dream
            <br />
            home faster.
          </p>
        </header>

        {/* Cards */}
        <div className={styles.grid}>
          {steps.map((step) => (
            <article key={step.id} className={styles.card}>
              <div className={styles.iconWrap}>
                <img className={styles.icon} src={step.icon} alt="" />
              </div>

              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardText}>{step.text}</p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.ctaRow}>
          <button className={styles.ctaBtn} type="button">
            Find Your New Home
          </button>
        </div>
      </div>
    </section>
  );
}
