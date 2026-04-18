import { useEffect, useMemo, useState } from "react";
import { m, useReducedMotion } from "framer-motion";

const CATEGORY_DEFAULT_SPECS = {
  Jar: {
    burnTime: "40-50 hours",
    material: "Premium soy wax blend",
    fragrance: "Layered floral aroma",
  },
  Decorative: {
    burnTime: "28-36 hours",
    material: "Decorative sculpted soy wax",
    fragrance: "Soft botanical notes",
  },
  Gift: {
    burnTime: "32-42 hours",
    material: "Hand-poured soy wax",
    fragrance: "Signature gifting blend",
  },
  Festival: {
    burnTime: "34-46 hours",
    material: "Festival-grade soy wax",
    fragrance: "Warm festive notes",
  },
};

const toTitleCase = (value) =>
  value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const buildSpecs = (product) => {
  const fallback =
    CATEGORY_DEFAULT_SPECS[product.category] || {
      burnTime: "30-40 hours",
      material: "Natural soy wax",
      fragrance: "Balanced premium fragrance",
    };

  const derivedName = toTitleCase(product.name.replace(/[-_]/g, " "));

  return {
    description: product.description,
    burnTime: product.burnTime || fallback.burnTime,
    fragrance: product.fragrance || `${derivedName} fragrance`,
    material: product.material || fallback.material,
  };
};

function ProductPage({
  product,
  relatedProducts,
  isActionLoading,
  onAddToCart,
  onBuyNow,
  onOpenProduct,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [quantity, setQuantity] = useState(1);

  const galleryImages = useMemo(() => {
    const candidates = [
      product.image,
      ...(Array.isArray(product.gallery) ? product.gallery : []),
      ...relatedProducts.map((item) => item.image),
    ];

    return [...new Set(candidates.filter(Boolean))].slice(0, 5);
  }, [product.image, product.gallery, relatedProducts]);

  const [activeImage, setActiveImage] = useState(galleryImages[0] || product.image);

  useEffect(() => {
    setActiveImage(galleryImages[0] || product.image);
    setQuantity(1);
  }, [galleryImages, product.id, product.image]);

  const specs = useMemo(() => buildSpecs(product), [product]);

  const containerMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      };

  const handleManualQuantity = (event) => {
    const next = Number(event.target.value || 1);
    setQuantity(Math.max(1, next));
  };

  return (
    <m.section
      className="section reveal !max-w-screen-xl mx-auto !px-4 sm:!px-6 md:!px-10"
      id="product-page"
      {...containerMotion}
    >
      <div className="grid gap-6 md:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl border border-amber-900/15 bg-white/70">
            <img
              src={activeImage}
              alt={product.name}
              className="h-[360px] w-full object-cover sm:h-[460px]"
              loading="eager"
            />
          </div>
          {galleryImages.length > 1 ? (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
              {galleryImages.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`overflow-hidden rounded-xl border transition ${
                    image === activeImage
                      ? "border-amber-700 ring-2 ring-amber-700/25"
                      : "border-amber-900/15 hover:border-amber-400"
                  }`}
                  aria-label={`Select image for ${product.name}`}
                >
                  <img src={image} alt={product.name} className="h-20 w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="space-y-5 rounded-2xl border border-amber-900/15 bg-white/75 p-5 sm:p-6">
          <p className="inline-flex rounded-full border border-amber-900/15 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
            {product.category}
          </p>
          <h1 className="text-4xl text-amber-950 sm:text-5xl">{product.name}</h1>
          <p className="text-2xl font-bold text-amber-900">INR {product.price}</p>
          <p className="text-base leading-7 text-amber-900/85">{specs.description}</p>

          <div className="grid gap-2 rounded-xl border border-amber-900/15 bg-amber-50/60 p-4">
            <p className="text-sm text-amber-900"><strong>Burn Time:</strong> {specs.burnTime}</p>
            <p className="text-sm text-amber-900"><strong>Fragrance:</strong> {specs.fragrance}</p>
            <p className="text-sm text-amber-900"><strong>Material:</strong> {specs.material}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-amber-900">Quantity</span>
            <div className="inline-flex items-center gap-2 rounded-xl border border-amber-900/20 bg-white px-2 py-1">
              <button
                type="button"
                className="min-h-[36px] min-w-[36px] rounded-lg border border-amber-900/20 bg-white text-amber-900"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={isActionLoading}
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={handleManualQuantity}
                className="w-16 rounded-lg border border-amber-900/20 bg-white px-2 py-2 text-center"
                disabled={isActionLoading}
              />
              <button
                type="button"
                className="min-h-[36px] min-w-[36px] rounded-lg border border-amber-900/20 bg-white text-amber-900"
                onClick={() => setQuantity((prev) => prev + 1)}
                disabled={isActionLoading}
              >
                +
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="w-full min-h-[44px] rounded-xl border border-amber-900/20 bg-white px-4 py-3 text-lg font-semibold text-amber-900 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => onAddToCart(product, quantity)}
              disabled={isActionLoading}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="w-full min-h-[44px] rounded-xl bg-amber-700 px-4 py-3 text-lg font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => onBuyNow(product, quantity)}
              disabled={isActionLoading}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 ? (
        <div className="mt-8 space-y-4">
          <div className="section-head mb-0">
            <h2>Related Products</h2>
            <p>More from the {product.category} collection</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {relatedProducts.slice(0, 3).map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-amber-900/15 bg-white/80"
              >
                <img src={item.image} alt={item.name} className="h-48 w-full object-cover" loading="lazy" />
                <div className="space-y-2 p-4">
                  <h3 className="text-2xl text-amber-950">{item.name}</h3>
                  <p className="text-sm text-amber-900/75">INR {item.price}</p>
                  <button
                    type="button"
                    className="w-full min-h-[44px] rounded-xl border border-amber-900/20 bg-white px-4 py-3 text-sm font-semibold text-amber-900 transition hover:bg-amber-50"
                    onClick={() => onOpenProduct(item.id)}
                    disabled={isActionLoading}
                  >
                    View Product
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </m.section>
  );
}

export default ProductPage;
