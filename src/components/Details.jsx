import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPropertyDetails } from "../queries/detials";
import { supabase } from "../supabase-client";
import styles from "../styles/Details.module.css";
import DetailsPanel from "./DetailsPanel.jsx";

const BUCKET = "rent-images";

export default function Details() {
  const { type, id } = useParams();
  const [imagesWithUrl, setImagesWithUrl] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  const { data, isLoading, error } = useQuery({
    queryKey: ["property-details", type, id],
    enabled: !!type && !!id,
    queryFn: () => fetchPropertyDetails({ type, id }),
  });

  // ⏱ keep spinner 2.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSpinner(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const images = useMemo(
    () => data?.rent_images ?? data?.sell_images ?? [],
    [data]
  );

  // ✅ Convert image_path -> signed URL (works even if bucket is private)
  useEffect(() => {
    let cancelled = false;

    async function addUrls() {
      if (!images.length) {
        setImagesWithUrl([]);
        return;
      }

      const out = await Promise.all(
        images.map(async (img) => {
          const path = (img?.image_path || "").trim();
          if (!path) return { ...img, publicUrl: "" };

          const { data: signed, error } = await supabase.storage
            .from(BUCKET)
            .createSignedUrl(path, 60 * 60); // 1 hour

          if (error) {
            console.log("SIGNED URL ERROR:", { path, error });
            return { ...img, publicUrl: "" };
          }

          return { ...img, publicUrl: signed?.signedUrl || "" };
        })
      );

      if (!cancelled) setImagesWithUrl(out);
    }

    addUrls();
    return () => {
      cancelled = true;
    };
  }, [images]);

  // ✅ centered spinner + 2.5s delay
  if (isLoading || showSpinner)
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

  if (error) return <p className={styles.statusError}>{error.message}</p>;

  // ✅ no cover logic: first big, next four small
  const big = imagesWithUrl[0] || null;
  const small = imagesWithUrl.slice(1, 5);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>{data?.Name || "Property Name"}</h1>
            <p className={styles.address}>{data?.address || ""}</p>
          </div>
        </div>

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
