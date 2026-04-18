function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3" aria-live="polite" aria-label="Loading products">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="rounded-2xl border border-amber-900/15 bg-white/80 p-4">
          <div className="h-60 w-full animate-pulse rounded-xl bg-amber-100" />
          <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-amber-100" />
          <div className="mt-3 h-4 w-2/3 animate-pulse rounded-full bg-amber-100" />
          <div className="mt-5 h-11 w-full animate-pulse rounded-xl bg-amber-100" />
          <div className="mt-3 h-11 w-full animate-pulse rounded-xl bg-amber-100" />
        </div>
      ))}
    </div>
  );
}

export default ProductGridSkeleton;
