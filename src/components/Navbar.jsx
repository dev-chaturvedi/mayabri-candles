import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";

function Navbar({
  pathname,
  isHomeRoute,
  isGiftingRoute,
  candleMenuItems,
  aromatherapyMenuItems,
  isCollectionMenuActive,
  userIsSuperUser,
  cartCount,
  darkMode,
  onToggleTheme,
  onNavigate,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCandlesOpen, setMobileCandlesOpen] = useState(false);
  const [mobileAromatherapyOpen, setMobileAromatherapyOpen] = useState(false);

  const handleNavigate = (event, nextPath) => {
    event.preventDefault();
    onNavigate(nextPath);
    setMobileMenuOpen(false);
    setMobileCandlesOpen(false);
    setMobileAromatherapyOpen(false);
  };

  const handleAnchorClick = () => {
    setMobileMenuOpen(false);
    setMobileCandlesOpen(false);
    setMobileAromatherapyOpen(false);
  };

  const navLinkBase =
    "inline-flex min-h-[44px] items-center rounded-full px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-white/80";
  const navLinkActive = "bg-white text-amber-800";

  const entranceMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: -18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <m.header
      className="sticky top-3 z-20 mx-auto w-full !max-w-screen-xl px-4 sm:px-6 md:px-10"
      {...entranceMotion}
    >
      <div className="rounded-2xl border border-amber-900/20 bg-white/70 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-base font-bold text-amber-950"
            onClick={(event) => handleNavigate(event, "/")}
          >
            <img
              src="/mayabri-logo.jpeg"
              alt="MayAbri Candles logo"
              className="h-10 w-10 rounded-full border border-amber-900/20 object-cover"
            />
            <span className="text-sm sm:text-base">MayAbri Candles</span>
          </a>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              className="min-h-[44px] rounded-xl border border-amber-900/20 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:bg-white"
              onClick={onToggleTheme}
            >
              {darkMode ? "Light" : "Dark"}
            </button>
            <a
              href="#shop"
              className="inline-flex min-h-[44px] items-center rounded-xl bg-amber-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-800"
              onClick={handleAnchorClick}
            >
              Cart {cartCount}
            </a>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-nav"
            aria-expanded={mobileMenuOpen}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-amber-900/20 bg-white/80 px-3 text-sm font-semibold text-amber-900 md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <nav className="hidden border-t border-amber-900/10 px-4 py-3 md:block">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/"
              className={`${navLinkBase} ${isHomeRoute ? navLinkActive : ""}`}
              onClick={(event) => handleNavigate(event, "/")}
            >
              Home
            </a>

            <div className="group relative">
              <a
                href="/collections/candles"
                className={`${navLinkBase} ${isCollectionMenuActive(candleMenuItems) ? navLinkActive : ""}`}
                onClick={(event) => handleNavigate(event, "/collections/candles")}
              >
                Candles
              </a>
              <div className="pointer-events-none absolute left-0 top-full z-30 mt-2 min-w-[250px] rounded-xl border border-amber-900/20 bg-white p-2 opacity-0 shadow-lg transition group-hover:pointer-events-auto group-hover:opacity-100">
                {candleMenuItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className={`mb-1 block rounded-lg px-3 py-2 text-sm transition last:mb-0 ${
                      pathname === item.path ? "bg-amber-100 text-amber-900" : "text-amber-800 hover:bg-amber-50"
                    }`}
                    onClick={(event) => handleNavigate(event, item.path)}
                  >
                    <span className="block font-semibold">{item.label}</span>
                    <span className="block text-xs text-amber-700">{item.meta}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="group relative">
              <a
                href="/collections/aromatherapy"
                className={`${navLinkBase} ${isCollectionMenuActive(aromatherapyMenuItems) ? navLinkActive : ""}`}
                onClick={(event) => handleNavigate(event, "/collections/aromatherapy")}
              >
                Aromatherapy
              </a>
              <div className="pointer-events-none absolute left-0 top-full z-30 mt-2 min-w-[250px] rounded-xl border border-amber-900/20 bg-white p-2 opacity-0 shadow-lg transition group-hover:pointer-events-auto group-hover:opacity-100">
                {aromatherapyMenuItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className={`mb-1 block rounded-lg px-3 py-2 text-sm transition last:mb-0 ${
                      pathname === item.path ? "bg-amber-100 text-amber-900" : "text-amber-800 hover:bg-amber-50"
                    }`}
                    onClick={(event) => handleNavigate(event, item.path)}
                  >
                    <span className="block font-semibold">{item.label}</span>
                    <span className="block text-xs text-amber-700">{item.meta}</span>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/pages/corporate-gifting"
              className={`${navLinkBase} ${isGiftingRoute ? navLinkActive : ""}`}
              onClick={(event) => handleNavigate(event, "/pages/corporate-gifting")}
            >
              Gifting
            </a>
            {userIsSuperUser ? (
              <a href="#admin" className={navLinkBase} onClick={handleAnchorClick}>
                Admin
              </a>
            ) : null}
            <a href="#shop" className={navLinkBase} onClick={handleAnchorClick}>
              Shop
            </a>
          </div>
        </nav>

        <nav
          id="mobile-nav"
          className={`${mobileMenuOpen ? "block" : "hidden"} border-t border-amber-900/10 px-4 py-3 md:hidden`}
        >
          <div className="flex flex-col gap-2">
            <a
              href="/"
              className={`${navLinkBase} ${isHomeRoute ? navLinkActive : ""}`}
              onClick={(event) => handleNavigate(event, "/")}
            >
              Home
            </a>

            <button
              type="button"
              className={`${navLinkBase} w-full justify-between`}
              onClick={() => setMobileCandlesOpen((prev) => !prev)}
            >
              Candles
              <span>{mobileCandlesOpen ? "-" : "+"}</span>
            </button>
            {mobileCandlesOpen ? (
              <div className="ml-2 flex flex-col gap-1 rounded-xl border border-amber-900/10 bg-white/80 p-2">
                {candleMenuItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      pathname === item.path ? "bg-amber-100 text-amber-900" : "text-amber-800"
                    }`}
                    onClick={(event) => handleNavigate(event, item.path)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}

            <button
              type="button"
              className={`${navLinkBase} w-full justify-between`}
              onClick={() => setMobileAromatherapyOpen((prev) => !prev)}
            >
              Aromatherapy
              <span>{mobileAromatherapyOpen ? "-" : "+"}</span>
            </button>
            {mobileAromatherapyOpen ? (
              <div className="ml-2 flex flex-col gap-1 rounded-xl border border-amber-900/10 bg-white/80 p-2">
                {aromatherapyMenuItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className={`rounded-lg px-3 py-2 text-sm ${
                      pathname === item.path ? "bg-amber-100 text-amber-900" : "text-amber-800"
                    }`}
                    onClick={(event) => handleNavigate(event, item.path)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}

            <a
              href="/pages/corporate-gifting"
              className={`${navLinkBase} ${isGiftingRoute ? navLinkActive : ""}`}
              onClick={(event) => handleNavigate(event, "/pages/corporate-gifting")}
            >
              Gifting
            </a>
            {userIsSuperUser ? (
              <a href="#admin" className={navLinkBase} onClick={handleAnchorClick}>
                Admin
              </a>
            ) : null}
            <a href="#shop" className={navLinkBase} onClick={handleAnchorClick}>
              Shop
            </a>

            <div className="mt-2 flex flex-col gap-2">
              <button
                type="button"
                className="min-h-[44px] rounded-xl border border-amber-900/20 px-4 py-3 text-lg font-semibold text-amber-900"
                onClick={onToggleTheme}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <a
                href="#shop"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-amber-700 px-4 py-3 text-lg font-semibold text-white"
                onClick={handleAnchorClick}
              >
                Cart {cartCount}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </m.header>
  );
}

export default Navbar;
