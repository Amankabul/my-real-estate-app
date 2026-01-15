import { useState, useEffect, useRef } from "react";
import styles from "../styles/ScheduleViewingModal.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import logo from "../images/new-logo.png";
export default function ScheduleViewingModal() {
  const { Name } = useParams();
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();
  // 👇 reference to overlay so we can force its scroll to top
  const overlayRef = useRef(null);
  function handleDirect() {
    navigate(`/`);
  }
  useEffect(() => {
    // Scroll whole page to top
    window.scrollTo(0, 0);

    // Scroll modal overlay to top
    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }
  }, [Name]); // runs when opening a new property modal

  const times = [
    "11:00 AM",
    "12:00 PM",
    "08:00 AM",
    "01:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  function handleAddTime(time) {
    setSelectedTime(time);
  }

  return (
    <>
      <img
        src={logo}
        alt="logo"
        className={styles.logo}
        onClick={() => handleDirect()}
      />
      <div ref={overlayRef} className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.top}>
            <div>
              <h2 className={styles.title}>Schedule a Viewing</h2>
              <p className={styles.subtitle}>
                Select your preferred date and time.
              </p>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.block}>
                <p className={styles.blockLabel}>Select a date</p>
                <div className={styles.calendarWrap}>
                  <Calendar />
                </div>
              </div>

              <div className={styles.block}>
                <p className={styles.blockLabel}>Select a time</p>

                <div className={styles.times}>
                  {times.map((time, index) => (
                    <button
                      key={`${time}-${index}`}
                      type="button"
                      onClick={() => handleAddTime(time)}
                      className={`${styles.time} ${
                        selectedTime === time ? styles.timeSelected : ""
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className={styles.confirmRow}>
                  <button className={styles.confirmBtn} type="button">
                    Confirm Viewing
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.summary}>
                <p className={styles.smallMuted}>
                  You are booking a viewing for:
                </p>
                <div className={styles.propAddress}>{Name}</div>
              </div>

              <div className={styles.form}>
                <div className={styles.field}>
                  <label className={styles.label}>Your Name</label>
                  <input className={styles.input} placeholder="John Doe" />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    className={styles.input}
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Phone Number</label>
                  <input
                    className={styles.input}
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Notes or Questions</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Optional: e.g., 'I'm interested in the parking situation.'"
                  />
                </div>
              </div>

              <div className={styles.agent}>
                <p className={styles.agentTitle}>Your agent for this viewing</p>
                <div className={styles.agentRow}>
                  <div className={styles.avatar} />
                  <div className={styles.agentInfo}>
                    <div className={styles.agentName}>Jane Doe</div>
                    <div className={styles.agentOrg}>RealtyCo Agents</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
