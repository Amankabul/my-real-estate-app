import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SavedProperties.module.css";
import { useBookMarkStore } from "../Store/useBookMarkStore";

function formatPrice(n) {
  if (n == null || Number.isNaN(Number(n))) return "—";
  return new Intl.NumberFormat("en-US").format(Number(n));
}

// ✅ Optional helper: adjust this to your real shape
function getCardImage(p) {
  // If your saved items already have image:
  if (p?.image) return p.image;

  // If your saved items store cover url:
  if (p?.cover?.publicUrl) return p.cover.publicUrl;

  // If your saved items store images array:
  if (Array.isArray(p?.images) && p.images.length > 0) {
    return p.images[0]?.publicUrl || p.images[0]?.url || null;
  }

  return null;
}

export default function SavedProperties() {
  const navigate = useNavigate();

  // ✅ Hooks must be inside component
  const saved = useBookMarkStore((s) => s.bookmark) || [];

  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const pageSize = 8; // 4 per row desktop looks better with 8/12

  const sorted = useMemo(() => {
    const arr = [...saved];

    if (sort === "price_low") {
      arr.sort((a, b) => (Number(a?.price) || 0) - (Number(b?.price) || 0));
    }
    if (sort === "price_high") {
      arr.sort((a, b) => (Number(b?.price) || 0) - (Number(a?.price) || 0));
    }
    // newest: keep store order
    return arr;
  }, [saved, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));

  // keep page valid when list changes
  useMemo(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const pageItems = sorted.slice(start, start + pageSize);

  function goDetails(item) {
    // If you have type in item, use it; otherwise keep "rent"
    const type = item?.type || "rent";
    navigate(`/details/${type}/${item.id}`);
  }
  console.log(pageItems);
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header row */}
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.h1}>Saved Properties</h1>
            <p className={styles.sub}>
              Here are the properties you&apos;ve saved. You can easily manage
              and review them here.
            </p>
          </div>
        </div>

        {/* Grid */}
        {pageItems.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyCard}>
              <h2 className={styles.emptyTitle}>No saved properties</h2>
              <p className={styles.emptyText}>
                Start exploring properties and click the save button to add them
                here.
              </p>
              <button
                className={styles.primaryBtn}
                type="button"
                onClick={() => navigate("/")}
              >
                Browse properties
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.grid}>
            {pageItems.map((p) => {
              const img = getCardImage(p);

              return (
                <article key={p.id} className={styles.card}>
                  <div className={styles.media}>
                    {img ? (
                      <img
                        className={styles.img}
                        src={img}
                        alt={p.address || p.adress || "Property"}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.noImg}>No image</div>
                    )}
                  </div>

                  <div className={styles.body}>
                    <div className={styles.price}>
                      £{formatPrice(p.price || p.Price)}
                    </div>
                    <div className={styles.addr}>
                      {p.address || p.adress || "Address not set"}
                    </div>

                    <div className={styles.meta}>
                      <span className={styles.metaItem}>
                        🛏 {p.bedroom ?? p.bedrooms ?? "—"}
                      </span>
                      <span className={styles.metaItem}>
                        🛁 {p.bathroom ?? p.Bathroom ?? "—"}
                      </span>
                      <span className={styles.metaItem}>📐 {p.Size}</span>
                    </div>

                    <button
                      className={styles.detailsBtn}
                      type="button"
                      onClick={() => goDetails(p)}
                    >
                      View Details
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination UI */}
        {sorted.length > 0 && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              type="button"
              onClick={() => setPage((v) => Math.max(1, v - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ‹
            </button>

            {Array.from({ length: totalPages })
              .slice(0, 5)
              .map((_, idx) => {
                const n = idx + 1;
                return (
                  <button
                    key={n}
                    className={`${styles.pageNum} ${
                      page === n ? styles.activePage : ""
                    }`}
                    type="button"
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                );
              })}

            {totalPages > 5 && <span className={styles.dots}>…</span>}

            {totalPages > 5 && (
              <button
                className={`${styles.pageNum} ${
                  page === totalPages ? styles.activePage : ""
                }`}
                type="button"
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </button>
            )}

            <button
              className={styles.pageBtn}
              type="button"
              onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
