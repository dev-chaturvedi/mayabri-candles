import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const NAV_LINKS = [
  { id: "nav-link-collections", label: "Collections", path: "/collections" },
  { id: "nav-link-product", label: "Product", path: "/product-detail" },
  { id: "nav-link-about", label: "Our Story", path: "/about" },
  { id: "nav-link-checkout", label: "Checkout", path: "/checkout" },
  { id: "nav-link-contact", label: "Customer Care", path: "/contact" },
  { id: "nav-link-gifts", label: "Gift Guide", path: "/gift-guide" },
];

const COLLECTION_ITEMS = [
  {
    id: "collections-morning-ritual",
    name: "Morning Ritual",
    family: "citrus",
    occasion: "home-refresh",
    price: 78,
    image: "/products/mayabri-real-1.jpeg",
    description: "Bright citrus and neroli notes to start the day with calm energy.",
  },
  {
    id: "collections-botanical-suite",
    name: "Botanical Suite",
    family: "floral",
    occasion: "gifting",
    price: 86,
    image: "/products/mayabri-real-2.jpeg",
    description: "Velvety peony, jasmine, and rose accords for elegant evenings.",
  },
  {
    id: "collections-earth-hush",
    name: "Earth Hush",
    family: "woody",
    occasion: "meditation",
    price: 92,
    image: "/products/mayabri-real-3.jpeg",
    description: "Warm cedar, amber, and moss designed for grounding rituals.",
  },
  {
    id: "collections-sugar-smoke",
    name: "Sugar & Smoke",
    family: "gourmand",
    occasion: "gifting",
    price: 96,
    image: "/products/mayabri-real-4.jpeg",
    description: "Toasted vanilla and smoked tonka for luxe celebratory moments.",
  },
  {
    id: "collections-spa-soft",
    name: "Spa Soft",
    family: "fresh",
    occasion: "meditation",
    price: 84,
    image: "/products/mayabri-real-5.jpeg",
    description: "Eucalyptus, mint, and white tea inspired by boutique wellness spaces.",
  },
  {
    id: "collections-evening-velvet",
    name: "Evening Velvet",
    family: "woody",
    occasion: "home-refresh",
    price: 104,
    image: "/products/mayabri-real-2.jpeg",
    description: "Sandalwood and black fig crafted for slow sunset conversations.",
  },
  {
    id: "collections-garden-party",
    name: "Garden Party",
    family: "floral",
    occasion: "gifting",
    price: 88,
    image: "/products/mayabri-real-1.jpeg",
    description: "A floral edit for celebrations, hosting, and memorable dinner tables.",
  },
  {
    id: "collections-zest-atelier",
    name: "Zest Atelier",
    family: "citrus",
    occasion: "home-refresh",
    price: 82,
    image: "/products/mayabri-real-3.jpeg",
    description: "Sparkling bergamot and grapefruit in a fresh studio-inspired collection.",
  },
];

const DETAIL_IMAGES = [
  "/products/mayabri-real-3.jpeg",
  "/products/mayabri-real-2.jpeg",
  "/products/mayabri-real-5.jpeg",
];

const DETAIL_REVIEWS = [
  {
    id: "review-riya",
    name: "Riya S.",
    rating: 5,
    text: "The throw is beautiful without overpowering. It feels effortlessly luxurious.",
  },
  {
    id: "review-amaan",
    name: "Amaan K.",
    rating: 5,
    text: "Packaging is stunning and the burn is clean. Perfect as a premium gift.",
  },
  {
    id: "review-neha",
    name: "Neha D.",
    rating: 4,
    text: "Subtle floral profile and gorgeous vessel. I reordered within a week.",
  },
  {
    id: "review-kabir",
    name: "Kabir P.",
    rating: 5,
    text: "The scent story is layered and memorable. Feels like boutique hotel ambience.",
  },
];

const RELATED_PRODUCTS = [
  {
    id: "related-amber-grove",
    name: "Amber Grove",
    category: "Woody Blend",
    price: "INR 1,690",
    image: "/products/mayabri-real-1.jpeg",
  },
  {
    id: "related-rose-linen",
    name: "Rose Linen",
    category: "Floral Signature",
    price: "INR 1,540",
    image: "/products/mayabri-real-4.jpeg",
  },
  {
    id: "related-citrus-nocturne",
    name: "Citrus Nocturne",
    category: "Citrus Muse",
    price: "INR 1,620",
    image: "/products/mayabri-real-5.jpeg",
  },
];

const STORY_BLOCKS = [
  {
    id: "story-origin",
    title: "A studio born from quiet rituals",
    text: "MayAbri began as a small table-top practice where wax, fragrance, and sculptural forms were tested nightly. What started as calm-making ritual evolved into an artisanal house for elevated home atmosphere.",
    emphasis: "Craft is our first language.",
    image: "/products/mayabri-real-2.jpeg",
  },
  {
    id: "story-materials",
    title: "Fragrance-led design, made by hand",
    text: "Each pour is refined in micro-batches, balancing scent diffusion, vessel architecture, and finish quality. The result is a candle that feels intentional in both burn and visual presence.",
    emphasis: "Luxury should feel personal.",
    image: "/products/mayabri-real-5.jpeg",
  },
  {
    id: "story-community",
    title: "Growing with community gifting moments",
    text: "From private homes to celebration tables and corporate gifting programs, our pieces are designed to translate emotion into fragrance. We focus on moments that people remember.",
    emphasis: "Every candle carries a story.",
    image: "/products/mayabri-real-1.jpeg",
  },
];

const BRAND_VALUES = [
  {
    id: "value-sustainability",
    icon: "leaf",
    title: "Sustainability",
    description: "Responsible sourcing, reusable vessels, and low-waste studio practices.",
  },
  {
    id: "value-craftsmanship",
    icon: "spark",
    title: "Craftsmanship",
    description: "Every pour, wick, and finish is checked by hand before dispatch.",
  },
  {
    id: "value-community",
    icon: "people",
    title: "Community",
    description: "We partner with local makers and support thoughtful gifting culture.",
  },
];

const JOURNEY = [
  {
    id: "journey-2019",
    year: "2019",
    title: "Founded",
    text: "First handcrafted fragrance trials began with a two-candle studio line.",
  },
  {
    id: "journey-2021",
    year: "2021",
    title: "Evolved",
    text: "Expanded to curated collection edits for weddings and boutique gifting.",
  },
  {
    id: "journey-2023",
    year: "2023",
    title: "Scaled",
    text: "Introduced premium jars and sculptural festival-ready forms.",
  },
  {
    id: "journey-2026",
    year: "2026",
    title: "Thriving",
    text: "Now delivering immersive fragrance experiences for homes and brands.",
  },
];

const TEAM = [
  {
    id: "team-aanya",
    name: "Aanya Verma",
    role: "Creative Director",
    image: "/products/mayabri-real-1.jpeg",
  },
  {
    id: "team-ishaan",
    name: "Ishaan Malik",
    role: "Fragrance Lead",
    image: "/products/mayabri-real-2.jpeg",
  },
  {
    id: "team-tara",
    name: "Tara Nair",
    role: "Craft Studio Manager",
    image: "/products/mayabri-real-3.jpeg",
  },
  {
    id: "team-vivaan",
    name: "Vivaan Rao",
    role: "Customer Experience",
    image: "/products/mayabri-real-4.jpeg",
  },
];

const CART_ITEMS = [
  {
    id: "cart-botanical-suite",
    name: "Botanical Suite Candle",
    price: 1540,
    image: "/products/mayabri-real-1.jpeg",
  },
  {
    id: "cart-earth-hush",
    name: "Earth Hush Duo",
    price: 2080,
    image: "/products/mayabri-real-3.jpeg",
  },
  {
    id: "cart-spa-soft",
    name: "Spa Soft Jar",
    price: 1390,
    image: "/products/mayabri-real-5.jpeg",
  },
];

const RECOMMENDED_CHECKOUT = [
  {
    id: "rec-amber",
    name: "Amber Glow Mini",
    price: "INR 790",
    image: "/products/mayabri-real-2.jpeg",
  },
  {
    id: "rec-fig",
    name: "Fig Garden Pair",
    price: "INR 990",
    image: "/products/mayabri-real-4.jpeg",
  },
  {
    id: "rec-bloom",
    name: "Bloom Luxe Trio",
    price: "INR 1,190",
    image: "/products/mayabri-real-1.jpeg",
  },
];

const FAQ_ITEMS = [
  {
    id: "faq-shipping",
    q: "How quickly will I hear back from customer care?",
    a: "Our team usually replies within 12 business hours. For urgent order edits, include your order number in the subject line.",
  },
  {
    id: "faq-burn",
    q: "Do you provide candle care guidance?",
    a: "Yes. Every order includes a care card covering first burn timing, wick trimming, and room-size recommendations.",
  },
  {
    id: "faq-gift",
    q: "Can I add gift notes and special packaging?",
    a: "Absolutely. Gift notes, premium wrapping, and custom messages can be added from the gift guide or checkout steps.",
  },
  {
    id: "faq-international",
    q: "Do you support international delivery?",
    a: "International shipping is available for select countries. Reach out through customer care to confirm destination timelines.",
  },
];

const GIFT_CATEGORIES = [
  { id: "gift-minimalist", name: "For the Minimalist", text: "Clean lines, soft notes, elegant matte vessels." },
  { id: "gift-adventurer", name: "For the Adventurer", text: "Bold woods, spice accents, and travel-inspired blends." },
  { id: "gift-host", name: "For the Host", text: "Statement fragrances designed for memorable tablescapes." },
  { id: "gift-wellness", name: "For the Wellness Lover", text: "Calming aromatherapy candles for mindful evening rituals." },
  { id: "gift-designer", name: "For the Design Enthusiast", text: "Sculptural silhouettes with luxury fragrance layering." },
  { id: "gift-celebration", name: "For Celebrations", text: "Festive sets with premium wrapping and handwritten notes." },
];

const GIFT_IMAGE_LIBRARY = {
  bloomBoxes: "/products/mayabri-gift-bloom-boxes.png",
  floralCollection: "/products/mayabri-gift-floral-collection.png",
  lineup: "/products/mayabri-gift-lineup.png",
};

const GIFT_SPOTLIGHT_CARDS = [
  {
    id: "gift-spotlight-bloom",
    title: "Blush Bloom Duo",
    subtitle: "Rose-forward duo wrapped for elegant celebration gifting.",
    image: GIFT_IMAGE_LIBRARY.bloomBoxes,
  },
  {
    id: "gift-spotlight-floral",
    title: "Artisan Floral Collection",
    subtitle: "Multi-candle curated set with premium keepsake presentation.",
    image: GIFT_IMAGE_LIBRARY.floralCollection,
  },
  {
    id: "gift-spotlight-lineup",
    title: "Signature Gift Lineup",
    subtitle: "Our most-loved floral gifting silhouettes in one visual edit.",
    image: GIFT_IMAGE_LIBRARY.lineup,
  },
];

const FEATURED_GIFT_SETS = [
  {
    id: "set-midnight-atelier",
    name: "Midnight Atelier",
    candles: "Includes: Velvet Fig, Amber Oak, Rose Linen",
    price: "INR 3,490",
    wrap: "Complimentary satin ribbon wrap",
    images: [GIFT_IMAGE_LIBRARY.floralCollection, "/products/mayabri-real-3.jpeg", "/products/mayabri-real-5.jpeg"],
  },
  {
    id: "set-garden-suite",
    name: "Garden Suite",
    candles: "Includes: Jasmine Silk, Citrus Dew, Neroli Whisper",
    price: "INR 3,290",
    wrap: "Botanical note card included",
    images: [GIFT_IMAGE_LIBRARY.bloomBoxes, "/products/mayabri-real-4.jpeg", "/products/mayabri-real-1.jpeg"],
  },
  {
    id: "set-heritage-glow",
    name: "Heritage Glow",
    candles: "Includes: Sandal Aura, Saffron Smoke, White Tea",
    price: "INR 3,690",
    wrap: "Premium keepsake box option",
    images: [GIFT_IMAGE_LIBRARY.lineup, "/products/mayabri-real-2.jpeg", "/products/mayabri-real-3.jpeg"],
  },
];

const GIFT_TESTIMONIALS = [
  {
    id: "gift-story-a",
    name: "Lavanya M.",
    text: "We sent these to wedding guests and everyone asked for the brand link.",
  },
  {
    id: "gift-story-b",
    name: "Rohit V.",
    text: "The personalization card made the gift feel deeply thoughtful and premium.",
  },
  {
    id: "gift-story-c",
    name: "Manya T.",
    text: "The curated set eliminated guesswork. Packaging looked editorial and luxe.",
  },
  {
    id: "gift-story-d",
    name: "Sarthak B.",
    text: "Fast support and high quality. Perfect for housewarming gifting.",
  },
];

function normalizePath(pathname) {
  if (!pathname || pathname === "/") {
    return "/collections";
  }
  const withoutQuery = pathname.split("?")[0].split("#")[0];
  if (!withoutQuery || withoutQuery === "/") {
    return "/collections";
  }
  return withoutQuery.endsWith("/") ? withoutQuery.slice(0, -1) : withoutQuery;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getStaggerClass(index) {
  const step = (index % 4) + 1;
  return `stagger-${step}`;
}

function renderValueIcon(type) {
  if (type === "leaf") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.2 3.8c-6-.8-10.6.4-13.6 3.5C3.2 10.7 2.7 15 3 20.5a.5.5 0 0 0 .6.5c5.2-.5 9.2-1.8 12-4.6 3.3-3.3 4.7-8.1 4.2-12.1Z" />
        <path d="M7.3 16.8c2.4-2.3 4.8-4.2 8.6-6.3" fill="none" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "spark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 2 2.1 5.6L20 10l-5.9 2.4L12 18l-2.1-5.6L4 10l5.9-2.4L12 2Z" />
        <path d="M4 18.5 5 21l2.5 1-2.5 1L4 25l-1-2.5-2.5-1L3 21l1-2.5Z" transform="translate(7 -2)" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm8 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6ZM3 20a5 5 0 0 1 10 0v1H3v-1Zm8 1v-1a5 5 0 0 1 10 0v1h-10Z" />
    </svg>
  );
}

function ParticleCanvas({ id, count = 132, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined;
    }
    if (process.env.NODE_ENV === "test") {
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return undefined;
    }

    let rafId = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: -9999, y: -9999 };
    const particles = [];

    const baseCount = window.innerWidth < 768 ? Math.max(80, Math.floor(count * 0.72)) : count;

    const setSize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      px: Math.random() * width,
      py: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 1.4 + 0.5,
    });

    setSize();

    for (let i = 0; i < baseCount; i += 1) {
      particles.push(createParticle());
    }

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const animate = () => {
      ctx.fillStyle = "rgba(249, 239, 224, 0.09)";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(177, 125, 82, 0.22)";
      ctx.fillStyle = "rgba(120, 53, 15, 0.65)";

      particles.forEach((particle) => {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 250) {
          const force = (250 - distance) / 250;
          particle.vx += (dx / (distance || 1)) * force * 0.04;
          particle.vy += (dy / (distance || 1)) * force * 0.04;
        }

        particle.vx *= 0.985;
        particle.vy *= 0.985;

        particle.px = particle.x;
        particle.py = particle.y;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }

        ctx.beginPath();
        ctx.moveTo(particle.px, particle.py);
        ctx.lineTo(particle.x, particle.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = window.requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", setSize);

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", setSize);
    };
  }, [count]);

  return <canvas id={id} ref={canvasRef} className={`particle-canvas ${className}`.trim()} aria-hidden="true" />;
}

function TiltCard({ id, className = "", children, maxTilt = 13, maxScale = 1.06 }) {
  const handleMove = (event) => {
    if (
      prefersReducedMotion() ||
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(hover: none)").matches)
    ) {
      return;
    }
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - y) * (maxTilt * 2);
    const scaleBoost = 1 + Math.min(0.08, Math.abs(x - 0.5) * 0.08 + Math.abs(y - 0.5) * 0.08);
    const safeScale = Math.min(maxScale, scaleBoost);

    element.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${safeScale.toFixed(3)})`;
  };

  const handleLeave = (event) => {
    event.currentTarget.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      id={id}
      className={`tilt-card ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onFocus={handleLeave}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

function SharedNavigation({ pathname, onNavigate, onSearch, onCart }) {
  return (
    <header className="site-nav">
      <div className="nav-inner">
        <button
          id="nav-home"
          type="button"
          className="brand-link"
          onClick={() => onNavigate("/collections")}
          aria-label="Go to MayAbri collections"
        >
          <img src="/mayabri-logo.jpeg" alt="MayAbri Candles" className="brand-logo" />
          <span className="brand-text">MayAbri Candles</span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          {NAV_LINKS.map((item) => (
            <button
              key={item.path}
              id={item.id}
              type="button"
              className={`nav-link ${normalizePath(pathname) === item.path ? "active" : ""}`.trim()}
              onClick={() => onNavigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button id="nav-search" type="button" className="icon-button" aria-label="Search collections" onClick={onSearch}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11 4a7 7 0 1 0 4.4 12.4l4.1 4.1 1.4-1.4-4.1-4.1A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
            </svg>
          </button>
          <button id="nav-cart" type="button" className="icon-button" aria-label="Open checkout" onClick={onCart}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 5h13l-1.3 7.2a2 2 0 0 1-2 1.6H9L8 17h11v2H7a2 2 0 0 1-2-2c0-.3 0-.6.2-.8L7 5Zm-4 0h2.7l.9 2.6L5.4 15H3v-2h1l.9-5H3V5Zm6.5 15a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function SharedFooter({ onNavigate }) {
  return (
    <footer className="site-footer reveal">
      <div className="footer-grid">
        <div className="footer-brand-col">
          <button id="footer-home" type="button" className="footer-brand" onClick={() => onNavigate("/collections")}>
            <img src="/mayabri-logo.jpeg" alt="MayAbri logo" />
            <span>MayAbri Candles</span>
          </button>
          <p>
            Artisanal luxury candles crafted for modern rituals, meaningful gifting, and warm homes.
          </p>
          <div className="social-links">
            <a id="footer-instagram" href="https://www.instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a id="footer-pinterest" href="https://www.pinterest.com" target="_blank" rel="noreferrer">
              Pinterest
            </a>
            <a id="footer-youtube" href="https://www.youtube.com" target="_blank" rel="noreferrer">
              YouTube
            </a>
          </div>
        </div>

        <div>
          <h4>The Studio</h4>
          <a id="footer-our-story" href="/about" onClick={(event) => { event.preventDefault(); onNavigate("/about"); }}>
            Our Story
          </a>
          <a id="footer-collections" href="/collections" onClick={(event) => { event.preventDefault(); onNavigate("/collections"); }}>
            Collections
          </a>
          <a id="footer-gift-guide" href="/gift-guide" onClick={(event) => { event.preventDefault(); onNavigate("/gift-guide"); }}>
            Gift Guide
          </a>
        </div>

        <div>
          <h4>Customer Care</h4>
          <a id="footer-contact" href="/contact" onClick={(event) => { event.preventDefault(); onNavigate("/contact"); }}>
            Contact Support
          </a>
          <a id="footer-shipping" href="/checkout" onClick={(event) => { event.preventDefault(); onNavigate("/checkout"); }}>
            Shipping
          </a>
          <a id="footer-faq" href="/contact#faq" onClick={(event) => { event.preventDefault(); onNavigate("/contact"); }}>
            FAQ
          </a>
        </div>

        <div>
          <h4>Sustainability</h4>
          <a id="footer-materials" href="/about" onClick={(event) => { event.preventDefault(); onNavigate("/about"); }}>
            Responsible Materials
          </a>
          <a id="footer-packaging" href="/gift-guide" onClick={(event) => { event.preventDefault(); onNavigate("/gift-guide"); }}>
            Reusable Packaging
          </a>
          <a id="footer-community" href="/about" onClick={(event) => { event.preventDefault(); onNavigate("/about"); }}>
            Community Impact
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MayAbri Candles. All rights reserved.</p>
        <div>
          <a id="footer-privacy" href="/privacy" onClick={(event) => event.preventDefault()}>
            Privacy
          </a>
          <a id="footer-terms" href="/terms" onClick={(event) => event.preventDefault()}>
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

function CollectionsPage() {
  const [search, setSearch] = useState("");
  const [familyFilter, setFamilyFilter] = useState(["floral", "woody", "citrus", "fresh", "gourmand"]);
  const [occasionFilter, setOccasionFilter] = useState(["meditation", "gifting", "home-refresh"]);
  const [maxPrice, setMaxPrice] = useState(120);

  const filteredCollections = useMemo(
    () =>
      COLLECTION_ITEMS.filter((item) => {
        const matchesSearch =
          !search.trim() ||
          item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          item.description.toLowerCase().includes(search.trim().toLowerCase());
        const matchesFamily = familyFilter.includes(item.family);
        const matchesOccasion = occasionFilter.includes(item.occasion);
        const matchesPrice = item.price <= maxPrice;
        return matchesSearch && matchesFamily && matchesOccasion && matchesPrice;
      }),
    [familyFilter, maxPrice, occasionFilter, search]
  );

  const toggleFamily = (name) => {
    setFamilyFilter((prev) =>
      prev.includes(name) ? prev.filter((entry) => entry !== name) : [...prev, name]
    );
  };

  const toggleOccasion = (name) => {
    setOccasionFilter((prev) =>
      prev.includes(name) ? prev.filter((entry) => entry !== name) : [...prev, name]
    );
  };

  return (
    <>
      <section className="hero hero-medium reveal">
        <div className="hero-layers">
          <div className="layer layer-one" data-speed="-0.35" />
          <div className="layer layer-two" data-speed="-0.18" />
          <div className="layer layer-three" data-speed="0.1" />
          <div className="bg-text" data-speed="0.12">
            COLLECTIONS
          </div>
          <ParticleCanvas id="particles-collections" count={138} />
        </div>

        <div className="hero-dual">
          <div className="hero-content">
            <p className="eyebrow">MayAbri Library</p>
            <h1>Collections</h1>
            <p>Discover the perfect scent for every moment</p>
            <div className="hero-filter-row reveal stagger-2">
              <input
                id="collection-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search collection mood or notes"
              />
              <select id="collection-sort" defaultValue="popular" aria-label="Sort collections">
                <option value="popular">Most Popular</option>
                <option value="new">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <button id="collection-search-cta" type="button" className="primary-btn">
                Explore
              </button>
            </div>
          </div>

          <div className="start-image-stack reveal stagger-1" id="starting-image-showcase">
            <figure className="hero-photo-card hero-photo-card-main" id="starting-photo-main">
              <img
                src={GIFT_IMAGE_LIBRARY.lineup}
                alt="MayAbri floral gift lineup with blue and blush presentation"
                loading="eager"
                decoding="async"
              />
            </figure>
            <figure className="hero-photo-card hero-photo-card-top" id="starting-photo-top">
              <img
                src={GIFT_IMAGE_LIBRARY.bloomBoxes}
                alt="MayAbri blush bloom and peony serenity gift boxes"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure className="hero-photo-card hero-photo-card-bottom" id="starting-photo-bottom">
              <img
                src={GIFT_IMAGE_LIBRARY.floralCollection}
                alt="MayAbri artisan floral collection gift set in keepsake box"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="page-section collections-layout">
        <aside className="filters-sidebar reveal stagger-1" id="collections-filters">
          <h2>Filters</h2>
          <div className="filter-block">
            <h3>Fragrance Family</h3>
            {["floral", "woody", "citrus", "fresh", "gourmand"].map((family) => (
              <label key={family} htmlFor={`filter-family-${family}`}>
                <input
                  id={`filter-family-${family}`}
                  type="checkbox"
                  checked={familyFilter.includes(family)}
                  onChange={() => toggleFamily(family)}
                />
                <span>{family}</span>
              </label>
            ))}
          </div>

          <div className="filter-block">
            <h3>Price Range</h3>
            <input
              id="filter-price-range"
              type="range"
              min="70"
              max="120"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
            <p>Up to INR {maxPrice * 20}</p>
          </div>

          <div className="filter-block">
            <h3>Occasions</h3>
            {["meditation", "gifting", "home-refresh"].map((occasion) => (
              <label key={occasion} htmlFor={`filter-occasion-${occasion}`}>
                <input
                  id={`filter-occasion-${occasion}`}
                  type="checkbox"
                  checked={occasionFilter.includes(occasion)}
                  onChange={() => toggleOccasion(occasion)}
                />
                <span>{occasion.replace("-", " ")}</span>
              </label>
            ))}
          </div>
        </aside>

        <div className="collection-grid">
          {filteredCollections.map((item, index) => (
            <TiltCard
              id={item.id}
              key={item.id}
              className={`collection-card reveal ${getStaggerClass(index)}`}
              maxTilt={12}
              maxScale={1.08}
            >
              <div className="card-media-wrapper">
                <img src={item.image} alt={item.name} />
                <div className="card-gradient" />
                <div className="card-flame" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2c.5 2.5-.2 4-1.7 5.5-1.2 1.1-2.3 2-2.3 4 0 2.7 2 4.7 4 4.7s4-2 4-4.7c0-1.5-.5-2.6-1.4-3.7-.8-1-1.4-2.4-.8-5.8-1.1.4-2.1 1.5-3 3Z" />
                    <path d="M11.7 11.4c-1.3 1.1-2.2 2.1-2.2 3.8 0 1.6 1.1 2.8 2.5 2.8s2.5-1.2 2.5-2.8c0-1.2-.6-2.1-1.5-3.3-.7-.9-1-1.7-.7-2.8a6 6 0 0 0-.6.4Z" />
                  </svg>
                </div>
                <button id={`${item.id}-cta`} type="button" className="hover-cta">
                  Add to Cart
                </button>
              </div>
              <div className="card-meta">
                <h3>{item.name}</h3>
                <p className="meta-tag">{item.family.toUpperCase()}</p>
                <p>{item.description}</p>
                <p className="meta-price">From INR {item.price * 20}</p>
              </div>
            </TiltCard>
          ))}

          {filteredCollections.length === 0 ? (
            <article className="empty-state reveal stagger-2">
              <h3>No collections match these filters.</h3>
              <p>Try widening your fragrance family or occasion selection.</p>
            </article>
          ) : null}
        </div>
      </section>

      <section className="page-section centered-cta reveal" id="collections-cta">
        <h2>Can&apos;t decide? Start with our Bestsellers</h2>
        <a id="collections-starter-link" href="/gift-guide" onClick={(event) => event.preventDefault()}>
          Explore curated starter set
        </a>
      </section>
    </>
  );
}

function ProductDetailPage() {
  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState("220g");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [notice, setNotice] = useState("");

  const currentImage = DETAIL_IMAGES[imageIndex];

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % DETAIL_IMAGES.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + DETAIL_IMAGES.length) % DETAIL_IMAGES.length);
  };

  return (
    <>
      <section className="hero product-hero reveal">
        <div className="hero-layers">
          <div className="layer layer-one" data-speed="-0.28" />
          <div className="layer layer-four" data-speed="0.08" />
          <div className="bg-text" data-speed="0.12">
            SIGNATURE SCENT
          </div>
          <ParticleCanvas id="particles-product" count={128} />
        </div>

        <div className="product-hero-grid">
          <TiltCard id="product-main-carousel" className="product-carousel reveal stagger-1" maxTilt={10} maxScale={1.04}>
            <img src={currentImage} alt="MayAbri signature candle" />
            <div className="floating-meta">
              <p>Top Notes</p>
              <h4>Neroli • Bergamot • White Tea</h4>
            </div>
            <div className="carousel-actions">
              <button id="product-prev-image" type="button" onClick={prevImage}>
                Prev
              </button>
              <button id="product-next-image" type="button" onClick={nextImage}>
                Next
              </button>
            </div>
          </TiltCard>

          <article className="product-headline reveal stagger-2">
            <p className="eyebrow">MayAbri Atelier Edition</p>
            <h1>Velvet Neroli Candle</h1>
            <div className="rating-row" id="product-rating">
              <span>★★★★★</span>
              <p>4.9 • 142 reviews</p>
            </div>
            <p>
              A refined floral-woody composition layered for calm mornings and amber-lit evenings.
            </p>
          </article>
        </div>
      </section>

      <section className="page-section product-layout">
        <article className="product-content reveal stagger-2">
          <div className="notes-grid" id="product-notes">
            <h2>Fragrance Pyramid</h2>
            <div className="note-cards">
              <div className="note-card reveal stagger-1">
                <h3>Top</h3>
                <p>Neroli, bergamot zest, green pear</p>
              </div>
              <div className="note-card reveal stagger-2">
                <h3>Middle</h3>
                <p>Orange blossom, jasmine petals, white tea</p>
              </div>
              <div className="note-card reveal stagger-3">
                <h3>Base</h3>
                <p>Soft cedar, tonka musk, warm amber</p>
              </div>
            </div>
          </div>

          <div className="info-cards-grid" id="product-burn-info">
            <div className="info-card reveal stagger-1">
              <h3>Burn Time</h3>
              <p>48-52 hours with proper wick care.</p>
            </div>
            <div className="info-card reveal stagger-2">
              <h3>Size</h3>
              <p>220g and 320g hand-poured options.</p>
            </div>
            <div className="info-card reveal stagger-3">
              <h3>Vessel</h3>
              <p>Reusable matte glass with artisan finish.</p>
            </div>
          </div>

          <section className="scent-story reveal" id="product-scent-story">
            <div className="story-bg" data-speed="0.1">
              SCENT STORY
            </div>
            <h2>Scent Story</h2>
            <p>
              Inspired by twilight courtyards and soft linen drapes, Velvet Neroli opens bright, settles floral,
              and closes with a grounded woody embrace designed for lingering elegance.
            </p>
          </section>

          <section className="reviews-strip reveal" id="product-social-proof">
            <h2>Customer Reviews</h2>
            <div className="horizontal-scroll">
              {DETAIL_REVIEWS.map((review, index) => (
                <TiltCard key={review.id} id={review.id} className={`review-card reveal ${getStaggerClass(index)}`} maxTilt={8} maxScale={1.03}>
                  <p className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</p>
                  <p>{review.text}</p>
                  <h3>{review.name}</h3>
                </TiltCard>
              ))}
            </div>
          </section>
        </article>

        <aside className="product-sidebar reveal stagger-1" id="product-info-sidebar">
          <div className="sticky-card">
            <p className="product-price">INR 1,640</p>
            <div className="option-group">
              <h3>Size / Weight</h3>
              <div className="chip-row">
                {["220g", "320g", "500g"].map((option) => (
                  <button
                    id={`product-size-${option}`}
                    key={option}
                    type="button"
                    className={size === option ? "chip active" : "chip"}
                    onClick={() => setSize(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <h3>Quantity</h3>
              <div className="qty-control">
                <button id="product-qty-decrease" type="button" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
                  -
                </button>
                <input id="product-qty-input" value={quantity} readOnly />
                <button id="product-qty-increase" type="button" onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
            </div>

            <button
              id="product-add-to-cart"
              type="button"
              className="primary-btn"
              onClick={() => setNotice(`${quantity} item(s) added to cart.`)}
            >
              Add to Cart
            </button>

            <button
              id="product-add-to-wishlist"
              type="button"
              className={wishlist ? "secondary-btn active" : "secondary-btn"}
              onClick={() => setWishlist((prev) => !prev)}
            >
              {wishlist ? "Saved to Wishlist" : "Add to Wishlist"}
            </button>

            <p className="availability">In stock • Dispatch in 24 hours</p>
            {notice ? <p className="status-note">{notice}</p> : null}
          </div>
        </aside>
      </section>

      <section className="page-section reveal" id="related-products">
        <div className="section-headline">
          <h2>Also loved by customers</h2>
        </div>
        <div className="three-grid">
          {RELATED_PRODUCTS.map((item, index) => (
            <TiltCard
              id={item.id}
              key={item.id}
              className={`product-mini-card reveal ${getStaggerClass(index)}`}
              maxTilt={11}
              maxScale={1.06}
            >
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <p className="meta-price">{item.price}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  const [newsletter, setNewsletter] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <>
      <section className="hero hero-full reveal">
        <div className="hero-layers">
          <div className="layer layer-one" data-speed="-0.4" />
          <div className="layer layer-two" data-speed="-0.22" />
          <div className="layer layer-three" data-speed="0.1" />
          <div className="layer layer-four" data-speed="0.14" />
          <div className="bg-text" data-speed="0.11">
            OUR STORY
          </div>
          <ParticleCanvas id="particles-about" count={142} />
        </div>
        <div className="hero-content">
          <p className="eyebrow">MayAbri Philosophy</p>
          <h1>Our Story</h1>
          <p>We believe fragrance can shape atmosphere, memory, and connection.</p>
        </div>
      </section>

      <section className="page-section narrative-stack" id="about-narrative">
        {STORY_BLOCKS.map((block, index) => (
          <article key={block.id} className={`narrative-row reveal ${getStaggerClass(index)} ${index % 2 ? "flip" : ""}`.trim()}>
            <div className="narrative-text">
              <h2>{block.title}</h2>
              <p>{block.text}</p>
              <p className="emphasis">{block.emphasis}</p>
            </div>
            <div className="narrative-image">
              <img src={block.image} alt={block.title} />
            </div>
          </article>
        ))}
      </section>

      <section className="page-section reveal" id="about-values">
        <div className="section-headline">
          <h2>Our Values</h2>
        </div>
        <div className="three-grid values-grid">
          {BRAND_VALUES.map((value, index) => (
            <article key={value.id} className={`value-card reveal ${getStaggerClass(index)}`} id={value.id}>
              <div className="value-icon">{renderValueIcon(value.icon)}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section reveal timeline-section" id="about-timeline">
        <div className="section-headline">
          <h2>Our Journey</h2>
        </div>
        <div className="timeline-bg-word" data-speed="0.08">
          FOUNDED
        </div>
        <div className="timeline-bg-word second" data-speed="0.12">
          EVOLVED
        </div>
        <div className="timeline-bg-word third" data-speed="0.15">
          THRIVING
        </div>
        <div className="timeline">
          {JOURNEY.map((item, index) => (
            <article key={item.id} className={`timeline-item reveal ${getStaggerClass(index)} ${index % 2 ? "right" : "left"}`.trim()}>
              <p className="timeline-year">{item.year}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section reveal" id="about-team">
        <div className="section-headline">
          <h2>Meet the Team</h2>
        </div>
        <div className="team-grid">
          {TEAM.map((member, index) => (
            <TiltCard key={member.id} id={member.id} className={`team-card reveal ${getStaggerClass(index)}`} maxTilt={8} maxScale={1.03}>
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="page-section dark-cta reveal" id="about-cta">
        <h2>Join the MayAbri Circle</h2>
        <p>Receive early access to limited scents, gifting edits, and atelier notes.</p>
        <form
          className="newsletter-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (!newsletter.trim()) {
              return;
            }
            setJoined(true);
            setNewsletter("");
          }}
        >
          <input
            id="about-newsletter-input"
            type="email"
            placeholder="Email address"
            value={newsletter}
            onChange={(event) => setNewsletter(event.target.value)}
            required
          />
          <button id="about-newsletter-submit" type="submit" className="primary-btn">
            Join
          </button>
          <button id="about-learn-more" type="button" className="secondary-btn">
            Learn More
          </button>
        </form>
        {joined ? <p className="status-note">You&apos;re in. Welcome to the circle.</p> : null}
      </section>
    </>
  );
}

function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [quantities, setQuantities] = useState(() =>
    CART_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const subtotal = CART_ITEMS.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] || 1),
    0
  );
  const shipping = subtotal > 3000 ? 0 : 180;
  const tax = Math.round(subtotal * 0.12);
  const total = subtotal + shipping + tax;

  const updateQuantity = (id, change) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  return (
    <>
      <section className="hero checkout-hero reveal">
        <div className="hero-layers">
          <div className="layer layer-one" data-speed="-0.12" />
          <div className="layer layer-three" data-speed="0.08" />
          <div className="bg-text" data-speed="0.06">
            CHECKOUT FLOW
          </div>
        </div>
        <div className="hero-content compact">
          <p className="eyebrow">Secure Checkout</p>
          <h1>Cart to Confirmation</h1>
          <p>A smooth four-step flow designed for clarity and confidence.</p>
        </div>
      </section>

      <section className="page-section reveal" id="checkout-flow">
        <div className="stepper">
          {[1, 2, 3, 4].map((item) => (
            <button
              id={`checkout-step-${item}`}
              key={item}
              type="button"
              className={item === step ? "step-pill active" : "step-pill"}
              onClick={() => setStep(item)}
            >
              {item === 1 ? "Cart" : item === 2 ? "Shipping" : item === 3 ? "Payment" : "Confirmation"}
            </button>
          ))}
        </div>

        <div className="checkout-panel-wrap">
          {step === 1 ? (
            <div className="checkout-step-panel" id="checkout-cart-step">
              <div className="checkout-grid">
                <div className="cart-list">
                  {CART_ITEMS.map((item, index) => (
                    <article key={item.id} className={`cart-item reveal ${getStaggerClass(index)}`}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <h3>{item.name}</h3>
                        <p>INR {item.price}</p>
                        <div className="qty-control inline">
                          <button id={`${item.id}-minus`} type="button" onClick={() => updateQuantity(item.id, -1)}>
                            -
                          </button>
                          <input id={`${item.id}-qty`} value={quantities[item.id]} readOnly />
                          <button id={`${item.id}-plus`} type="button" onClick={() => updateQuantity(item.id, 1)}>
                            +
                          </button>
                        </div>
                      </div>
                      <button id={`${item.id}-remove`} type="button" className="text-btn">
                        Remove
                      </button>
                    </article>
                  ))}
                </div>

                <aside className="order-summary">
                  <h3>Order Summary</h3>
                  <p>
                    <span>Subtotal</span>
                    <span>INR {subtotal}</span>
                  </p>
                  <p>
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `INR ${shipping}`}</span>
                  </p>
                  <p>
                    <span>Tax</span>
                    <span>INR {tax}</span>
                  </p>
                  <p className="total-row">
                    <span>Total</span>
                    <span>INR {total}</span>
                  </p>
                  <div className="btn-row">
                    <button id="checkout-continue-shopping" type="button" className="secondary-btn">
                      Continue Shopping
                    </button>
                    <button id="checkout-go-shipping" type="button" className="primary-btn" onClick={() => setStep(2)}>
                      Proceed
                    </button>
                  </div>
                </aside>
              </div>

              <section className="recommended-strip reveal">
                <h3>Recommended for You</h3>
                <div className="horizontal-scroll">
                  {RECOMMENDED_CHECKOUT.map((product, index) => (
                    <TiltCard
                      id={product.id}
                      key={product.id}
                      className={`mini-recommend-card reveal ${getStaggerClass(index)}`}
                      maxTilt={10}
                      maxScale={1.04}
                    >
                      <img src={product.image} alt={product.name} />
                      <h4>{product.name}</h4>
                      <p>{product.price}</p>
                    </TiltCard>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="checkout-step-panel" id="checkout-shipping-step">
              <h3>Shipping & Billing</h3>
              <form className="form-grid">
                <input id="shipping-first-name" placeholder="First name" />
                <input id="shipping-last-name" placeholder="Last name" />
                <input id="shipping-email" type="email" placeholder="Email" />
                <input id="shipping-phone" placeholder="Phone" />
                <input id="shipping-address" className="full" placeholder="Address line" />
                <input id="shipping-city" placeholder="City" />
                <input id="shipping-state" placeholder="State" />
                <input id="shipping-postal" placeholder="Postal code" />
              </form>
              <div className="shipping-methods">
                <label htmlFor="shipping-standard">
                  <input id="shipping-standard" type="radio" name="shipping-method" defaultChecked />
                  <span>Standard (3-5 days)</span>
                </label>
                <label htmlFor="shipping-express">
                  <input id="shipping-express" type="radio" name="shipping-method" />
                  <span>Express (1-2 days)</span>
                </label>
                <p className="delivery-note">Estimated delivery: May 3 - May 5, 2026</p>
              </div>
              <div className="btn-row">
                <button id="shipping-back-cart" type="button" className="secondary-btn" onClick={() => setStep(1)}>
                  Back
                </button>
                <button id="shipping-go-payment" type="button" className="primary-btn" onClick={() => setStep(3)}>
                  Continue to Payment
                </button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="checkout-step-panel" id="checkout-payment-step">
              <h3>Payment</h3>
              <form className="form-grid">
                <input id="payment-card-name" className="full" placeholder="Name on card" />
                <input id="payment-card-number" className="full" placeholder="Card number" />
                <input id="payment-expiry" placeholder="MM/YY" />
                <input id="payment-cvc" placeholder="CVC" />
                <label className="toggle-row" htmlFor="payment-billing-same">
                  <input id="payment-billing-same" type="checkbox" defaultChecked />
                  Billing address same as shipping
                </label>
              </form>
              <div className="trust-row">
                <div className="trust-badge">256-bit encrypted payment</div>
                <div className="trust-badge">PCI-compliant checkout</div>
                <div className="trust-badge">Trusted payment gateway</div>
              </div>
              <div className="btn-row">
                <button id="payment-back-shipping" type="button" className="secondary-btn" onClick={() => setStep(2)}>
                  Back
                </button>
                <button id="payment-place-order" type="button" className="primary-btn" onClick={() => setStep(4)}>
                  Place Order
                </button>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="checkout-step-panel confirmation" id="checkout-confirmation-step">
              <div className="checkmark-wrap" aria-hidden="true">
                <svg viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="25" fill="none" />
                  <path d="M14 27 22 35 38 18" fill="none" />
                </svg>
              </div>
              <h3>Order Confirmed</h3>
              <p className="order-id">Order #MAYA-2026-04127</p>
              <p>Thank you for choosing MayAbri. Your fragrance ritual is on its way.</p>
              <p className="delivery-note">Estimated ship date: April 29, 2026</p>
              <button id="confirmation-continue-shopping" type="button" className="primary-btn" onClick={() => setStep(1)}>
                Continue Shopping
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [openFaq, setOpenFaq] = useState(FAQ_ITEMS[0].id);

  return (
    <>
      <section className="hero hero-medium reveal">
        <div className="hero-layers">
          <div className="layer layer-two" data-speed="-0.25" />
          <div className="layer layer-three" data-speed="0.1" />
          <div className="bg-text" data-speed="0.12">
            GET IN TOUCH
          </div>
          <ParticleCanvas id="particles-contact" count={126} />
        </div>
        <div className="hero-content">
          <p className="eyebrow">Customer Care</p>
          <h1>Get In Touch</h1>
          <p>We&apos;re here to support orders, gifting requests, and fragrance guidance.</p>
        </div>
      </section>

      <section className="page-section reveal" id="contact-methods">
        <div className="three-grid">
          <article className="method-card reveal stagger-1" id="contact-email">
            <h3>Email</h3>
            <p>care@mayabri.com</p>
            <p>Best for detailed inquiries and order updates.</p>
          </article>
          <article className="method-card reveal stagger-2" id="contact-phone">
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
            <p>Mon-Sat, 10:00 AM to 7:00 PM IST.</p>
          </article>
          <article className="method-card reveal stagger-3" id="contact-studio">
            <h3>Studio Visit</h3>
            <p>Mathura, Uttar Pradesh</p>
            <p>By appointment for curation and gifting consults.</p>
          </article>
        </div>
      </section>

      <section className="page-section contact-layout">
        <article className="contact-form-card reveal stagger-2" id="contact-form-section">
          <h2>Send a Message</h2>
          <form className="contact-form">
            <input id="contact-name" placeholder="Full name" />
            <input id="contact-email-input" type="email" placeholder="Email address" />
            <input id="contact-subject" placeholder="Subject" />
            <textarea id="contact-message" placeholder="Tell us how we can help" rows="5" />
            <button id="contact-submit" type="button" className="primary-btn">
              Send Message
            </button>
          </form>
        </article>

        <article className="faq-card reveal stagger-3" id="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openFaq === item.id;
              return (
                <div className={isOpen ? "faq-item open" : "faq-item"} key={item.id}>
                  <button
                    id={`faq-toggle-${item.id}`}
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? "" : item.id)}
                  >
                    <span>{item.q}</span>
                    <span>{isOpen ? "-" : "+"}</span>
                  </button>
                  <div className="faq-content">
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="page-section reveal" id="trust-section">
        <div className="trust-info-grid">
          <article>
            <h3>Privacy First</h3>
            <p>Your details are used only to support your inquiry and order experience.</p>
          </article>
          <article>
            <h3>Response Time</h3>
            <p>Most requests are handled within 12 business hours.</p>
          </article>
          <article>
            <h3>Secure Communication</h3>
            <p>Order and payment discussions are handled through protected channels.</p>
          </article>
        </div>
      </section>

      <div className="chat-widget" id="live-chat-widget" role="complementary" aria-label="Live chat widget">
        <h4>Live Chat</h4>
        <p>Need a quick answer? Tap to start a conversation.</p>
        <button id="chat-open" type="button" className="primary-btn">
          Start Chat
        </button>
      </div>
    </>
  );
}

function GiftGuidePage() {
  const [message, setMessage] = useState("Wishing you warmth, light, and lovely moments.");
  const [occasionFilters, setOccasionFilters] = useState(["birthday", "wedding", "housewarming"]);
  const [activeSlides, setActiveSlides] = useState(() =>
    FEATURED_GIFT_SETS.reduce((acc, set) => ({ ...acc, [set.id]: 0 }), {})
  );

  const toggleOccasion = (occasion) => {
    setOccasionFilters((prev) =>
      prev.includes(occasion) ? prev.filter((entry) => entry !== occasion) : [...prev, occasion]
    );
  };

  const nextSetImage = (id) => {
    setActiveSlides((prev) => {
      const set = FEATURED_GIFT_SETS.find((entry) => entry.id === id);
      const current = prev[id] || 0;
      return { ...prev, [id]: (current + 1) % set.images.length };
    });
  };

  return (
    <>
      <section className="hero hero-medium reveal">
        <div className="hero-layers">
          <div className="layer layer-one" data-speed="-0.3" />
          <div className="layer layer-four" data-speed="0.12" />
          <div className="bg-text" data-speed="0.1">
            GIFT COLLECTIONS
          </div>
          <ParticleCanvas id="particles-gift" count={136} />
        </div>

        <div className="hero-dual">
          <div className="hero-content">
            <p className="eyebrow">Curated Sets</p>
            <h1>Gift Collections</h1>
            <p>Thoughtful candle edits for milestones, celebrations, and meaningful gestures.</p>
          </div>

          <div className="gift-hero-visual reveal stagger-1" id="gift-hero-showcase">
            <figure className="hero-photo-card hero-photo-card-main" id="gift-hero-main-photo">
              <img
                src={GIFT_IMAGE_LIBRARY.floralCollection}
                alt="MayAbri artisan floral gift collection"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure className="hero-photo-card hero-photo-card-top" id="gift-hero-accent-photo">
              <img
                src={GIFT_IMAGE_LIBRARY.bloomBoxes}
                alt="MayAbri floral gift boxes ready for gifting"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="page-section reveal" id="gift-photo-showcase">
        <div className="section-headline">
          <h2>Packaging Showcase</h2>
        </div>
        <div className="three-grid gift-photo-grid">
          {GIFT_SPOTLIGHT_CARDS.map((photo, index) => (
            <TiltCard
              key={photo.id}
              id={photo.id}
              className={`gift-showcase-card reveal ${getStaggerClass(index)}`}
              maxTilt={9}
              maxScale={1.04}
            >
              <img src={photo.image} alt={photo.title} loading="lazy" decoding="async" />
              <div className="gift-showcase-meta">
                <h3>{photo.title}</h3>
                <p>{photo.subtitle}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="page-section reveal" id="gift-categories">
        <div className="section-headline">
          <h2>Gift Categories</h2>
        </div>
        <div className="three-grid">
          {GIFT_CATEGORIES.map((category, index) => (
            <article key={category.id} className={`gift-category-card reveal ${getStaggerClass(index)}`} id={category.id}>
              <h3>{category.name}</h3>
              <p>{category.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section gift-layout" id="featured-gift-sets">
        <aside className="filters-sidebar reveal stagger-1">
          <h2>Occasion Filters</h2>
          {["birthday", "wedding", "housewarming", "anniversary", "festive"].map((occasion) => (
            <label key={occasion} htmlFor={`gift-occasion-${occasion}`}>
              <input
                id={`gift-occasion-${occasion}`}
                type="checkbox"
                checked={occasionFilters.includes(occasion)}
                onChange={() => toggleOccasion(occasion)}
              />
              <span>{occasion}</span>
            </label>
          ))}
        </aside>

        <div className="three-grid featured-set-grid">
          {FEATURED_GIFT_SETS.map((set, index) => (
            <TiltCard key={set.id} id={set.id} className={`featured-set-card reveal ${getStaggerClass(index)}`} maxTilt={11} maxScale={1.06}>
              <div className="set-image-frame">
                <img src={set.images[activeSlides[set.id] || 0]} alt={set.name} />
                <button id={`${set.id}-next-image`} type="button" className="set-next" onClick={() => nextSetImage(set.id)}>
                  Next
                </button>
              </div>
              <h3>{set.name}</h3>
              <p>{set.candles}</p>
              <p className="meta-price">{set.price}</p>
              <p>{set.wrap}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="page-section personalization reveal" id="gift-personalization">
        <h2>Add a personal message</h2>
        <div className="personalization-grid">
          <textarea
            id="gift-message-input"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows="4"
          />
          <div className="message-preview" id="gift-message-preview">
            <p>Gift Note Preview</p>
            <h3>{message || "Your message will appear here."}</h3>
          </div>
        </div>
      </section>

      <section className="page-section reveal" id="gift-testimonials">
        <div className="section-headline">
          <h2>Gift Stories</h2>
        </div>
        <div className="three-grid">
          {GIFT_TESTIMONIALS.map((item, index) => (
            <article key={item.id} className={`review-card reveal ${getStaggerClass(index)}`} id={item.id}>
              <p className="stars">★★★★★</p>
              <p>{item.text}</p>
              <h3>{item.name}</h3>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function NotFoundPage({ onNavigate }) {
  return (
    <section className="page-section reveal not-found">
      <h1>Page not found</h1>
      <p>That path is not part of the immersive flow yet.</p>
      <button id="not-found-home" type="button" className="primary-btn" onClick={() => onNavigate("/collections")}>
        Return to Collections
      </button>
    </section>
  );
}

function App() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => {
      setPathname(normalizePath(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    if (typeof window.IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    nodes.forEach((node) => {
      node.classList.remove("visible");
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const layers = Array.from(document.querySelectorAll("[data-speed]"));
    let rafId = 0;

    const update = () => {
      const y = window.scrollY;
      layers.forEach((layer) => {
        const speed = Number(layer.dataset.speed || 0);
        layer.style.transform = `translate3d(0, ${(y * speed).toFixed(2)}px, 0)`;
      });
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname]);

  const navigate = (path) => {
    const next = normalizePath(path);
    if (next === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.history.pushState({}, "", next);
    setPathname(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openSearchFromNav = () => {
    navigate("/collections");
    window.setTimeout(() => {
      const searchInput = document.getElementById("collection-search");
      if (searchInput) {
        searchInput.focus();
      }
    }, 80);
  };

  const currentPage = normalizePath(pathname);

  return (
    <div className="immersive-app">
      <SharedNavigation
        pathname={currentPage}
        onNavigate={navigate}
        onSearch={openSearchFromNav}
        onCart={() => navigate("/checkout")}
      />

      <main className="page-shell">
        {currentPage === "/collections" ? <CollectionsPage /> : null}
        {currentPage === "/product-detail" ? <ProductDetailPage /> : null}
        {currentPage === "/about" ? <AboutPage /> : null}
        {currentPage === "/checkout" ? <CheckoutPage /> : null}
        {currentPage === "/contact" ? <ContactPage /> : null}
        {currentPage === "/gift-guide" ? <GiftGuidePage /> : null}
        {![
          "/collections",
          "/product-detail",
          "/about",
          "/checkout",
          "/contact",
          "/gift-guide",
        ].includes(currentPage) ? (
          <NotFoundPage onNavigate={navigate} />
        ) : null}
      </main>

      <SharedFooter onNavigate={navigate} />
    </div>
  );
}

export default App;
