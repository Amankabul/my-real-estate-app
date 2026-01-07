import { useNavigate } from "react-router-dom";
import styles from "../styles/SuccessCTA.module.css";

export default function SuccessCTA() {
  const navigate = useNavigate();
  function handleDirect() {
    navigate(`/contact-us`);
  }
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Become Our Next Success Story</h2>

        <p className={styles.subtitle}>
          Ready to start your real estate journey? Contact us today to find out
          how we can
          <br />
          help you achieve your goals.
        </p>

        <button
          className={styles.btn}
          type="button"
          onClick={() => handleDirect()}
        >
          Contact-us
        </button>
      </div>
    </section>
  );
}
