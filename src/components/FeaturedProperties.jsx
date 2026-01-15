import { useMemo } from "react";
import styles from "../styles/FearturedProperties.module.css";
import { useFeaturedStore } from "../Store/useFeaturedStore";
import { useQuery } from "@tanstack/react-query";
import { useBookMarkStore } from "../Store/useBookMarkStore.js";
import save from "../icons/save-instagram.png"; // soft
import saveBold from "../icons/bookmark.png"; // bold
import { useNavigate } from "react-router-dom";
import { fetchFeaturedProperties } from "../queries/featured";

const FILTERS = [
  { key: "Rent", label: "For Rent" },
  { key: "Sell", label: "For Sale" },
];

function getCoverImage(property) {
  if (!property?.images?.length) return null;
  return property.images.find((img) => img.is_cover === true) || null;
}

export default function FeaturedProperties() {
  const navigate = useNavigate();

  const activeFilter = useFeaturedStore((s) => s.activeFilter);
  const setActiveFilter = useFeaturedStore((s) => s.setActiveFilter);

  const bookmark = useBookMarkStore((s) => s.bookmark);
  const setBookmark = useBookMarkStore((s) => s.setBookmark);

  const {
    data: properties = [],
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["featured-properties", activeFilter],
    queryFn: () => fetchFeaturedProperties(activeFilter),

    // ✅ prevents refetch loops that remount cards & restart image downloads
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,

    // ✅ keep old cards visible while new filter loads
    placeholderData: (prev) => prev,
  });

  function navigateTo(property) {
    const type = activeFilter; // "Rent" / "Sell"
    navigate(`/details/${type}/${property.id}`);
  }

  function toggleBookmark(property) {
    const exists = bookmark.some((p) => p.id === property.id);
    if (exists) setBookmark(bookmark.filter((p) => p.id !== property.id));
    else setBookmark([property, ...bookmark]);
  }

  const bookmarkedIds = useMemo(
    () => new Set(bookmark.map((p) => p.id)),
    [bookmark]
  );

  // ✅ Only show full-page loader on FIRST load when nothing is rendered yet
  if (isLoading && properties.length === 0) {
    return (
      <div
        className={styles.status}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "3px solid rgba(161, 183, 191, 0.15)",
            borderTop: "3px solid #3749d4ff",
            borderRight: "3px solid #2d54b6ff",
            animation: "spin 0.9s linear infinite",
          }}
        />

        <style>
          {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <p className={styles.status}>
        {error?.message || "Failed to load featured properties"}
      </p>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.topHeader}>
          <div>
            <h2 className={styles.title}>Featured Properties</h2>
            <p className={styles.subtitle}>
              Discover our curated selection of top homes and investments.
            </p>
          </div>
        </div>

        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`${styles.filterBtn} ${
                activeFilter === f.key ? styles.filterActive : ""
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.divider} />

        {/* ✅ IMPORTANT: show “Updating…” instead of unmounting the whole grid */}
        {isFetching && (
          <p className={styles.status} style={{ margin: "10px 0 18px" }}>
            Updating...
          </p>
        )}

        <div className={styles.grid}>
          {properties.map((property) => {
            const cover = getCoverImage(property);
            const isBookmarked = bookmarkedIds.has(property.id);

            return (
              <article key={property.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  {cover?.publicUrl ? (
                    <img
                      src={cover.publicUrl}
                      alt={property.Name || "Property"}
                      className={styles.image}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className={styles.noImage}>No cover image</div>
                  )}

                  <button
                    className={styles.bookmarkBtn}
                    type="button"
                    aria-label="Bookmark"
                    onClick={() => toggleBookmark(property)}
                  >
                    <img
                      src={isBookmarked ? saveBold : save}
                      alt="bookmark"
                      className={styles.save_bookmark}
                    />
                  </button>
                </div>

                <div className={styles.content}>
                  <p className={styles.price}>£{property.Price}</p>
                  <p className={styles.address}>
                    {property.address || property.adress || "Address not set"}
                  </p>

                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      🛏 {property.bedroom}
                    </span>
                    <span className={styles.metaItem}>
                      🛁 {property.Bathroom}
                    </span>
                    <span className={styles.metaItem}>📐 {property.Size}</span>
                  </div>

                  <button
                    className={styles.detailsBtn}
                    type="button"
                    onClick={() => navigateTo(property)}
                  >
                    View Details
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {properties.length === 0 && (
          <p className={styles.status}>No properties found.</p>
        )}
      </div>
    </section>
  );
}
