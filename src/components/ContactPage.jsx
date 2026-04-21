import styles from "../styles/ContactPage.module.css";
import phone from "../icons/blue-phone.svg";
import clock from "../icons/clock-solid-full.svg";
import location from "../icons/location-dot-solid-full.svg";
import mail from "../icons/envelope-solid-full.svg";
import logo from "../images/new-logo.png";
import Footer from "./Footer";
// import { useState } from "react";

// const [formData, setFormData] = useState({
//   name: "",
//   email: "",
//   subject: "",
//   notes: "",
// });

// const handleSubmitForm = (e) => {
//   e.preventDefault();

//   alert("Form submitted, thank you!");

//   // Reset form
//   setFormData({
//     name: "",
//     email: "",
//     phone: "",
//     notes: "",
//   });
// };
// const handleChange = (e) => {
//   const { name, value } = e.target;

//   setFormData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };
export default function ContactPage() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" className={styles.logoimage} />
          </div>
        </div>
      </header>

      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>Contact Our Expert Team</h1>
          <p>
            Whether you&apos;re buying, selling, or have a question, we&apos;re
            here to help you every step of the way.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>Send us a Message</h2>

              <form>
                <div className={styles.form}>
                  <div className={styles.twoCol}>
                    <div className={styles.field}>
                      <label>Full Name</label>
                      <input
                        name="name"
                        // value={formData.name}
                        // onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.field}>
                      <label>Email Address</label>
                      <input
                        name="email"
                        type="email"
                        // value={formData.email}
                        // onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label>Subject</label>
                    <input />
                  </div>

                  <div className={styles.field}>
                    <label>Your Message</label>
                    <textarea placeholder="Write your message here..." />
                  </div>

                  <button className={styles.primaryBtn} type="submit">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* right  */}
            <div className={styles.rightCol}>
              <div className={styles.card}>
                <h2 className="right-h2">how would you like to contact us</h2>

                <div className={styles.infoRow}>
                  <div className={styles.icon}>
                    <img src={phone} alt="phone" />
                  </div>
                  <div>
                    <strong>Phone</strong>
                    <p className={styles.strong}>+1 (234) 567-890</p>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.icon}>
                    <img src={mail} alt="email" />
                  </div>
                  <div>
                    <strong>Email</strong>
                    <p className={styles.strong}>contact@realestate.com</p>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.icon}>
                    <img src={location} alt="location" />
                  </div>
                  <div>
                    <strong>Address</strong>
                    <p className={styles.strong}>
                      123 Market Street, Suite 450, San Francisco, CA 94103
                    </p>
                  </div>
                </div>

                <div className={styles.infoRow}>
                  <div className={styles.icon}>
                    <img src={clock} alt="office hours" />
                  </div>
                  <div>
                    <strong>Office Hours</strong>
                    <p className={styles.strong}>
                      Mon - Fri: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.mapBox}>Map Preview</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
