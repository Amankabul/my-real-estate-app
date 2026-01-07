import { useEffect, useMemo, useState } from "react";
import styles from "../styles/Search.module.css";
import logo from "../images/new-logo.png";
import { useNavigate, useSearchParams } from "react-router-dom";

import save from "../icons/save-instagram.png"; // soft
import bath from "../icons/bath-solid-full.svg";
import bed from "../icons/bed-solid-full.svg";
import house from "../icons/house-solid-full.svg";
import saveBold from "../icons/bookmark.png"; // bold
import { useQuery } from "@tanstack/react-query";
import { fetchSearchedProperties } from "../queries/Searched";
import { useBookMarkStore } from "../Store/useBookMarkStore";
import { supabase } from "../supabase-client";

export default function Search() {
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(true);

  const [searchParams] = useSearchParams();

  const params = {
    type: searchParams.get("type") ?? "Rent",
    address: searchParams.get("address"),
    rooms: searchParams.get("rooms"),
    moveIn: searchParams.get("moveIn"),
  };

  function navigateTo(property) {
    const typeFromQuery = (params.type || "Rent").toLowerCase();
    navigate(`/details/${typeFromQuery}/${property.id}`);
  }

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["searchedProperties", params],
    queryFn: () => fetchSearchedProperties(params),
  });

  /* ⏱ keep spinner for 2.5 seconds */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const BUCKET = "rent-images";
  const imagesKey = params.type === "Rent" ? "rent_images" : "sell_images";

  const bookmark = useBookMarkStore((s) => s.bookmark);
  const setBookmark = useBookMarkStore((s) => s.setBookmark);

  const bookmarkedIds = useMemo(
    () => new Set(bookmark.map((p) => p.id)),
    [bookmark]
  );

  function getCoverImage(property) {
    const imgs = property?.[imagesKey] || [];
    return imgs.find((img) => img.is_cover === true) || null;
  }

  function toggleBookmark(property) {
    const exists = bookmark.some((p) => p.id === property.id);
    if (exists) setBookmark(bookmark.filter((p) => p.id !== property.id));
    else setBookmark([property, ...bookmark]);
  }

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <img src={logo} alt="logo" className={styles.logo} />
          </div>
        </div>
      </header>

      {/* TOP BAR */}
      <section className={styles.top}>
        <div className={styles.topInner}>
          <div>
            <h1 className={styles.title}>
              {data.length} Results found for{" "}
              <span className={styles.quote}>{params.address}</span>
            </h1>
            <p className={styles.subtitle}>Showing 0-0 of 0 properties</p>
          </div>
        </div>
      </section>

      {/* BODY */}
      <main className={styles.main}>
        {/* ✅ CENTERED SPINNER */}
        {(isLoading || showSpinner) && (
          <div
            style={{
              minHeight: "40vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
        )}

        {error && (
          <p className={styles.emptyText}>
            {error.message || "Failed to load results"}
          </p>
        )}

        {!isLoading && !showSpinner && (
          <div className={styles.grid}>
            {data.map((property) => {
              const cover = getCoverImage(property);
              const isBookmarked = bookmarkedIds.has(property.id);

              const coverUrl = cover?.image_path
                ? supabase.storage.from(BUCKET).getPublicUrl(cover.image_path)
                    .data.publicUrl
                : null;

              return (
                <article key={property.id} className={styles.card}>
                  <div className={styles.imageWrap}>
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={property.Name || "Property"}
                        className={styles.image}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.noImage}>No cover image</div>
                    )}

                    <button
                      className={styles.bookmarkBtn}
                      type="button"
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
                        <img src={bed} alt="bedroom" className={styles.icons} />
                        {property.bedroom}
                      </span>
                      <span className={styles.metaItem}>
                        <img
                          src={bath}
                          alt="bathroom"
                          className={styles.icons}
                        />
                        {property.Bathroom}
                      </span>
                      <span className={styles.metaItem}>
                        <img src={house} alt="size" className={styles.icons} />
                        {property.Size}
                      </span>
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
        )}
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} RealEstateCo. All rights reserved.
      </footer>
    </div>
  );
}
