import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import styles from "../styles/Hero.module.css";
import logo from "../images/new-logo.png";
import save from "../icons/save-instagram.png";
import { useBookMarkStore } from "../Store/useBookMarkStore";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  function handleDirect() {
    navigate(`/saved-properties`);
  }

  function handleDirectToContact() {
    navigate(`/contact-us`);
  }

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

  const [activeTab, setActiveTab] = useState("Rent");
  const bookmark = useBookMarkStore((state) => state.bookmark);

  const propertyOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
  ];

  const priceOptions = [
    { value: "immediate", label: "immediate" },
    { value: "1 month", label: "1 month" },
    { value: "flexible", label: "flexible" },
  ];

  const [address, setAddress] = useState("");
  const [rooms, setRooms] = useState(undefined);
  const [moveIn, setMoveIn] = useState(undefined);
  const [addressError, setAddressError] = useState("");

  function switchTab(nextTab) {
    setActiveTab(nextTab);

    // optional UX: reset filters when switching between Rent/Sell
    setRooms(undefined);
    setMoveIn(undefined);
    setAddressError("");
  }

  function handleSearch() {
    const clearAddress = address.trim();

    if (!clearAddress) {
      setAddressError("Please enter a location.");
      return;
    }

    setAddressError("");

    const params = new URLSearchParams();
    params.set("type", activeTab);
    params.set("address", clearAddress);

    if (rooms) params.set("rooms", String(rooms));
    if (moveIn) params.set("moveIn", moveIn);

    navigate(`/search?${params.toString()}`);
    console.log(params.toString());
  }

  return (
    <section
      ref={sectionRef}
      className={`${styles.hero} ${visible ? styles.heroVisible : ""}`}
    >
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logo} alt="RealtyCo logo" />
        </div>

        <div className={styles.navActions}>
          <button
            className={styles.contactBtn}
            onClick={() => handleDirectToContact()}
          >
            Contact Us
          </button>

          <div className={styles.togather} onClick={() => handleDirect()}>
            <img src={save} alt="bookmark" className={styles.save_bookmark} />
            <p>{bookmark.length}</p>
          </div>
        </div>
      </nav>

      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Find your next home in <br />
          <span>Manchester</span>
        </h1>
        <p className={styles.heroSubtitle}>
          The easiest way to buy, sell, and rent properties in the city.
        </p>

        <div className={styles.searchBox}>
          {/* TABS */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${
                activeTab === "Sell" ? styles.active : ""
              }`}
              onClick={() => switchTab("Sell")}
              type="button"
            >
              Buy
            </button>

            <button
              className={`${styles.tabBtn} ${
                activeTab === "Rent" ? styles.active : ""
              }`}
              onClick={() => switchTab("Rent")}
              type="button"
            >
              Rent
            </button>
          </div>

          {/* SEARCH FIELDS */}
          <div className={styles.searchFields}>
            <div className={styles.field}>
              <label>Location</label>
              <input
                type="text"
                placeholder="e.g., Deansgate, Ancoats..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {addressError && (
                <span
                  style={{ color: "red", fontSize: "16 px", marginLeft: "5px" }}
                >
                  {addressError}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label>Room Number</label>
              <Select
                options={propertyOptions}
                placeholder="Select rooms"
                className={styles.reactSelect}
                classNamePrefix="rs"
                isClearable
                onChange={(option) =>
                  setRooms(option ? option.value : undefined)
                }
              />
            </div>

            <div className={styles.field}>
              <label>Move in date</label>
              <Select
                options={priceOptions}
                placeholder="Select move-in"
                className={styles.reactSelect}
                classNamePrefix="rs"
                isClearable
                onChange={(option) =>
                  setMoveIn(option ? option.value : undefined)
                }
              />
            </div>

            <button className={styles.searchBtn} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
