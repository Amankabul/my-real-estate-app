import { useEffect, useRef, useState } from "react";
import styles from "../styles/FAQ.module.css";
import { useNavigate } from "react-router-dom";

const FAQ_DATA = {
  buying: [
    {
      q: "How do I schedule a property viewing?",
      a: "You can schedule a viewing directly from the property listing page by clicking the 'Schedule Viewing' button. Alternatively, you may contact one of our agents through the contact form or by phone, and they will help arrange a viewing time that suits your availability.",
    },
    {
      q: "What fees do buyers need to pay?",
      a: "Buyer fees can include legal costs, survey fees, and potential stamp duty, depending on the property and purchase price. Our agents will clearly explain all expected costs upfront so you can plan your budget with confidence.",
    },
    {
      q: "Do I need a mortgage approval before viewing?",
      a: "Mortgage approval is not required to view properties, but having a mortgage agreement in principle can strengthen your position when making an offer and speed up the buying process later on.",
    },
    {
      q: "Can I make an offer below the asking price?",
      a: "Yes, you are free to make an offer below the asking price. Whether it is accepted depends on market conditions, property demand, and the seller’s expectations. Our agents can guide you on making a competitive offer.",
    },
    {
      q: "How long does the buying process take?",
      a: "The buying process typically takes between 8 and 12 weeks from offer acceptance to completion. Timelines may vary depending on legal checks, mortgage approval, and the complexity of the transaction.",
    },
  ],

  selling: [
    {
      q: "How do you determine my property value?",
      a: "We assess your property using current market trends, recent comparable sales, location, and the condition of your home. This ensures a realistic and competitive valuation designed to attract serious buyers.",
    },
    {
      q: "Do I need to renovate before selling?",
      a: "Renovations are not always necessary, but small improvements such as fresh paint or minor repairs can help increase appeal. Our agents can advise you on cost-effective changes that may improve your selling price.",
    },
    {
      q: "How long will my property be listed?",
      a: "The time your property remains on the market depends on factors like pricing, location, and demand. Some properties sell quickly, while others may take longer. We regularly review interest and adjust strategy as needed.",
    },
    {
      q: "What marketing do you provide?",
      a: "We market your property across major real estate platforms, our website, and social media channels. Professional photography and targeted promotion are also used to maximize visibility.",
    },
    {
      q: "Are there any upfront fees?",
      a: "We believe in transparency. Any fees involved are discussed clearly before listing your property, and there are no hidden costs or unexpected charges later in the process.",
    },
  ],

  renting: [
    {
      q: "How is monthly rent paid?",
      a: "Monthly rent is usually paid via bank transfer or secure online payment methods. Payment details and due dates are clearly outlined in your tenancy agreement.",
    },
    {
      q: "What documents are required to rent?",
      a: "Most landlords require valid identification, proof of income or employment, and references. Specific requirements may vary depending on the property and landlord preferences.",
    },
    {
      q: "Is a security deposit required?",
      a: "Yes, a refundable security deposit is typically required before moving in. This deposit is legally protected and returned at the end of the tenancy, subject to property condition.",
    },
    {
      q: "Can I end my lease early?",
      a: "Ending a lease early depends on the terms stated in your rental agreement. In some cases, early termination may be possible with notice or a break clause. Our agents can help clarify your options.",
    },
    {
      q: "Are utilities included in rent?",
      a: "Utility costs vary by property. Some rentals include certain utilities, while others require tenants to pay separately. Full details are always provided in the listing description.",
    },
  ],

  general: [
    {
      q: "Do you work with international clients?",
      a: "Yes, we work with both local and international clients. Our team provides guidance on documentation, legal requirements, and the overall process to ensure a smooth experience.",
    },
    {
      q: "How do I contact an agent?",
      a: "You can contact an agent through our online contact form, by phone, or by email. Our team aims to respond quickly and provide clear, helpful assistance.",
    },
    {
      q: "Are your listings verified?",
      a: "Yes, all listings are carefully reviewed and verified before being published. This ensures accuracy, reliability, and confidence when browsing properties on our platform.",
    },
    {
      q: "Can I save properties to view later?",
      a: "Yes, registered users can bookmark properties and access them later from their account, making it easier to compare and track your favorite listings.",
    },
    {
      q: "Do you offer customer support?",
      a: "Our customer support team is available to assist you at every stage of your journey, whether you have questions about listings, processes, or technical support.",
    },
  ],
};

const TABS = [
  { key: "buying", label: "Buying a Home" },
  { key: "selling", label: "Selling a Home" },
  { key: "renting", label: "Renting" },
  { key: "general", label: "General Inquiries" },
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState("buying");
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  function handleDirect() {
    navigate(`/contact-us`);
  }

  // ✅ scroll reveal (behaviour only)
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
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
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Find answers to common questions about buying, selling, and renting
            properties with us.
          </p>
        </header>

        {/* Tabs */}
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabBtn} ${
                activeTab === tab.key ? styles.activeTab : ""
              }`}
              onClick={() => {
                setActiveTab(tab.key);
                setOpenIndex(0);
              }}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.faqList}>
          {FAQ_DATA[activeTab].map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.question}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                type="button"
              >
                <span>{item.q}</span>
                <span
                  className={`${styles.arrow} ${
                    openIndex === index ? styles.rotate : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {openIndex === index && (
                <div className={styles.answer}>{item.a}</div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.cta}>
          <h3>Can’t find your answer?</h3>
          <p>Our team is here to help. Contact us for any further questions.</p>
          <button className={styles.ctaBtn} onClick={() => handleDirect()}>
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
