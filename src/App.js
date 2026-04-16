import { useDeferredValue, useEffect, useState, startTransition } from "react";
import "./App.css";
import { api } from "./api";

const TOKEN_KEY = "mayabri_token";
const TESTIMONIALS = [
  {
    quote:
      "The fragrance is subtle yet luxurious. Guests always ask where I got these candles.",
    name: "Abhay Chaturvedi",
    city: "Mathura",
  },
  {
    quote:
      "Beautiful design, clean burn, and premium packaging. It feels like a boutique experience.",
    name: "Nishant Sharma",
    city: "Noida",
  },
  {
    quote:
      "I gifted the festive collection and everyone loved it. Perfect for celebrations and decor.",
    name: "Mayank ",
    city: "Gorakhpur",
  },
];

const WHY_CHOOSE_US = [
  {
    icon: "🕯️",
    title: "Hand-poured Craft",
    text: "Small-batch candles made with careful artisan finishing.",
  },
  {
    icon: "🌿",
    title: "Clean Ingredients",
    text: "Thoughtfully selected wax and fragrance blends for smoother burn.",
  },
  {
    icon: "🎁",
    title: "Gift-ready Luxury",
    text: "Elegant packaging designed for premium gifting moments.",
  },
  {
    icon: "🚚",
    title: "Fast Dispatch",
    text: "Reliable delivery support to keep celebrations stress-free.",
  },
];

const CATEGORY_META = {
  Floral: "Rose, peony, and soft botanical profiles.",
  Aromatherapy: "Calming blends for unwind routines.",
  Luxury: "Richer notes inspired by premium homes.",
  Decor: "Statement candles for shelf and table styling.",
  Festive: "Celebration-ready candles and statement gifting edits.",
};

const DISCOUNT_CODES = {
  MAYA10: 10,
  GIFT15: 15,
  CORPORATE20: 20,
};

const INSTAGRAM_REEL_URL = "https://www.instagram.com/reel/DXH3b4pk_K0/";

const normalizePath = (path) => {
  if (!path || path === "/") {
    return "/";
  }
  const pathOnly = path.split("?")[0].split("#")[0];
  if (!pathOnly || pathOnly === "/") {
    return "/";
  }
  return pathOnly.endsWith("/") ? pathOnly.slice(0, -1) : pathOnly;
};

const CATEGORY_ROUTE_MAP = {
  Floral: "/collections/floral",
  Aromatherapy: "/collections/aromatherapy",
  Luxury: "/collections/luxury",
  Decor: "/collections/decor",
  Festive: "/collections/festive",
};

const COLLECTION_ROUTES = {
  candles: {
    title: "Candles",
    description: "Our full candle library with floral, decor, luxe, and festive picks.",
    categories: ["Floral", "Aromatherapy", "Luxury", "Decor", "Festive"],
  },
  floral: {
    title: "Floral Candles",
    description: "Soft florals and botanical notes designed for elegant everyday moments.",
    categories: ["Floral"],
  },
  luxury: {
    title: "Luxury Candles",
    description: "Richer scent profiles and premium vessels inspired by boutique homes.",
    categories: ["Luxury"],
  },
  decor: {
    title: "Decor Candles",
    description: "Sculptural and statement candles crafted for styling shelves and tables.",
    categories: ["Decor"],
  },
  festive: {
    title: "Festive Candles",
    description: "Celebration-ready candles for gifting, hosting, and seasonal edits.",
    categories: ["Festive"],
  },
  aromatherapy: {
    title: "Aromatherapy",
    description: "Calming aroma-led candles curated for unwind routines and wellness corners.",
    categories: ["Aromatherapy"],
  },
  "wellness-blends": {
    title: "Wellness Blends",
    description: "Comforting blends to support evening relaxation and mindful rituals.",
    categories: ["Aromatherapy"],
  },
  "pure-essentials": {
    title: "Pure Essentials",
    description: "Clean aroma-focused fragrances for spa-like home ambience.",
    categories: ["Aromatherapy"],
  },
  "luxury-gifting": {
    title: "Luxury Gifting",
    description: "Gift-ready candle sets and festive edits curated for premium occasions.",
    categories: ["Luxury", "Festive", "Decor"],
  },
};

const CANDLE_MENU_ITEMS = [
  { label: "All Candles", meta: "Shop every candle style", path: "/collections/candles" },
  { label: "Floral", meta: "Rose and jasmine notes", path: "/collections/floral" },
  { label: "Luxury", meta: "Premium evening blends", path: "/collections/luxury" },
  { label: "Decor", meta: "Sculptural home accents", path: "/collections/decor" },
  { label: "Festive", meta: "Celebration specials", path: "/collections/festive" },
];

const AROMATHERAPY_MENU_ITEMS = [
  { label: "All Aromatherapy", meta: "Calm and unwind range", path: "/collections/aromatherapy" },
  { label: "Wellness Blends", meta: "Mood-lifting profiles", path: "/collections/wellness-blends" },
  { label: "Pure Essentials", meta: "Spa-inspired aroma notes", path: "/collections/pure-essentials" },
];

const getInitialCart = () => {
  try {
    return JSON.parse(localStorage.getItem("mayabri_cart")) || [];
  } catch (_error) {
    return [];
  }
};

function App() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [cart, setCart] = useState(getInitialCart);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [mode, setMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [quickView, setQuickView] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("mayabri_theme") === "dark");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [parallaxY, setParallaxY] = useState(0);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminForm, setAdminForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [promoteEmail, setPromoteEmail] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscountCode, setAppliedDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));
  const [corporateForm, setCorporateForm] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });
  const [corporateLoading, setCorporateLoading] = useState(false);

  const loadProducts = async () => {
    setProductsLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    api
      .me(token)
      .then((data) => setUser(data.user))
      .catch(() => {
        setToken(null);
        localStorage.removeItem(TOKEN_KEY);
      });
  }, [token]);

  useEffect(() => {
    localStorage.setItem("mayabri_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      setNotice("Payment successful. Thank you for your order.");
      setCart([]);
    }
    if (params.get("payment") === "cancelled") {
      setNotice("Payment was cancelled. Your cart is still saved.");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mayabri_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const onMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };
    const onScroll = () => setParallaxY(window.scrollY * 0.06);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handlePopState = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll(".reveal"));

    if (typeof IntersectionObserver === "undefined") {
      revealNodes.forEach((node) => node.classList.add("visible"));
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
      { threshold: 0.15 }
    );

    revealNodes.forEach((node) => {
      if (!node.classList.contains("visible")) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [pathname, user?.isSuperUser]);

  const filteredProducts = products.filter((product) => {
    const query = deferredSearch.trim().toLowerCase();
    if (!query) {
      return true;
    }
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  const hasCollectionPrefix = pathname.startsWith("/collections/");
  const collectionSlug = hasCollectionPrefix
    ? pathname.replace("/collections/", "")
    : "";
  const activeCollection = hasCollectionPrefix
    ? COLLECTION_ROUTES[collectionSlug] || COLLECTION_ROUTES.candles
    : null;
  const isCollectionRoute = Boolean(activeCollection);
  const isGiftingRoute = pathname === "/pages/corporate-gifting";
  const isHomeRoute = !isCollectionRoute && !isGiftingRoute;

  const visibleProducts = activeCollection
    ? filteredProducts.filter((product) =>
        activeCollection.categories.includes(product.category)
      )
    : filteredProducts;

  const giftingPreviewProducts = filteredProducts.filter((product) =>
    ["Luxury", "Festive", "Decor"].includes(product.category)
  );
  const collectionHeroImage = visibleProducts[0]?.image || "/products/mayabri-real-1.jpeg";

  const categories = Object.entries(
    visibleProducts.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {})
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );
  const discountedSubtotal = Math.round(cartTotal * (1 - discountPercent / 100));
  const giftWrapFee = giftWrap ? 99 : 0;
  const payableTotal = discountedSubtotal + giftWrapFee;

  const upsertCart = (product) => {
    startTransition(() => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Number(item.quantity) + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      setNotice(`${product.name} added to cart.`);
    });
  };

  const updateQty = (id, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    if (!newsletterEmail) {
      setError("Please enter your email for updates.");
      return;
    }
    setError("");
    setNotice("You are subscribed. Exclusive drops and offers are on the way.");
    setNewsletterEmail("");
  };

  const handleApplyDiscount = () => {
    const normalized = discountCode.toUpperCase().trim();
    const percent = DISCOUNT_CODES[normalized];
    if (!percent) {
      setError("Invalid discount code.");
      return;
    }
    setError("");
    setAppliedDiscountCode(normalized);
    setDiscountPercent(percent);
    setNotice(`Discount code ${normalized} applied (${percent}% off).`);
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscountCode("");
    setDiscountPercent(0);
    setDiscountCode("");
    setNotice("Discount removed.");
  };

  const handleCorporateInquiry = async (event) => {
    event.preventDefault();
    setCorporateLoading(true);
    setError("");
    setNotice("");
    try {
      const payload = {
        ...corporateForm,
        quantity: Number(corporateForm.quantity) || 1,
      };
      await api.submitCorporateInquiry(payload);
      setNotice("Corporate gifting inquiry submitted. Our team will contact you shortly.");
      setCorporateForm({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        quantity: "",
        message: "",
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setCorporateLoading(false);
    }
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      const action = mode === "register" ? api.register : api.login;
      const payload =
        mode === "register"
          ? authForm
          : { email: authForm.email, password: authForm.password };
      const data = await action(payload);
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setUser(data.user);
      setNotice(mode === "register" ? "Account created successfully." : "Welcome back.");
      setAuthForm({ name: "", email: "", password: "" });
    } catch (authError) {
      setError(authError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!token) {
      setError("Please log in before checkout.");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await api.createCheckoutSession(
        token,
        cart.map((item) => ({ id: item.id, quantity: item.quantity })),
        {
          discountCode: appliedDiscountCode,
          giftWrap,
          giftMessage: giftMessage.trim(),
        }
      );
      window.location.assign(data.url);
    } catch (checkoutError) {
      setError(checkoutError.message);
      setLoading(false);
    }
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    if (!token) {
      setError("Please login as super user.");
      return;
    }

    setAdminLoading(true);
    setError("");
    setNotice("");
    try {
      await api.addProduct(token, {
        ...adminForm,
        price: Number(adminForm.price),
      });
      setNotice("Product added successfully.");
      setAdminForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
      await loadProducts();
    } catch (adminError) {
      setError(adminError.message);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!token) {
      setError("Please login as super user.");
      return;
    }

    setAdminLoading(true);
    setError("");
    setNotice("");
    try {
      await api.deleteProduct(token, id);
      setNotice("Product removed successfully.");
      await loadProducts();
    } catch (adminError) {
      setError(adminError.message);
    } finally {
      setAdminLoading(false);
    }
  };

  const handlePromoteUser = async (event) => {
    event.preventDefault();
    if (!token) {
      setError("Please login as super user.");
      return;
    }

    setAdminLoading(true);
    setError("");
    setNotice("");
    try {
      const data = await api.makeSuperUser(token, promoteEmail);
      setNotice(data.message);
      setPromoteEmail("");
    } catch (adminError) {
      setError(adminError.message);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    setNotice("Logged out successfully.");
  };

  const navigateTo = (nextPath) => {
    const normalizedPath = normalizePath(nextPath);
    if (normalizedPath === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.history.pushState({}, "", normalizedPath);
    setPathname(normalizedPath);
    setQuickView(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRouteClick = (event, nextPath) => {
    event.preventDefault();
    navigateTo(nextPath);
  };

  const isCollectionMenuActive = (menuItems) =>
    menuItems.some((item) => normalizePath(item.path) === pathname);

  return (
    <main className={`app-shell ${darkMode ? "theme-dark" : ""} ${isGiftingRoute ? "gifting-theme" : ""}`}>
      <div className="cursor-glow" style={{ left: cursor.x, top: cursor.y }} />

      <header className="topbar reveal">
        <a href="/" className="brand" onClick={(event) => handleRouteClick(event, "/")}>
          <img src="/mayabri-logo.jpeg" alt="MayAbri Candles logo" />
          <span>MayAbri Candles</span>
        </a>
        <nav className="main-nav">
          <a
            href="/"
            className={`nav-link ${isHomeRoute ? "active" : ""}`}
            onClick={(event) => handleRouteClick(event, "/")}
          >
            Home
          </a>
          <div className="menu-group">
            <a
              href="/collections/candles"
              className={`nav-link ${isCollectionMenuActive(CANDLE_MENU_ITEMS) ? "active" : ""}`}
              onClick={(event) => handleRouteClick(event, "/collections/candles")}
            >
              Candles
            </a>
            <div className="mega-menu" role="menu" aria-label="Candles collections">
              {CANDLE_MENU_ITEMS.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`mega-link ${pathname === normalizePath(item.path) ? "active" : ""}`}
                  onClick={(event) => handleRouteClick(event, item.path)}
                >
                  <span className="mega-label">{item.label}</span>
                  <span className="mega-meta">{item.meta}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="menu-group">
            <a
              href="/collections/aromatherapy"
              className={`nav-link ${isCollectionMenuActive(AROMATHERAPY_MENU_ITEMS) ? "active" : ""}`}
              onClick={(event) => handleRouteClick(event, "/collections/aromatherapy")}
            >
              Aromatherapy
            </a>
            <div className="mega-menu" role="menu" aria-label="Aromatherapy collections">
              {AROMATHERAPY_MENU_ITEMS.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`mega-link ${pathname === normalizePath(item.path) ? "active" : ""}`}
                  onClick={(event) => handleRouteClick(event, item.path)}
                >
                  <span className="mega-label">{item.label}</span>
                  <span className="mega-meta">{item.meta}</span>
                </a>
              ))}
            </div>
          </div>
          <a
            href="/pages/corporate-gifting"
            className={`nav-link ${isGiftingRoute ? "active" : ""}`}
            onClick={(event) => handleRouteClick(event, "/pages/corporate-gifting")}
          >
            Gifting
          </a>
          {user?.isSuperUser ? <a href="#admin" className="nav-link">Admin</a> : null}
          <a href="#shop" className="nav-link">
            Shop
          </a>
        </nav>
        <div className="topbar-actions">
          <button className="ghost" onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? "Light" : "Dark"}
          </button>
          <a href="#shop" className="cart-bubble">
            Cart {cart.length}
          </a>
        </div>
      </header>

      {isHomeRoute ? (
        <section className="hero reveal" id="hero">
          <div className="hero-text">
            <p className="eyebrow">Luxury Candle Studio</p>
            <h1>Handcrafted candles for modern gifting and cozy homes</h1>
            <p className="hero-copy">
              Warm, premium fragrances curated for calm evenings, festive moments, and elegant interiors.
            </p>
            <div className="hero-meta">
              <span>Hand-poured in India</span>
              <span>Gift-ready packaging</span>
              <span>Clean-burning wax</span>
            </div>
            <div className="hero-cta">
              <a
                href="/collections/candles"
                onClick={(event) => handleRouteClick(event, "/collections/candles")}
              >
                Explore Collection
              </a>
              <a
                href="/pages/corporate-gifting"
                onClick={(event) => handleRouteClick(event, "/pages/corporate-gifting")}
              >
                Open Gifting
              </a>
            </div>
            <div className="social-row">
              <a href="https://www.instagram.com/mayabri_candles" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="https://www.youtube.com/@MayAbriCandles/shorts" target="_blank" rel="noreferrer">
                YouTube Shorts
              </a>
            </div>
          </div>
          <div className="hero-candles" style={{ transform: `translateY(${parallaxY}px)` }}>
            <div className="candle candle-lg">
              <span className="flame" />
            </div>
            <div className="candle candle-md">
              <span className="flame" />
            </div>
            <div className="candle candle-sm">
              <span className="flame" />
            </div>
          </div>
        </section>
      ) : null}

      {isCollectionRoute ? (
        <section className="section reveal collection-hero">
          <div className="editorial-banner">
            <article className="editorial-copy">
              <p className="collection-crumb">Home / Collections / {activeCollection.title}</p>
              <p className="eyebrow">Shop By Collection</p>
              <h1>{activeCollection.title}</h1>
              <p className="hero-copy">{activeCollection.description}</p>
            </article>
            <div className="editorial-media">
              <img src={collectionHeroImage} alt={`${activeCollection.title} collection banner`} />
            </div>
          </div>
        </section>
      ) : null}

      {isGiftingRoute ? (
        <section className="section reveal gifting-hero">
          <div className="editorial-banner">
            <article className="editorial-copy">
              <p className="eyebrow">Luxury Gifting</p>
              <h1>Beautifully timeless candle gifting.</h1>
              <p className="hero-copy">
                Curated gifting hampers, premium candles, and elegant packaging in a dedicated route, just like the
                gifting flow you showed.
              </p>
              <div className="hero-cta">
                <a
                  href="/collections/luxury-gifting"
                  onClick={(event) => handleRouteClick(event, "/collections/luxury-gifting")}
                >
                  Shop Gift Collection
                </a>
                <a href="#shop">Checkout & Cart</a>
              </div>
            </article>
            <div className="editorial-media">
              <img src="/products/mayabri-real-3.jpeg" alt="Luxury gifting candle setup" />
            </div>
          </div>
        </section>
      ) : null}

      {!isGiftingRoute ? (
        <section className="section reveal" id="featured">
          <div className="section-head">
            <div>
              <h2>{isCollectionRoute ? activeCollection.title : "Featured Candles"}</h2>
              {isCollectionRoute ? <p>{visibleProducts.length} products in this route</p> : null}
            </div>
            <input
              type="search"
              placeholder="Search by name or category"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="product-grid">
            {productsLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="skeleton-card">
                  <div className="skeleton shimmer" />
                  <div className="skeleton-line shimmer" />
                  <div className="skeleton-line shimmer short" />
                </div>
              ))
            ) : visibleProducts.length > 0 ? (
              visibleProducts.map((product, index) => (
                <div key={product.id} className="product-card" style={{ "--item-index": index }}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <div>
                    <p className="badge">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p className="description">{product.description}</p>
                    <p className="price">INR {product.price}</p>
                    <div className="card-actions">
                      <button className="ghost" onClick={() => setQuickView(product)}>
                        Quick View
                      </button>
                      <button onClick={() => upsertCart(product)}>Add to Cart</button>
                      {user?.isSuperUser ? (
                        <button
                          className="danger"
                          onClick={() => handleDeleteProduct(product.id)}
                          disabled={adminLoading}
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-result">No products match this collection yet.</p>
            )}
          </div>
        </section>
      ) : null}

      {isHomeRoute ? (
        <>
          <section className="section reveal" id="categories">
            <div className="section-head">
              <h2>Shop by Category</h2>
              <p>{visibleProducts.length} products available</p>
            </div>
            <div className="category-grid">
              {categories.map(([name, count]) => {
                const categoryPath = CATEGORY_ROUTE_MAP[name] || "/collections/candles";
                return (
                  <a
                    key={name}
                    href={categoryPath}
                    className="category-card category-link"
                    onClick={(event) => handleRouteClick(event, categoryPath)}
                  >
                    <h3>{name}</h3>
                    <p>{CATEGORY_META[name] || "Elegant candles crafted for every moment."}</p>
                    <span>{count} items</span>
                  </a>
                );
              })}
            </div>
          </section>

          <section className="section reveal">
            <div className="section-head">
              <h2>Why Choose MayAbri</h2>
            </div>
            <div className="why-grid">
              {WHY_CHOOSE_US.map((item) => (
                <article key={item.title} className="why-card">
                  <div className="icon-wrap">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section reveal" id="testimonials">
            <div className="section-head">
              <h2>What Customers Say</h2>
            </div>
            <div className="carousel">
              <div className="carousel-track" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                {TESTIMONIALS.map((item) => (
                  <article key={item.name} className="testimonial-card">
                    <p className="quote">&ldquo;{item.quote}&rdquo;</p>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.city}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="dots">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    className={index === activeTestimonial ? "dot active" : "dot"}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="section reveal" id="brand-story">
            <div className="section-head">
              <h2>Brand Story</h2>
            </div>
            <article className="story-card">
              <p>
                MayAbri Candles was born from a simple idea: everyday spaces deserve warmth,
                elegance, and mindful fragrance. Every candle is crafted to create cozy moments,
                thoughtful gifts, and beautiful celebrations.
              </p>
              <p>
                From floral sculpted pieces to premium jars, our collections focus on quality,
                aesthetics, and intentional gifting experiences for homes and businesses.
              </p>
            </article>
          </section>

          <section className="section reveal gifting-entry">
            <div className="section-head">
              <h2>Looking for gifting instead of regular shopping?</h2>
            </div>
            <p className="hero-copy">
              Open a dedicated gifting route to submit corporate inquiries and browse premium gift-ready edits.
            </p>
            <div className="hero-cta">
              <a
                href="/pages/corporate-gifting"
                onClick={(event) => handleRouteClick(event, "/pages/corporate-gifting")}
              >
                Open Gifting Page
              </a>
              <a
                href="/collections/luxury-gifting"
                onClick={(event) => handleRouteClick(event, "/collections/luxury-gifting")}
              >
                View Gift Collection
              </a>
            </div>
          </section>
        </>
      ) : null}

      {isGiftingRoute ? (
        <>
          <section className="section reveal gifting-showcase">
            <div className="showcase-grid">
              <article className="showcase-copy">
                <p className="eyebrow">Sheesh Mahal Collection</p>
                <h2>Luxury sets designed for memorable gifting.</h2>
                <p>
                  Mirror-inspired details, festive-ready presentation, and fragrance-led curation that feels premium
                  at first glance.
                </p>
              </article>
              <div className="showcase-media">
                <img src="/products/mayabri-real-2.jpeg" alt="Premium gifting candle collection" />
              </div>
            </div>
          </section>

          <section className="section reveal gifting-showcase alt">
            <div className="showcase-grid">
              <div className="showcase-media">
                <img src="/products/mayabri-real-5.jpeg" alt="Signature candle styling" />
              </div>
              <article className="showcase-copy">
                <p className="eyebrow">Signature Mood</p>
                <h2>Big visuals that highlight the product story first.</h2>
                <p>
                  We shifted this page to an editorial style so visitors feel the same premium experience you shared.
                </p>
              </article>
            </div>
          </section>

          <section className="section reveal reel-section">
            <div className="section-head">
              <div>
                <h2>Instagram Reel</h2>
                <p>Attached from your shared link.</p>
              </div>
            </div>
            <div className="reel-frame-wrap">
              <iframe
                src={`${INSTAGRAM_REEL_URL}embed`}
                title="MayAbri Instagram Reel"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="reel-link">
              If embed is blocked, open:
              <a href={INSTAGRAM_REEL_URL} target="_blank" rel="noreferrer">
                {INSTAGRAM_REEL_URL}
              </a>
            </p>
          </section>

        <section className="section reveal gifting-section" id="gifting">
          <div className="section-head">
            <h2>Gifting & Corporate Gifting</h2>
            <p>Use gift wrap at checkout or submit a corporate bulk request.</p>
          </div>
          <div className="gifting-grid">
            <article className="gift-card">
              <h3>Popular Discount Codes</h3>
              <p>`MAYA10` • `GIFT15` • `CORPORATE20`</p>
              {!productsLoading && giftingPreviewProducts.length > 0 ? (
                <div className="gift-chip-row">
                  {giftingPreviewProducts.slice(0, 4).map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      className="gift-chip"
                      onClick={() => upsertCart(product)}
                    >
                      {product.name} • INR {product.price}
                    </button>
                  ))}
                </div>
              ) : null}
            </article>
            <article className="gift-card">
              <h3>Corporate Orders</h3>
              <form className="auth-form" onSubmit={handleCorporateInquiry}>
                <input
                  type="text"
                  placeholder="Company name"
                  value={corporateForm.companyName}
                  onChange={(event) =>
                    setCorporateForm((prev) => ({ ...prev, companyName: event.target.value }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Contact person"
                  value={corporateForm.contactName}
                  onChange={(event) =>
                    setCorporateForm((prev) => ({ ...prev, contactName: event.target.value }))
                  }
                  required
                />
                <input
                  type="email"
                  placeholder="Contact email"
                  value={corporateForm.email}
                  onChange={(event) =>
                    setCorporateForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={corporateForm.phone}
                  onChange={(event) =>
                    setCorporateForm((prev) => ({ ...prev, phone: event.target.value }))
                  }
                />
                <input
                  type="number"
                  placeholder="Approx quantity"
                  min={1}
                  value={corporateForm.quantity}
                  onChange={(event) =>
                    setCorporateForm((prev) => ({ ...prev, quantity: event.target.value }))
                  }
                />
                <input
                  type="text"
                  placeholder="Message (custom branding, delivery date, etc.)"
                  value={corporateForm.message}
                  onChange={(event) =>
                    setCorporateForm((prev) => ({ ...prev, message: event.target.value }))
                  }
                />
                <button type="submit" disabled={corporateLoading}>
                  {corporateLoading ? "Submitting..." : "Submit Corporate Inquiry"}
                </button>
              </form>
            </article>
          </div>
        </section>
        </>
      ) : null}

      {user?.isSuperUser ? (
        <section className="section reveal admin-section" id="admin">
          <div className="section-head">
            <h2>Super User Panel</h2>
            <p>Add/remove products and promote users.</p>
          </div>

          <div className="admin-grid">
            <article className="admin-card">
              <h3>Add Product</h3>
              <form className="auth-form" onSubmit={handleAddProduct}>
                <input
                  type="text"
                  placeholder="Product name"
                  value={adminForm.name}
                  onChange={(event) =>
                    setAdminForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={adminForm.description}
                  onChange={(event) =>
                    setAdminForm((prev) => ({ ...prev, description: event.target.value }))
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Price (INR)"
                  min={1}
                  value={adminForm.price}
                  onChange={(event) =>
                    setAdminForm((prev) => ({ ...prev, price: event.target.value }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Category (Floral/Luxury...)"
                  value={adminForm.category}
                  onChange={(event) =>
                    setAdminForm((prev) => ({ ...prev, category: event.target.value }))
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Image path (ex: /products/candle-rose.svg)"
                  value={adminForm.image}
                  onChange={(event) =>
                    setAdminForm((prev) => ({ ...prev, image: event.target.value }))
                  }
                  required
                />
                <button type="submit" disabled={adminLoading}>
                  {adminLoading ? "Saving..." : "Add Product"}
                </button>
              </form>
            </article>

            <article className="admin-card">
              <h3>Make Super User</h3>
              <form className="auth-form" onSubmit={handlePromoteUser}>
                <input
                  type="email"
                  placeholder="User email"
                  value={promoteEmail}
                  onChange={(event) => setPromoteEmail(event.target.value)}
                  required
                />
                <button type="submit" disabled={adminLoading}>
                  {adminLoading ? "Updating..." : "Promote User"}
                </button>
              </form>
            </article>
          </div>
        </section>
      ) : null}

      <section className="section reveal layout-grid" id="shop">
        <article className="catalog-card">
          <h2>Secure Account Access</h2>
          <p className="subtext">Log in to checkout with Stripe and track your profile.</p>
          <section className="auth-card">
            <div className="auth-head">
              <h3>
                {user
                  ? `Hi, ${user.name}${user.isSuperUser ? " (Super User)" : ""}`
                  : "Customer Login"}
              </h3>
              {user ? <button onClick={handleLogout}>Log out</button> : null}
            </div>
            {!user ? (
              <form onSubmit={handleAuthSubmit} className="auth-form">
                {mode === "register" ? (
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={authForm.name}
                    onChange={(event) =>
                      setAuthForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    required
                  />
                ) : null}
                <input
                  type="email"
                  placeholder="Email"
                  value={authForm.email}
                  onChange={(event) =>
                    setAuthForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={authForm.password}
                  onChange={(event) =>
                    setAuthForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Please wait..." : mode === "register" ? "Create account" : "Login"}
                </button>
                <p className="switch">
                  {mode === "register"
                    ? "Already have an account?"
                    : "New to MayAbri Candles?"}
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => setMode((prev) => (prev === "register" ? "login" : "register"))}
                  >
                    {mode === "register" ? "Login here" : "Create account"}
                  </button>
                </p>
              </form>
            ) : (
              <p className="logged-in-copy">{user.email}</p>
            )}
          </section>
        </article>

        <aside className="cart-card">
          <h2>
            Cart
            <span className="cart-count">{cart.length}</span>
          </h2>
          {!user ? (
            <p className="auth-required-note">
              Please sign up or log in to place an order.
            </p>
          ) : null}
          {cart.length === 0 ? (
            <p className="empty-text">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <h4>{item.name}</h4>
                    <p>INR {item.price}</p>
                  </div>
                  <div className="cart-actions">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) =>
                        updateQty(item.id, Number(event.target.value || 1))
                      }
                    />
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div className="discount-box">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(event) => setDiscountCode(event.target.value)}
                />
                <button onClick={handleApplyDiscount} type="button">
                  Apply
                </button>
                {appliedDiscountCode ? (
                  <button className="ghost" type="button" onClick={handleRemoveDiscount}>
                    Remove
                  </button>
                ) : null}
              </div>
              <label className="gift-wrap">
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(event) => setGiftWrap(event.target.checked)}
                />
                Add gift wrap (INR 99)
              </label>
              {giftWrap ? (
                <input
                  type="text"
                  placeholder="Gift message (optional)"
                  value={giftMessage}
                  onChange={(event) => setGiftMessage(event.target.value)}
                />
              ) : null}
              <div className="cart-footer">
                <p>Subtotal</p>
                <p>INR {cartTotal}</p>
              </div>
              {discountPercent > 0 ? (
                <div className="cart-footer">
                  <p>Discount ({appliedDiscountCode})</p>
                  <p>- {discountPercent}%</p>
                </div>
              ) : null}
              {giftWrap ? (
                <div className="cart-footer">
                  <p>Gift Wrap</p>
                  <p>INR 99</p>
                </div>
              ) : null}
              <div className="cart-footer payable">
                <p>Payable Total</p>
                <p>INR {payableTotal}</p>
              </div>
              <button
                className="checkout"
                onClick={handleCheckout}
                disabled={loading || !user}
              >
                {loading
                  ? "Processing..."
                  : user
                    ? "Checkout with Stripe"
                    : "Login to Place Order"}
              </button>
            </>
          )}
        </aside>
      </section>

      <section className="section reveal newsletter" id="newsletter">
        <div>
          <h2>Get Launch Drops, Offers, and Festive Edits</h2>
          <p>Join our newsletter for early access to seasonal collections.</p>
        </div>
        <form onSubmit={handleNewsletterSubmit}>
          <input
            type="email"
            value={newsletterEmail}
            onChange={(event) => setNewsletterEmail(event.target.value)}
            placeholder="Enter your email"
          />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      <footer className="footer reveal">
        <a href="/" className="brand" onClick={(event) => handleRouteClick(event, "/")}>
          <img src="/mayabri-logo.jpeg" alt="MayAbri Candles logo" />
          <span>MayAbri Candles</span>
        </a>
        <div className="footer-links">
          <a href="/collections/candles" onClick={(event) => handleRouteClick(event, "/collections/candles")}>
            Collection
          </a>
          <a href="/pages/corporate-gifting" onClick={(event) => handleRouteClick(event, "/pages/corporate-gifting")}>
            Gifting
          </a>
          <a href="https://www.instagram.com/mayabri_candles" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </footer>

      {error ? <p className="status error">{error}</p> : null}
      {notice ? <p className="status notice">{notice}</p> : null}

      {quickView ? (
        <div className="quickview-backdrop" onClick={() => setQuickView(null)}>
          <article className="quickview" onClick={(event) => event.stopPropagation()}>
            <img src={quickView.image} alt={quickView.name} />
            <div>
              <p className="badge">{quickView.category}</p>
              <h3>{quickView.name}</h3>
              <p className="description">{quickView.description}</p>
              <p className="price">INR {quickView.price}</p>
              <button onClick={() => upsertCart(quickView)}>Add to Cart</button>
            </div>
          </article>
        </div>
      ) : null}
    </main>
  );
}

export default App;
