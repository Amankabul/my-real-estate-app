import styles from "../styles/Footer.module.css";

// ✅ Your logo (set your path)
import logo from "../images/new-logo.png";

// ✅ Your social icons (set your path)
import facebookIcon from "../icons/facebook-brands-solid-full.svg";
import instagramIcon from "../icons/square-instagram-brands-solid-full.svg";
import xIcon from "../icons/x-twitter-brands-solid-full.svg";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* TOP */}
        <div className={styles.top}>
          {/* Columns */}
          <div className={styles.columns}>
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Company</h4>
              <ul className={styles.links}>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>For Buyers</h4>
              <ul className={styles.links}>
                <li>
                  <a href="#">Buy a Home</a>
                </li>
                <li>
                  <a href="#">Rent a Home</a>
                </li>
                <li>
                  <a href="#">Mortgage Services</a>
                </li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>For Owners</h4>
              <ul className={styles.links}>
                <li>
                  <a href="#">List Your Property</a>
                </li>
                <li>
                  <a href="#">Our Pricing</a>
                </li>
              </ul>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Legal</h4>
              <ul className={styles.links}>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT LOGO AREA (your own logo) */}
          <div className={styles.brand}>
            <div className={styles.brandRow}>
              <img className={styles.brandLogo} src={logo} alt="Company logo" />
            </div>
            <p className={styles.brandText}>
              Your trusted partner in finding <br /> the perfect home.
            </p>
          </div>
        </div>

        <div className={styles.divider} />

        {/* BOTTOM */}
        <div className={styles.bottom}>
          <p className={styles.address}>
            123 Main Street, Anytown, USA 12345 | (555) 123-4567
          </p>

          <div className={styles.social}>
            <a className={styles.socialBtn} href="#" aria-label="Facebook">
              <img src={facebookIcon} alt="" />
            </a>
            <a className={styles.socialBtn} href="#" aria-label="Instagram">
              <img src={instagramIcon} alt="" />
            </a>
            <a className={styles.socialBtn} href="#" aria-label="X">
              <img src={xIcon} alt="" />
            </a>
          </div>

          <p className={styles.copy}>
            © 2024 RealtyCo Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
