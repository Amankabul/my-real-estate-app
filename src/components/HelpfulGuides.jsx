import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/HelpfulGuides.module.css";

import imgBuying from "../images/pexels-mikhail-nilov-7736029.jpg";
import imgRenting from "../images/pexels-anna-nekrashevich-8534460.jpg";
import imgGuide from "../images/pexels-pixabay-280221.jpg";
import imgInvi from "../images/pexels-pixabay-128867.jpg";
import agreement from "../images/pexels-fauxels-3184416.jpg";
import hiddenbudget from "../images/pexels-jakubzerdzicki-27505120.jpg";
import affectPrice from "../images/pexels-tima-miroshnichenko-7567550.jpg";
import proforsale from "../images/pexels-pavel-danilyuk-7937216.jpg";
import commonmistakes from "../images/pexels-tima-miroshnichenko-5708232.jpg";
import locationmatter from "../images/pexels-valentinantonucci-1275393.jpg";
import capitalGrowth from "../images/pexels-dominikagregus-672532.jpg";
import rightchoece from "../images/pexels-vlada-karpovich-6114996.jpg";

const articles = [
  {
    id: 1,
    slug: "buying-first-home",
    category: "BUYING",
    title: "A Step-by-Step Guide to Buying Your First Home",
    text: "Learn the complete process of buying your first home, from budgeting and mortgage approval to making offers and closing the deal with confidence.",
    image: imgBuying,
  },
  {
    id: 2,
    slug: "rental-tips-students",
    category: "RENTING",
    title: "Top Rental Tips for Students & Young Professionals",
    text: "Understand rental agreements, deposits, inspections, and how to secure the perfect rental without unnecessary stress.",
    image: imgRenting,
  },
  {
    id: 3,
    slug: "best-neighborhoods-families",
    category: "NEIGHBORHOOD GUIDE",
    title: "Discover the Best Neighborhoods for Families",
    text: "Explore family-friendly areas with excellent schools, green spaces, transport links, and essential amenities nearby.",
    image: imgGuide,
  },
  {
    id: 4,
    slug: "property-investing-basics",
    category: "INVESTING",
    title: "Beginner’s Guide to Property Investment",
    text: "A practical introduction to property investment, covering rental yields, risk management, and long-term growth strategies.",
    image: imgInvi,
  },
  {
    id: 5,
    slug: "understanding-tenancy-agreements",
    category: "RENTING",
    title: "Understanding Tenancy Agreements Clearly",
    text: "Break down complex tenancy contracts and learn your rights, responsibilities, and how to avoid common rental disputes.",
    image: agreement,
  },
  {
    id: 6,
    slug: "hidden-costs-buying",
    category: "BUYING",
    title: "How to Budget for Hidden Property Costs",
    text: "Discover the hidden costs of buying a home, including legal fees, taxes, maintenance, and insurance expenses.",
    image: hiddenbudget,
  },
  {
    id: 7,
    slug: "what-affects-property-prices",
    category: "MARKET",
    title: "What Affects Property Prices?",
    text: "Learn how location, interest rates, market demand, and economic trends influence property prices over time.",
    image: affectPrice,
  },
  {
    id: 8,
    slug: "prepare-property-sale",
    category: "SELLING",
    title: "Preparing Your Property for Sale",
    text: "Simple improvements and staging tips that can help you sell your property faster and achieve a better price.",
    image: proforsale,
  },
  {
    id: 9,
    slug: "avoid-common-renting-mistakes",
    category: "RENTING",
    title: "How to Avoid Common Renting Mistakes",
    text: "Avoid costly rental mistakes by understanding inspections, communication with landlords, and proper documentation.",
    image: commonmistakes,
  },
  {
    id: 10,
    slug: "location-matters",
    category: "LOCATION",
    title: "Why Location Matters in Property",
    text: "A deep dive into how transport, schools, and future developments impact property value and livability.",
    image: locationmatter,
  },
  {
    id: 11,
    slug: "rental-yield-vs-capital-growth",
    category: "INVESTING",
    title: "Rental Yield vs Capital Growth Explained",
    text: "Understand the difference between rental income and long-term appreciation when choosing investment properties.",
    image: capitalGrowth,
  },
  {
    id: 12,
    slug: "buying-vs-renting",
    category: "GUIDE",
    title: "Buying vs Renting: Making the Right Choice",
    text: "Compare the advantages and disadvantages of buying versus renting based on lifestyle, finances, and goals.",
    image: rightchoece,
  },
];

export default function HelpfulGuides() {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const visibleArticles = showAll ? articles : articles.slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Heading */}
        <header className={styles.header}>
          <h2 className={styles.title}>Helpful Guides &amp; Resources</h2>
          <p className={styles.subtitle}>
            Expert advice to guide you on your property journey, whether
            you&apos;re buying,
            <br />
            renting, or exploring new neighborhoods.
          </p>
        </header>

        {/* Cards */}
        <div className={styles.grid}>
          {visibleArticles.map((a) => (
            <article key={a.id} className={styles.card}>
              <div className={styles.imageWrap}>
                <img className={styles.image} src={a.image} alt={a.title} />
              </div>

              <div className={styles.body}>
                <span className={styles.pill}>{a.category}</span>

                <h3 className={styles.cardTitle}>{a.title}</h3>
                <p className={styles.text}>{a.text}</p>

                {/* ✅ Redirect to details page */}
                <button
                  className={styles.readMore}
                  type="button"
                  onClick={() => navigate(`/guides/${a.slug}`)}
                >
                  Read More <span className={styles.arrow}>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom button */}
        <div className={styles.bottom}>
          <button
            className={styles.viewAll}
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show less articles" : "View all articles"}
          </button>
        </div>
      </div>
    </section>
  );
}
