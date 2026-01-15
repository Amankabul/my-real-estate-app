import { useMemo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPropertyDetails } from "../queries/detials";
import { supabase } from "../supabase-client";
import styles from "../styles/Details.module.css";
import DetailsPanel from "./DetailsPanel.jsx";
import logo from "../images/new-logo.png";
export default function Details() {
  const navigate = useNavigate();
  const { type, id } = useParams();

  function handleDirect() {
    navigate(`/`);
  }
  // ✅ pick bucket based on type (change names if yours are different)
  const BUCKET = type?.toLowerCase() === "sell" ? "sell-images" : "rent-images";

  const [imagesWithUrl, setImagesWithUrl] = useState([]);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["property-details", type, id],
    enabled: !!type && !!id,
    queryFn: () => fetchPropertyDetails({ type, id }),

    // ✅ stop refetch that remounts/reloads images
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,

    // ✅ keep old data rendered while it refetches
    placeholderData: (prev) => prev,
  });

  const images = useMemo(
    () => data?.rent_images ?? data?.sell_images ?? [],
    [data]
  );

  /**
   * ✅ URL Strategy:
   * - If your bucket is PUBLIC: use stable public URL (best, no flicker)
   * - If your bucket is PRIVATE: signed URLs are fine, but ONLY generate when images list changes
   */
  useEffect(() => {
    let cancelled = false;

    async function buildUrls() {
      if (!images.length) {
        setImagesWithUrl([]);
        return;
      }

      const signedOut = await Promise.all(
        images.map(async (img) => {
          const path = (img?.image_path || "").trim();
          if (!path) return { ...img, publicUrl: "" };

          const { data: signed, error } = await supabase.storage
            .from(BUCKET)
            .createSignedUrl(path, 60 * 60); // 1 hour

          if (error) {
            console.log("SIGNED URL ERROR:", { BUCKET, path, error });
            return { ...img, publicUrl: "" };
          }

          return { ...img, publicUrl: signed?.signedUrl || "" };
        })
      );

      if (!cancelled) setImagesWithUrl(signedOut);
    }

    buildUrls();

    return () => {
      cancelled = true;
    };
  }, [images, BUCKET]);

  // ✅ Only show full-screen loader on FIRST load (no data to show yet)
  if (isLoading && !data) {
    return (
      <div
        style={{
          minHeight: "60vh",
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
    );
  }

  if (error) return <p className={styles.statusError}>{error.message}</p>;

  const big = imagesWithUrl[0] || null;
  const small = imagesWithUrl.slice(1, 5);

  return (
    <div className={styles.page}>
      <img
        src={logo}
        alt="logo"
        className={styles.logo}
        onClick={() => handleDirect()}
      />
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>{data?.Name || "Property Name"}</h1>
            <p className={styles.address}>{data?.address || ""}</p>
          </div>
        </div>

        {/* ✅ IMPORTANT: show “Updating…” instead of unmounting */}
        {isFetching && (
          <p className={styles.status} style={{ margin: "6px 0 14px" }}>
            Updating...
          </p>
        )}

        {/* Gallery */}
        <section className={styles.galleryWrap}>
          {!imagesWithUrl.length ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No images found</p>
              <p className={styles.emptyText}>
                Images will appear here when your data loads from the database.
              </p>
            </div>
          ) : (
            <div className={styles.galleryGrid}>
              {/* Big */}
              <article className={styles.mainCard}>
                {big?.publicUrl ? (
                  <img
                    className={styles.mainImg}
                    src={big.publicUrl}
                    alt="Property image"
                    loading="lazy"
                    decoding="async"
                    onError={() => console.log("BIG IMG FAILED:", big)}
                  />
                ) : (
                  <div className={styles.noImage}>No image</div>
                )}

                <div className={styles.mainOverlay}>
                  <button type="button" className={styles.tourBtn}>
                    <span className={styles.tourIcon} aria-hidden="true" />
                    Virtual Tour
                  </button>
                </div>
              </article>

              {/* Small 4 */}
              <aside className={styles.thumbsGrid}>
                {small.map((img) => (
                  <article key={img.id} className={styles.thumbCard}>
                    {img?.publicUrl ? (
                      <img
                        className={styles.thumbImg}
                        src={img.publicUrl}
                        alt="Property image"
                        loading="lazy"
                        decoding="async"
                        onError={() => console.log("THUMB FAILED:", img)}
                      />
                    ) : (
                      <div className={styles.thumbPlaceholder}>
                        <span>Image</span>
                      </div>
                    )}
                  </article>
                ))}

                {Array.from({ length: Math.max(0, 4 - small.length) }).map(
                  (_, i) => (
                    <article key={`ph-${i}`} className={styles.thumbCard}>
                      <div className={styles.thumbPlaceholder}>
                        <span>Image</span>
                      </div>
                    </article>
                  )
                )}
              </aside>
            </div>
          )}
        </section>
      </div>

      <DetailsPanel data={data} />
    </div>
  );
}
