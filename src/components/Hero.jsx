import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import styles from "../styles/Hero.module.css";
import logo from "../images/new-logo.png";
import save from "../icons/save-instagram.png";
import { useBookMarkStore } from "../Store/useBookMarkStore";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase-client";

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

  // ===================== Suggestions (Typeahead) =====================
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggestError, setSuggestError] = useState("");

  const debounceRef = useRef(null);
  // ==================================================================

  function switchTab(nextTab) {
    setActiveTab(nextTab);

    setRooms(undefined);
    setMoveIn(undefined);
    setAddressError("");

    // reset suggestions
    setSuggestions([]);
    setSuggestError("");
    setShowSuggestions(false);
  }

  useEffect(() => {
    const q = address.trim();

    // If less than 2 chars, close dropdown
    if (q.length < 2) {
      setSuggestions([]);
      setSuggestError("");
      setShowSuggestions(false);
      setSuggestLoading(false);
      return;
    }

    setShowSuggestions(true); // ✅ keep it open while typing

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setSuggestLoading(true);
        setSuggestError("");

        // pick table by tab
        const table = activeTab === "Rent" ? "Rent" : "Sell";

        // ✅ SIMPLE + RELIABLE query (only address)
        // We know you have `address` from your search URLs.
        const { data, error } = await supabase
          .from(table)
          .select("id,address")
          .ilike("address", `%${q}%`)
          .limit(8);

        if (error) {
          console.error("Suggestion error:", error);
          setSuggestions([]);
          setSuggestError(error.message || "Permission / query error");
          return;
        }

        const items =
          (data ?? []).map((p) => ({
            id: `${activeTab.toLowerCase()}-${p.id}`,
            label: p.address ?? `#${p.id}`,
            type: activeTab.toLowerCase(), // "rent" | "sell"
            propertyId: p.id,
          })) ?? [];

        setSuggestions(items);
      } catch (err) {
        console.error("Suggestion crash:", err);
        setSuggestions([]);
        setSuggestError("Unexpected error. Check console.");
      } finally {
        setSuggestLoading(false);
      }
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [address, activeTab]);

  function handlePickSuggestion(item) {
    if (item?.type && item?.propertyId) {
      setShowSuggestions(false);
      navigate(`/details/${item.type}/${item.propertyId}`);
      return;
    }

    if (item?.label) setAddress(item.label);
    setShowSuggestions(false);
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

    setShowSuggestions(false);
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
            {/* ========= Location + Suggestions ========= */}
            <div className={styles.field} style={{ position: "relative" }}>
              <label>Location</label>
              <input
                type="text"
                placeholder="e.g., Deansgate, Ancoats..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() =>
                  address.trim().length >= 2 && setShowSuggestions(true)
                }
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              />

              {addressError && (
                <span
                  style={{ color: "red", fontSize: "16px", marginLeft: "5px" }}
                >
                  {addressError}
                </span>
              )}

              {/* ✅ Always show dropdown when typing >=2 chars */}
              {showSuggestions && address.trim().length >= 2 && (
                <div
                  style={{
                    position: "absolute",
                    top: "105%",
                    left: 0,
                    right: 0,
                    background: "#fff",
                    border: "1px solid #e6eaf1",
                    borderRadius: 12,
                    overflow: "hidden",
                    zIndex: 50,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  {suggestLoading && (
                    <div style={{ padding: 12, fontSize: 14, opacity: 0.75 }}>
                      Searching…
                    </div>
                  )}

                  {!suggestLoading && suggestError && (
                    <div
                      style={{ padding: 12, fontSize: 14, color: "#b91c1c" }}
                    >
                      Error: {suggestError}
                    </div>
                  )}

                  {!suggestLoading &&
                    !suggestError &&
                    suggestions.length === 0 && (
                      <div style={{ padding: 12, fontSize: 14, opacity: 0.75 }}>
                        No results found
                      </div>
                    )}

                  {!suggestLoading &&
                    !suggestError &&
                    suggestions.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handlePickSuggestion(item)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "10px 12px",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ fontWeight: 700 }}>
                          {item.label}
                          <span
                            style={{
                              marginLeft: 8,
                              fontSize: 12,
                              opacity: 0.7,
                              fontWeight: 600,
                            }}
                          >
                            • {String(item.type).toUpperCase()}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              )}
            </div>
            {/* ========================================= */}

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
