import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/GuideDetails.module.css";

import imgBuying from "../images/pexels-mikhail-nilov-7736029.jpg";
import imgRenting from "../images/pexels-cristian-rojas-7261085.jpg";
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
    text: "Learn the complete process of buying your first home, from budgeting to closing day.",
    longText:
      "Buying your first home becomes easier when you follow a clear plan. Start by setting a realistic budget that includes not only the property price, but also extra costs like solicitor fees, surveys, mortgage fees, moving costs, insurance, and the first months of bills. Many first-time buyers feel confident about the deposit but forget the extra costs—so build a buffer fund if you can.\n\nBefore you start booking viewings, check your credit profile and understand your monthly affordability. Getting a mortgage agreement in principle helps you know your range and makes sellers take you seriously. At the same time, write down your “must-haves” (location, bedrooms, transport, parking, garden) and your “nice-to-haves” (open plan, office room, new kitchen). This keeps you focused when you see a property that looks good in photos but doesn’t fit your real needs.\n\nNext, research areas carefully: transport links, schools, safety, nearby shops, and future development. Visit the neighborhood in the morning, afternoon, and evening. Notice noise levels, parking, and how the street feels. If possible, speak to neighbors or check local community groups for honest feedback about the area.\n\nWhen viewing properties, look beyond decoration—check damp signs, roof condition, windows, heating system, and overall structure. Ask about the boiler age, insulation, and any recent repairs. Open taps to test water pressure. Look for cracks, stains, or smells that may indicate hidden problems. Small details during a viewing can save you from huge costs later.\n\nWhen you find the right home, make an offer based on local sold prices and the property condition—not just the listing price. If the property needs work, don’t be afraid to offer lower and explain why. If the seller rejects, you can negotiate. Always avoid getting emotionally attached too early; the best deals come from calm decisions.\n\nAfter your offer is accepted, instruct a solicitor or conveyancer and arrange a survey. A survey can reveal issues like roof problems, damp, timber decay, or structural movement. If major issues appear, use the survey to renegotiate, request repairs, or walk away if the risk is too high. Remember: you’re not “wasting time” by walking away—you're protecting your future.\n\nDuring conveyancing, review the contract and confirm exactly what is included in the sale. Ask about fixtures and fittings, service history of appliances, and any guarantees. If it’s leasehold, check service charges, restrictions, and remaining lease length. If anything looks unclear, ask questions until you fully understand it.\n\nWhen everything is ready, you exchange contracts and then complete the purchase. Plan your moving day early: removals, packing, utilities, and internet. Change your address for banks and services. Keep all documents safe in one folder—mortgage paperwork, warranties, and solicitor letters.\n\nAfter moving in, expect small surprises. Even good homes usually need minor adjustments. Keep that emergency fund available for early repairs and improvements. Make a simple checklist: safety checks, smoke alarms, locks, boiler service, and energy improvements. Buying your first home is a process, not one decision—if you follow the steps and stay careful, you’ll feel confident and enjoy your home without regret.",
    image: imgBuying,
  },
  {
    id: 2,
    slug: "rental-tips-students",
    category: "RENTING",
    title: "Top Rental Tips for Students & Young Professionals",
    text: "Avoid common mistakes and secure a great rental by understanding checks, deposits, and contracts.",
    longText:
      "Start by setting your monthly budget, then include extra costs like bills, council tax (if applicable), internet, transport, and food. Many renters focus only on rent and forget these extras, which later creates stress. If you’re sharing with friends, agree early on how bills will be divided and how responsibilities (cleaning, supplies, quiet hours) will be handled.\n\nWhen viewing rentals, don’t rush. Test water pressure, check heating, and inspect windows and doors. Look for signs of damp or mould (especially around windows and corners). Ask whether the boiler has been serviced, whether insulation is good, and how quickly repairs are usually done. If you work or study from home, ask about internet speed and signal quality.\n\nBefore signing, read the tenancy agreement carefully. Confirm the tenancy length, notice period, and who is responsible for repairs. Check how rent increases work and what happens if rent is late. Make sure your deposit is protected in a deposit scheme and request written confirmation. Deposit protection is one of the most important safety steps.\n\nCheck the inventory. The inventory matters because it affects your deposit return. If the inventory says “perfect condition” but the property has marks or damage, you must correct it immediately. Take photos and videos at move-in and report issues in writing the same day. Keep these photos in a folder so you can find them easily later.\n\nLearn the move-in checklist: take meter readings, confirm keys, test appliances, and check smoke alarms. If you notice problems—loose handles, broken tiles, poor heating—report it right away. If you wait weeks, it becomes harder to prove it wasn’t your fault.\n\nDuring the tenancy, keep communication clear and written when possible. If something breaks, report it politely and directly. If you’re unsure whether it’s your responsibility or the landlord’s, ask. The goal is to create a calm paper trail that protects both sides.\n\nIf you plan to move out, understand the notice rules. Confirm your move-out date, clean properly, and take photos again. Match the photos with your move-in evidence. Return keys properly and keep proof of key return.\n\nRenting well is mostly about preparation and documentation. If you check the property carefully, understand the contract, and keep evidence, you avoid 90% of renting problems. A smart renter is not someone who worries a lot—it’s someone who keeps things clear and organised.",
    image: imgRenting,
  },
  {
    id: 3,
    slug: "best-neighborhoods-families",
    category: "NEIGHBORHOOD GUIDE",
    title: "Discover the Best Neighborhoods for Families",
    text: "Find areas with strong schools, parks, safety, and convenient services for everyday life.",
    longText:
      "For families, the best neighborhood is usually a mix of safety, good schools, green spaces, and convenience. Start by researching schools and catchment areas, and then confirm with real-life visits because online information can be outdated. If education is a priority, also consider nursery options, after-school activities, libraries, and places where children can spend time safely.\n\nTransport matters too. Being close to tram, bus, or motorway links can save hours each week and reduce daily stress. Also check walking distance to supermarkets, pharmacies, healthcare, and local services. A neighborhood may look perfect on a map but feel difficult in real life if everything requires long travel.\n\nVisit the area at different times: weekday mornings, afternoons, evenings, and weekends. Notice noise levels, traffic, parking, and whether the streets feel comfortable. Look for signs of community life: families walking, local events, well-maintained parks, and friendly local shops.\n\nThink about day-to-day safety and comfort. Street lighting, pedestrian crossings, speed of cars, and how people behave in the area all matter. If possible, speak to residents or local shop owners. Quick conversations can reveal the true strengths and problems of an area.\n\nAlso consider home types and long-term growth. Areas with regeneration, improved transport, or new public projects may increase in value over time. But regeneration can also bring construction disruption in the short term, so weigh the trade-off.\n\nFinally, match the area to your lifestyle. Some families prefer quiet and space, others prefer city access and convenience. The best choice isn’t only about rankings—it’s about what supports your family’s routine and well-being every day. When the location fits your real life, everything becomes easier.",
    image: imgGuide,
  },
  {
    id: 4,
    slug: "property-investing-basics",
    category: "INVESTING",
    title: "Beginner’s Guide to Property Investment",
    text: "Understand rental yield, risks, and strategies to build long-term wealth through property.",
    longText:
      "Property investment success is built on research and risk control. Start by understanding two key numbers: rental yield (income) and capital growth (value increase). A good investment depends on area demand, tenant profile, and property condition. If you invest without studying demand, you risk long vacancies and unstable income.\n\nAlways calculate realistic costs: mortgage payments, insurance, repairs, void periods, management fees, safety certificates, and unexpected maintenance. Even a strong rent can become a loss if costs are underestimated. Smart investors build a buffer fund so a broken boiler doesn’t destroy their cash flow.\n\nChoose locations with steady demand—near universities, hospitals, city centres, or major transport links. Then check the details: average rent levels, vacancy time, and tenant expectations. Some tenant groups value modern kitchens; others value transport access. Your property choice should match your tenant market.\n\nDecide your strategy. Some investors target high yield for monthly income. Others accept lower yield for strong long-term growth. Many balanced investors aim for a property that performs reasonably well in both. Your strategy should match your timeline and risk tolerance.\n\nLearn to evaluate deals with numbers, not emotions. Compare multiple properties, estimate realistic rents, and avoid over-optimistic assumptions. Calculate net yield after costs, not just the “headline rent.” If you’re new, start with simple, safe deals and grow slowly.\n\nFinally, think like a business: keep records, track income and expenses, plan maintenance, and stay compliant with regulations. If you treat property investment as a system, not a gamble, you will make calmer decisions and build steady long-term results.",
    image: imgInvi,
  },
  {
    id: 5,
    slug: "understanding-tenancy-agreements",
    category: "RENTING",
    title: "Understanding Tenancy Agreements Clearly",
    text: "Learn what to check in a contract so you don’t get trapped by hidden clauses.",
    longText:
      "Tenancy agreements explain rent, deposits, notice periods, and responsibilities. Before you sign, confirm the rent due date, how rent increases work, and what happens if you pay late. Contracts can look simple, but the small clauses are where problems happen.\n\nCheck who handles repairs and how quickly issues must be reported. Understand rules about guests, pets, smoking, and whether you can redecorate. Also check what counts as fair wear and tear because that affects deposit returns.\n\nConfirm deposit protection and get written proof. Keep a copy of the inventory and take photos of the condition at move-in. If you see damage, report it immediately and keep the message as evidence.\n\nLook for important clauses: early exit rules, renewal terms, and whether the landlord can enter the property and with what notice. If a clause feels unfair or confusing, ask for clarification in writing.\n\nDon’t rely on verbal promises. If a landlord says “we’ll fix it,” ask them to write it down. If the property has issues (damp, broken appliances), request repairs before signing or record an agreement for repairs after move-in.\n\nA tenancy agreement is not only paperwork—it’s protection. When you understand it, you rent with confidence. Spending time to read and ask questions is the best way to avoid disputes and enjoy a smoother renting experience.",
    image: agreement,
  },
  {
    id: 6,
    slug: "hidden-costs-buying",
    category: "BUYING",
    title: "How to Budget for Hidden Property Costs",
    text: "Plan properly by including legal, survey, moving, and maintenance costs from day one.",
    longText:
      "Buying a property includes costs beyond the price. Typical extras include solicitor fees, surveys, mortgage fees, valuation fees, moving services, and initial repairs. Many first-time buyers plan for the deposit but forget these costs until the last moment.\n\nIf the property is leasehold, you may have service charges and ground rent. Also plan for insurance, council tax, and utility setup. If it’s a renovation property, include realistic costs for materials, labour, and time—and assume it will cost more than your first estimate.\n\nA smart approach is to set aside a buffer fund for the first 3–6 months. Even well-maintained homes can surprise you: boiler issues, plumbing leaks, electrical problems, or urgent replacements. That buffer keeps you calm and stable.\n\nAlso consider ongoing ownership costs: maintenance, emergency repairs, garden upkeep, and energy improvements. If you plan upgrades (new kitchen, bathroom, flooring), research pricing properly and plan it in phases.\n\nGood budgeting makes home ownership enjoyable. When you plan the hidden costs, you avoid financial pressure and can make decisions with confidence instead of stress.",
    image: hiddenbudget,
  },
  {
    id: 7,
    slug: "what-affects-property-prices",
    category: "MARKET",
    title: "What Affects Property Prices?",
    text: "Learn how location, demand, rates, and development plans influence property values.",
    longText:
      "Property prices are shaped by demand and affordability. When interest rates rise, monthly mortgage costs increase, which can reduce buyer demand. When rates fall, affordability improves and competition often increases.\n\nLocal factors matter a lot: schools, transport, job opportunities, and amenities. Even being a short walk closer to a station or a good school can change value significantly. Safety, community reputation, and local services also affect how desirable an area feels.\n\nSupply matters too. In areas with limited housing stock, prices can rise faster because competition is higher. In areas with many new builds, supply can soften price growth, especially if demand is not increasing equally.\n\nFuture plans impact price. Regeneration projects, new transport upgrades, business development, or university expansion can push demand higher over time. But short-term construction disruption can make an area feel less attractive temporarily.\n\nA strong way to research is to compare similar sold properties and track trends over time. Focus on sold prices rather than listing prices. When you understand the main drivers—affordability, demand, location quality, supply—you can make smarter decisions and avoid overpaying.",
    image: affectPrice,
  },
  {
    id: 8,
    slug: "prepare-property-sale",
    category: "SELLING",
    title: "Preparing Your Property for Sale",
    text: "Small improvements and good presentation can increase buyer interest and value.",
    longText:
      "Preparation is key to selling quickly. Start with deep cleaning, decluttering, and fixing small issues like cracked paint, loose handles, dripping taps, or broken lights. Buyers notice small problems and use them to negotiate, so fix what you can early.\n\nImprove lighting and create a neutral, spacious feeling. Open curtains, add brighter bulbs, and keep surfaces clear. Simple staging works: tidy beds, clean bathrooms, and remove personal clutter. The goal is to help buyers imagine themselves living there.\n\nProfessional photography matters because most buyers decide based on online listings. Good photos increase clicks, which increases viewings. If your photos are dark or messy, buyers may skip without viewing.\n\nPrepare documents and details: EPC, service charges, warranties, building work receipts, and any renovations. The smoother your information, the more confident buyers feel.\n\nFinally, make your home feel “ready.” A home that feels maintained and cared for creates stronger trust and better offers. Small improvements can produce big results when selling.",
    image: proforsale,
  },
  {
    id: 9,
    slug: "avoid-common-renting-mistakes",
    category: "RENTING",
    title: "How to Avoid Common Renting Mistakes",
    text: "From poor inspections to unclear contracts—avoid the issues that cause stress later.",
    longText:
      "A common mistake is skipping the inspection. Always check damp, mould, heating, water pressure, windows, and door locks. Ask about internet speed if you work online. Simple checks during viewing prevent big problems after move-in.\n\nRead the agreement carefully and understand the notice period. Keep all discussions in writing and store receipts for rent and deposit. If you have any special agreement (pets, repairs, furniture removal), make sure it’s written.\n\nTake photos at move-in and move-out, and confirm inventory items. Report issues immediately and request written confirmation. Evidence protects your deposit and prevents unfair blame.\n\nDon’t ignore early warning signs. If the landlord or agent is slow to reply before you sign, they may be slow later too. Pay attention to professionalism.\n\nGood renting is about documentation and habits. When everything is recorded and clear, problems are easier to solve and you stay protected.",
    image: commonmistakes,
  },
  {
    id: 10,
    slug: "location-matters",
    category: "LOCATION",
    title: "Why Location Matters in Property",
    text: "A strong location can protect value, increase rental demand, and reduce long-term risk.",
    longText:
      "Location impacts everything: daily convenience, resale value, and rental demand. Strong transport links, good schools, and local jobs increase demand. When demand is steady, your property is more resilient during market changes.\n\nLook at walkability to essentials like supermarkets, parks, gyms, and healthcare. For families, schools and safety matter most. For investors, tenant demand is the key—students, professionals, and families all look for different features.\n\nFuture projects can raise value. Track local council plans, new stations, regeneration zones, and major employer expansions. These changes can increase popularity and lift long-term appreciation.\n\nAlso consider negatives: noisy roads, lack of parking, poor lighting, or limited amenities. These factors can reduce demand even if the property itself is good.\n\nIf you choose a strong location, you reduce risk and increase the chance of better long-term performance. Good properties in weak locations struggle; average properties in strong locations can perform well.",
    image: locationmatter,
  },
  {
    id: 11,
    slug: "rental-yield-vs-capital-growth",
    category: "INVESTING",
    title: "Rental Yield vs Capital Growth Explained",
    text: "Understand the difference between monthly income and long-term value increase.",
    longText:
      "Rental yield is the annual rent divided by the property price (roughly). Capital growth is how much the property value rises over time. Investors usually choose based on goals: income now or profit later.\n\nSome areas offer high yield but slower growth, often because prices are lower and rent is relatively strong. Other areas offer lower yield but better appreciation, often because prices are higher and demand is long-term.\n\nAlways calculate net yield after costs: insurance, repairs, void periods, management fees, and taxes. A high headline yield can be misleading if maintenance is constant or tenants change frequently.\n\nThink about risk and stability. High yield areas may come with higher tenant turnover or stronger maintenance needs. Growth areas may be more stable but require patience.\n\nBalancing both yield and growth is often the smartest route. If you understand the difference clearly, you can build a strategy that matches your timeline and avoids chasing numbers that look good only on paper.",
    image: capitalGrowth,
  },
  {
    id: 12,
    slug: "buying-vs-renting",
    category: "GUIDE",
    title: "Buying vs Renting: Making the Right Choice",
    text: "Compare buying and renting based on budget, stability, lifestyle, and future plans.",
    longText:
      "Buying can offer stability and long-term value growth, but comes with upfront costs and responsibility for maintenance. You pay legal fees, surveys, mortgage-related costs, and you must handle repairs and upgrades yourself.\n\nRenting offers flexibility and fewer repair responsibilities, which is ideal if you may move for work or study. But rent does not build ownership, and long-term renting may cost more without creating equity.\n\nA practical way to decide is to compare your total monthly costs and how long you plan to stay. If you plan to stay long-term and can afford the upfront costs, buying may make sense. If flexibility is your priority, renting is often smarter.\n\nAlso consider lifestyle. Some people prefer the freedom to renovate and own; others prefer not worrying about repairs. There is no universal “best”—only what fits your situation.\n\nThe right choice depends on your finances, stability, and goals—not only market trends. When you choose based on your real plan, you avoid regret and feel confident in your decision.",
    image: rightchoece,
  },
];

export default function GuideDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const article = useMemo(() => articles.find((a) => a.slug === slug), [slug]);

  // 👇 Force scroll to top when this page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <button
            className={styles.backBtn}
            type="button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <div className={styles.notFoundBox}>
            <h2 className={styles.notFoundTitle}>Article not found</h2>
            <p className={styles.notFoundText}>
              The article you’re looking for doesn’t exist (or the link is
              wrong).
            </p>
            <button
              className={styles.primaryBtn}
              type="button"
              onClick={() => navigate("/guides")}
            >
              Go to Guides
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <button
          className={styles.backBtn}
          type="button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className={styles.header}>
          <span className={styles.pill}>{article.category}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.lead}>{article.text}</p>
        </div>

        <div className={styles.heroWrap}>
          <img
            className={styles.heroImage}
            src={article.image}
            alt={article.title}
          />
        </div>

        {/* ✅ Full-width text content */}
        <div className={styles.contentFull}>
          {article.longText.split("\n\n").map((para, i) => (
            <p key={i} className={styles.paragraph}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
