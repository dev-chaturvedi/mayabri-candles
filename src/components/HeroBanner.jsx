import { m, useReducedMotion } from "framer-motion";

function HeroBanner({ onRouteClick }) {
  const shouldReduceMotion = useReducedMotion();

  const sectionMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.06 },
      };

  const contentMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1], delay: 0.18 },
      };

  return (
    <m.section
      className="mx-auto mt-4 w-full !max-w-screen-xl !px-4 sm:!px-6 md:!px-10"
      {...sectionMotion}
    >
      <div className="relative overflow-hidden rounded-3xl border border-amber-900/20 shadow-[0_30px_60px_rgba(93,57,27,0.22)]">
        <img
          src="/products/mayabri-hero-banner.jpg"
          alt="Mayabri premium floral candle collection"
          className="h-[52vh] min-h-[360px] w-full object-cover sm:h-[62vh]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/70 via-amber-900/35 to-transparent" />

        <m.div className="absolute inset-0 z-10 flex items-center p-6 sm:p-10 md:p-14" {...contentMotion}>
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/90">
              Spring Gift Edit
            </p>
            <h1 className="text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
              Floral Candle Gifting, Wrapped Beautifully
            </h1>
            <p className="text-base leading-relaxed text-amber-100/95 sm:text-lg">
              Explore hand-crafted candle sets designed for celebrations, thoughtful gifting, and premium home decor.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/collections/candles"
                className="inline-flex min-h-[44px] items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
                onClick={(event) => onRouteClick(event, "/collections/candles")}
              >
                Shop Collection
              </a>
              <a
                href="/pages/corporate-gifting"
                className="inline-flex min-h-[44px] items-center rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                onClick={(event) => onRouteClick(event, "/pages/corporate-gifting")}
              >
                Open Gifting
              </a>
            </div>
          </div>
        </m.div>
      </div>
    </m.section>
  );
}

export default HeroBanner;
