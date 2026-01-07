import { useEffect, useState } from "react";
import styles from "../styles/DetailsPanel.module.css";
import bath from "../icons/bath-solid-full.svg";
import bed from "../icons/bed-solid-full.svg";
import house from "../icons/house-solid-full.svg";
import { useNavigate } from "react-router-dom";

// You can control these later:
// activeTab: "description" | "floorplans" | "map"
export default function DetailsPanel({ data }) {
  const navigate = useNavigate();

  function Navigato() {
    navigate(`/agentcontact`);
  }
  const [activeTab, setActiveTab] = useState("description");
  function onTabChange(filter) {
    setActiveTab(() => filter);
  }
  useEffect(() => {
    console.log("Data changed:", data);
  }, [data]);
  console.log(activeTab);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT SIDE */}
          <div className={styles.left}>
            {/* Top stats row */}
            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <div className={styles.iconBox}>
                  <img src={bed} alt="bed" />
                </div>
                <div className={styles.statText}>
                  <div className={styles.statValue}>{data.bedroom}</div>
                  <div className={styles.statLabel}>Bedrooms</div>
                </div>
              </div>

              <div className={styles.stat}>
                <div className={styles.iconBox}>
                  <img src={bath} alt="bath" />
                </div>
                <div className={styles.statText}>
                  <div className={styles.statValue}>{data.Bathroom}</div>
                  <div className={styles.statLabel}>Bathrooms</div>
                </div>
              </div>

              <div className={styles.stat}>
                <div className={styles.iconBox}>
                  <img src={house} alt="house" />
                </div>
                <div className={styles.statText}>
                  <div className={styles.statValue}>{data.Size}</div>
                  <div className={styles.statLabel}>Sq. Ft.</div>
                </div>
              </div>
            </div>

            <div
              className={styles.tabs}
              role="tablist"
              aria-label="Property tabs"
            >
              <button
                type="button"
                className={`${styles.tab} ${
                  activeTab === "description" ? styles.activeTab : ""
                }`}
                onClick={() => onTabChange("description")}
              >
                Description
              </button>

              <button
                type="button"
                className={`${styles.tab} ${
                  activeTab === "floorplans" ? styles.activeTab : ""
                }`}
                onClick={() => onTabChange("floorplans")}
              >
                Floor Plans
              </button>

              <button
                type="button"
                className={`${styles.tab} ${
                  activeTab === "map" ? styles.activeTab : ""
                }`}
                onClick={() => onTabChange("map")}
              >
                Map
              </button>
            </div>

            {/* Content area (you will swap content using activeTab) */}
            <div className={styles.content}>
              {/* Description */}
              <div
                className={`${styles.panel} ${
                  activeTab === "description" ? styles.show : styles.hide
                }`}
              >
                {data?.Description &&
                  data.Description.split(". ")
                    .reduce((acc, sentence, index) => {
                      const chunkIndex = Math.floor(index / 3);
                      acc[chunkIndex] = acc[chunkIndex]
                        ? acc[chunkIndex] + ". " + sentence
                        : sentence;
                      return acc;
                    }, [])
                    .slice(0, 3)
                    .map((text, i) => (
                      <p key={i} className={styles.p}>
                        {text.endsWith(".") ? text : text + "."}
                      </p>
                    ))}
              </div>

              {/* Floor Plans */}
              <div
                className={`${styles.panel} ${
                  activeTab === "floorplans" ? styles.show : styles.hide
                }`}
              >
                <div className={styles.placeholder}>
                  <div className={styles.placeholderTitle}>Floor Plans</div>
                  <div className={styles.placeholderSub}>
                    Put your floor plan images/slider here.
                  </div>
                </div>
              </div>

              {/* Map */}
              <div
                className={`${styles.panel} ${
                  activeTab === "map" ? styles.show : styles.hide
                }`}
              >
                <div className={styles.mapBox}>
                  <div className={styles.mapHead}>
                    <div className={styles.mapTitle}>Map</div>
                    <div className={styles.mapSub}>
                      Embed Google Maps / Mapbox here.
                    </div>
                  </div>
                  <div className={styles.mapBody}>
                    <div className={styles.mapFake}>Map Preview</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside className={styles.right}>
            <div className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.priceLabel}>Price</div>
                <div className={styles.priceValue}>£{data.Price}</div>
              </div>
              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() =>
                    navigate(`/viewing/${data.Name}/${data.id}`, {
                      state: { property: data }, // optional: pass the object
                    })
                  }
                >
                  Schedule a Viewing
                </button>
                <button
                  type="button"
                  className={styles.secondaryBtn}
                  onClick={() => Navigato()}
                >
                  Contact Agent
                </button>
              </div>

              <div className={styles.divider} />

              <div className={styles.agent}>
                <div className={styles.agentLabel}>Listing Agent</div>

                <div className={styles.agentRow}>
                  <div className={styles.avatar} />
                  <div className={styles.agentInfo}>
                    <div className={styles.agentName}>Jane Doe</div>
                    <div className={styles.agentOrg}>RealtyCo Agents</div>
                    <button type="button" className={styles.profileBtn}>
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
