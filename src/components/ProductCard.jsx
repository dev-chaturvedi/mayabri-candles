import { m, useReducedMotion } from "framer-motion";

function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  onDelete,
  isSuperUser,
  isAdminLoading,
  isActionsDisabled,
  variants,
}) {
  const shouldReduceMotion = useReducedMotion();

  const hoverMotion = shouldReduceMotion
    ? {}
    : {
        whileHover: {
          scale: 1.018,
          y: -4,
          boxShadow: "0 24px 38px rgba(88, 53, 27, 0.24)",
        },
        transition: { type: "spring", stiffness: 260, damping: 22, mass: 0.75 },
      };

  return (
    <m.article
      className="overflow-hidden rounded-2xl border border-amber-900/15 bg-white/85 shadow-sm transition duration-300"
      variants={variants}
      {...hoverMotion}
    >
      <img src={product.image} alt={product.name} loading="lazy" className="w-full h-60 object-cover" />
      <div className="space-y-3 p-4">
        <p className="inline-flex rounded-full border border-amber-900/15 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
          {product.category}
        </p>
        <h3 className="text-2xl font-semibold text-amber-950">{product.name}</h3>
        <p className="text-sm leading-6 text-amber-800/80">{product.description}</p>
        <p className="text-lg font-bold text-amber-900">INR {product.price}</p>

        <div className="flex flex-col gap-3 pt-1">
          <button
            type="button"
            className="w-full min-h-[44px] rounded-xl border border-amber-900/20 bg-white px-4 py-3 text-lg font-semibold text-amber-900 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => onQuickView(product)}
            disabled={isActionsDisabled}
          >
            View Product
          </button>
          <button
            type="button"
            className="w-full min-h-[44px] rounded-xl bg-amber-700 px-4 py-3 text-lg font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => onAddToCart(product)}
            disabled={isActionsDisabled}
          >
            Add to Cart
          </button>
          {isSuperUser ? (
            <button
              type="button"
              className="w-full min-h-[44px] rounded-xl bg-red-600 px-4 py-3 text-lg font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => onDelete(product.id)}
              disabled={isAdminLoading || isActionsDisabled}
            >
              {isAdminLoading ? "Removing..." : "Remove Product"}
            </button>
          ) : null}
        </div>
      </div>
    </m.article>
  );
}

export default ProductCard;
