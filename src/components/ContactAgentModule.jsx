import { useEffect, useRef } from "react";
import styles from "../styles/ContactAgentModal.module.css";
import profile from "../images/profile.jpg";

export default function ContactAgentModal() {
  const overlayRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }

    overlayRef.current?.focus?.();
  }, []);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
    >
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Contact Agent</h2>
            <p className={styles.subtitle}></p>
          </div>
        </div>

        {/* Agent */}
        <div className={styles.agent}>
          <img
            src={profile}
            alt="profile"
            style={{ height: "5rem", borderRadius: " 100%" }}
          />
          <div>
            <div className={styles.agentName}>Jane Doe</div>
            <div className={styles.agentOrg}>RealtyCo Agents</div>
          </div>
        </div>

        <div className={styles.divider} />

        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input
                name="name"
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Phone</label>
              <input
                name="phone"
                className={styles.input}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Message</label>
            <textarea className={styles.textarea} />
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" />
            <span>
              Sign up for our newsletter
              <small>Receive updates on new listings and market trends.</small>
            </span>
          </label>

          <button
            type="button"
            className={styles.submit}
            onSubmit={handleSubmitForm}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
