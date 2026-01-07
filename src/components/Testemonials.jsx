import { useEffect, useRef, useState } from "react";
import styles from "../Styles/Testemonials.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import avatar1 from "../images/profile-1.jpg";
import avatar2 from "../images/profile-2.jpg";
import avatar3 from "../images/profile-3.jpg";
import avatar4 from "../images/profile-4.jpg";
import avatar5 from "../images/profile-5.jpg";

import quoteIcon from "../icons/quote-left-solid-full.svg";
import starIcon from "../icons/yello-star.svg";

const TESTIMONIALS = [
  {
    name: "Alex Morgan",
    location: "England",
    text: "Amazing service, friendly agents, and fast responses. They helped me find my perfect home without stress or hidden costs.",
    rating: 5,
    avatar: avatar1,
  },
  {
    name: "Emma Lee",
    location: "Washington",
    text: "Professional team with excellent local knowledge. The entire buying process felt smooth, transparent, and incredibly well supported.",
    rating: 5,
    avatar: avatar2,
  },
  {
    name: "Amanullah",
    location: "Afghanistan",
    text: "From first viewing to final keys, everything was handled perfectly. Highly recommended for anyone searching serious property experts.",
    rating: 5,
    avatar: avatar3,
  },
  {
    name: "Watson",
    location: "Norway",
    text: "Honest advice, great communication, and outstanding listings. I felt confident and supported throughout every step of my journey.",
    rating: 4.5,
    avatar: avatar4,
  },
  {
    name: "Sofia",
    location: "Afghanistan",
    text: "Reliable agents who truly care about clients. They listened carefully and delivered results beyond my expectations every time..",
    rating: 5,
    avatar: avatar5,
  },
];

export default function Testimonials() {
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

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.sectionVisible : ""}`}
    >
      <div className={styles.inner}>
        <p className={styles.kicker}>Testimonials</p>

        <h2 className={styles.heading}>
          <span className={styles.highlight}>5K+ Happy Members</span>{" "}
          <span> Said To Us They Are Very Satisfied</span>
        </h2>

        <Swiper
          className={styles.slider}
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={TESTIMONIALS.length > 1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {TESTIMONIALS.map((t, idx) => (
            <SwiperSlide key={t.name + idx} className={styles.slide}>
              <article className={styles.card}>
                <header className={styles.cardHeader}>
                  <div className={styles.profile}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className={styles.avatar}
                    />
                    <div>
                      <h3 className={styles.name}>{t.name}</h3>
                      <p className={styles.location}>{t.location}</p>
                    </div>
                  </div>

                  <img src={quoteIcon} alt="" className={styles.quoteIcon} />
                </header>

                <p className={styles.text}>{t.text}</p>

                <footer className={styles.cardFooter}>
                  <span className={styles.ratingsLabel}>Ratings</span>
                  <span className={styles.ratingValue}>
                    {t.rating.toFixed(1)}
                  </span>
                  <span className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img
                        key={i}
                        src={starIcon}
                        alt="star"
                        className={styles.starIcon}
                      />
                    ))}
                  </span>
                </footer>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
