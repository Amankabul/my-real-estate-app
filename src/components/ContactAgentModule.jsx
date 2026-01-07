import styles from "../styles/ContactAgentModal.module.css";

export default function ContactAgentModal() {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Contact Agent</h2>
            <p className={styles.subtitle}>
              Send a message regarding Modern Brooklyn Loft
            </p>
          </div>
        </div>

        {/* Agent */}
        <div className={styles.agent}>
          <div className={styles.avatar} />
          <div>
            <div className={styles.agentName}>Jane Doe</div>
            <div className={styles.agentOrg}>RealtyCo Agents</div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Form */}
        <form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input className={styles.input} placeholder="Your Name" />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Phone</label>
              <input className={styles.input} placeholder="Your Phone" />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} placeholder="Your Email" />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Message</label>
            <textarea
              className={styles.textarea}
              placeholder="I am interested in this property..."
            />
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" />
            <span>
              Sign up for our newsletter
              <small>Receive updates on new listings and market trends.</small>
            </span>
          </label>

          <button type="button" className={styles.submit}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
