import styles from "../styles/AboutPage.module.css";
import award from "../icons/award-solid-full.svg";
import flag from "../icons/flag-solid-full.svg";
import helmet from "../icons/helmet-safety-solid-full.svg";
import building from "../icons/building-solid-full.svg";
import people from "../icons/people-group-solid-full.svg";
import profile1 from "../images/pexels-olly-774909-removebg-preview.png";
import profile2 from "../images/pexels-koolshooters-6976943-removebg-preview.png";
import profile3 from "../images/pexels-nappy-3460134-removebg-preview.png";
import profile4 from "../images/pexels-divinetechygirl-1181424-removebg-preview.png";
import Footer from "./Footer";
import logo from "../images/new-logo.png";
export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* ================= Header ================= */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <img src={logo} alt="logo" className={styles.logoimage} />
          </div>

          <nav className={styles.nav}>
            <a className={styles.navLink} href="#">
              Home
            </a>
            <a className={styles.navLink} href="#">
              Listings
            </a>
            <a className={`${styles.navLink} ${styles.navActive}`} href="#">
              About Us
            </a>
            <a className={styles.navLink} href="#">
              Contact
            </a>
          </nav>

          <a className={styles.headerCta} href="#">
            Contact Us
          </a>
        </div>
      </header>

      {/* ================= Hero ================= */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Your Guide to Finding Home</h1>
          <p className={styles.heroSub}>
            Our mission is to provide unparalleled service and expertise in the
            real estate market, helping you navigate your journey with
            confidence.
          </p>

          <div className={styles.heroActions}>
            <button className={styles.primaryBtn} type="button">
              View Listings
            </button>
            <button className={styles.ghostBtn} type="button">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* ================= Our Journey ================= */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Journey</h2>
          <p className={styles.sectionSub}>
            A brief narrative about our founding, growth over the years, and our
            unwavering commitment to the community we serve. We started as a
            small agency with a big vision, and today we&apos;re proud to be a
            trusted name in real estate.
          </p>

          <div className={styles.timelineWrap}>
            <div className={styles.timeline}>
              {/* Line */}
              <div className={styles.timelineLine} aria-hidden="true" />

              {/* Items */}
              <div className={styles.tItem}>
                <div className={styles.tDot} aria-hidden="true">
                  <img
                    src={building}
                    alt=""
                    className={styles.tIcon}
                    aria-hidden="true"
                  />
                </div>
                <div className={styles.tContent}>
                  <div className={styles.tTitle}>Company Founded</div>
                  <div className={styles.tYear}>2005</div>
                </div>
              </div>

              <div className={styles.tItem}>
                <div className={styles.tDot} aria-hidden="true">
                  <img
                    src={helmet}
                    alt=""
                    className={styles.tIcon}
                    aria-hidden="true"
                  />
                </div>
                <div className={styles.tContent}>
                  <div className={styles.tTitle}>First Major Development</div>
                  <div className={styles.tYear}>2010</div>
                </div>
              </div>

              <div className={styles.tItem}>
                <div className={styles.tDot} aria-hidden="true">
                  <img
                    src={flag}
                    alt=""
                    className={styles.tIcon}
                    aria-hidden="true"
                  />
                </div>
                <div className={styles.tContent}>
                  <div className={styles.tTitle}>Expanded to New Region</div>
                  <div className={styles.tYear}>2016</div>
                </div>
              </div>

              <div className={styles.tItem}>
                <div className={styles.tDot} aria-hidden="true">
                  <img
                    src={award}
                    alt=""
                    className={styles.tIcon}
                    aria-hidden="true"
                  />
                </div>
                <div className={styles.tContent}>
                  <div className={styles.tTitle}>Awarded “Top Agency”</div>
                  <div className={styles.tYear}>2022</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= What Drives Us ================= */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What Drives Us</h2>
          <p className={styles.sectionSub}>
            Our core principles guide every decision we make and every
            interaction we have. They are the foundation of our success.
          </p>

          <div className={styles.cards3}>
            <article className={styles.valueCard}>
              <div className={styles.valueIcon} aria-hidden="true">
                <img src={award} alt="award" />
              </div>
              <h3 className={styles.valueTitle}>Integrity</h3>
              <p className={styles.valueText}>
                We uphold the highest standards of integrity in all of our
                actions, ensuring transparency and trust.
              </p>
            </article>

            <article className={styles.valueCard}>
              <div className={styles.valueIcon} aria-hidden="true">
                <img src={people} alt="pepple" />
              </div>
              <h3 className={styles.valueTitle}>Client-First</h3>
              <p className={styles.valueText}>
                Our clients&apos; needs are our top priority. We are committed
                to delivering exceptional service and results.
              </p>
            </article>

            <article className={styles.valueCard}>
              <div className={styles.valueIcon} aria-hidden="true">
                <img src={building} alt="bulding" />
              </div>
              <h3 className={styles.valueTitle}>Local Expertise</h3>
              <p className={styles.valueText}>
                With deep roots in the community, we offer unparalleled
                knowledge of the local market.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ================= Meet Our Experts ================= */}

      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Meet Our Experts</h2>
          <p className={styles.sectionSub}>
            Our team of dedicated professionals is the heart of our company. Get
            to know the people who make it all happen.
          </p>

          <div className={styles.teamGrid}>
            <div className={styles.person}>
              <div className={styles.avatar}>
                <img
                  src={profile1}
                  alt="Johnathan Doe"
                  className={styles.avatarImg}
                />
              </div>
              <div className={styles.personName}>Johnathan Doe</div>
              <div className={styles.personRole}>Lead Agent</div>
            </div>

            <div className={styles.person}>
              <div className={styles.avatar}>
                <img
                  src={profile2}
                  alt="Jane Smith"
                  className={styles.avatarImg}
                />
              </div>
              <div className={styles.personName}>Jane Smith</div>
              <div className={styles.personRole}>Senior Broker</div>
            </div>

            <div className={styles.person}>
              <div className={styles.avatar}>
                <img
                  src={profile3}
                  alt="Michael Chen"
                  className={styles.avatarImg}
                />
              </div>
              <div className={styles.personName}>Michael Chen</div>
              <div className={styles.personRole}>Commercial Specialist</div>
            </div>

            <div className={styles.person}>
              <div className={styles.avatar}>
                <img
                  src={profile4}
                  alt="Emily Rodriguez"
                  className={styles.avatarImg}
                />
              </div>
              <div className={styles.personName}>Emily Rodriguez</div>
              <div className={styles.personRole}>Marketing Director</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>
            Let&apos;s Start Your Real Estate Journey
          </h2>
          <p className={styles.ctaSub}>
            Whether you&apos;re buying, selling, or just exploring, our team is
            ready to provide you with the expert guidance and support you need.
            Reach out today and let&apos;s turn your real estate goals into
            reality.
          </p>
          <button className={styles.primaryBtn} type="button">
            Contact Our Team
          </button>
        </div>
      </section>

      {/* ================= Footer ================= */}
      <Footer />
    </div>
  );
}
