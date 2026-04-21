import { useState, useEffect, useRef } from "react";
import styles from "../styles/ScheduleViewingModal.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import profile from "../images/profile.jpg";
import logo from "../images/new-logo.png";

export default function ScheduleViewingModal() {
  const { Name } = useParams();
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  const [selectedTime, setSelectedTime] = useState("");

  // ✅ Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  function handleDirect() {
    navigate(`/`);
  }

  // ✅ Handle typing
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit form
  const handleSubmitForm = (e) => {
    e.preventDefault();

    alert("Form submitted, thank you!");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      notes: "",
    });

    // Reset selected time
    setSelectedTime("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (overlayRef.current) {
      overlayRef.current.scrollTop = 0;
    }
  }, [Name]);

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
        onClick={handleDirect}
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
            {/* LEFT SIDE */}
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
                  <button
                    className={styles.confirmBtn}
                    type="submit"
                    form="viewingForm"
                  >
                    Confirm Viewing
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className={styles.right}>
              <div className={styles.summary}>
                <p className={styles.smallMuted}>
                  You are booking a viewing for:
                </p>
                <div className={styles.propAddress}>{Name}</div>
              </div>

              <form onSubmit={handleSubmitForm} id="viewingForm">
                <div className={styles.form}>
                  <div className={styles.field}>
                    <label className={styles.label}>Your Name</label>
                    <input
                      name="name"
                      className={styles.input}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Email Address</label>
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
                    <label className={styles.label}>Phone Number</label>
                    <input
                      name="phone"
                      className={styles.input}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      Notes or Questions (optional)
                    </label>
                    <textarea
                      name="notes"
                      className={styles.textarea}
                      value={formData.notes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>

              <div className={styles.agent}>
                <p className={styles.agentTitle}>Your agent for this viewing</p>

                <div className={styles.agentRow}>
                  <img
                    src={profile}
                    alt="profile"
                    style={{ height: "5rem", borderRadius: "100%" }}
                  />

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
