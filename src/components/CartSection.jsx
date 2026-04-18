const formatCurrency = (value) => `INR ${Number(value || 0)}`;

function CartSection({
  cart,
  user,
  discountCode,
  onDiscountCodeChange,
  onApplyDiscount,
  onRemoveDiscount,
  appliedDiscountCode,
  discountPercent,
  giftWrap,
  onGiftWrapChange,
  giftMessage,
  onGiftMessageChange,
  cartTotal,
  payableTotal,
  paymentLoading,
  onIncreaseQty,
  onDecreaseQty,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) {
  const checkoutDisabled = paymentLoading || !user || cart.length === 0;

  return (
    <aside className="cart-card rounded-2xl border border-amber-900/15 bg-white/85 p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl text-amber-950">Cart</h2>
        <span className="inline-flex min-h-[32px] min-w-[32px] items-center justify-center rounded-full bg-amber-100 px-2 text-sm font-semibold text-amber-900">
          {cart.length}
        </span>
      </div>

      {!user ? (
        <p className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Please sign up or log in to place an order.
        </p>
      ) : null}

      {cart.length === 0 ? (
        <p className="empty-text text-amber-900/75">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="rounded-xl border border-amber-900/15 bg-white p-3">
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-base font-semibold text-amber-950">{item.name}</h4>
                    <p className="text-sm text-amber-900/80">{formatCurrency(item.price)}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        className="min-h-[36px] min-w-[36px] rounded-lg border border-amber-900/20 bg-white px-2 text-amber-900"
                        onClick={() => onDecreaseQty(item.id)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) => onUpdateQty(item.id, Number(event.target.value || 1))}
                        className="w-16 rounded-lg border border-amber-900/20 bg-white px-2 py-2 text-center"
                      />
                      <button
                        type="button"
                        className="min-h-[36px] min-w-[36px] rounded-lg border border-amber-900/20 bg-white px-2 text-amber-900"
                        onClick={() => onIncreaseQty(item.id)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="min-h-[36px] rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 rounded-xl border border-amber-900/15 bg-amber-50/60 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Discount code"
                value={discountCode}
                onChange={(event) => onDiscountCodeChange(event.target.value)}
                className="w-full rounded-lg border border-amber-900/20 bg-white px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={onApplyDiscount}
                className="min-h-[44px] rounded-lg bg-amber-700 px-4 py-2 text-sm font-semibold text-white"
              >
                Apply
              </button>
            </div>
            {appliedDiscountCode ? (
              <button
                className="text-sm font-semibold text-amber-900 underline"
                type="button"
                onClick={onRemoveDiscount}
              >
                Remove {appliedDiscountCode}
              </button>
            ) : null}
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-amber-900">
            <input
              type="checkbox"
              checked={giftWrap}
              onChange={(event) => onGiftWrapChange(event.target.checked)}
            />
            Add gift wrap (INR 99)
          </label>

          {giftWrap ? (
            <input
              type="text"
              placeholder="Gift message (optional)"
              value={giftMessage}
              onChange={(event) => onGiftMessageChange(event.target.value)}
              className="w-full rounded-lg border border-amber-900/20 bg-white px-3 py-2 text-sm"
            />
          ) : null}

          <div className="space-y-1 rounded-xl border border-amber-900/15 bg-white p-3 text-sm text-amber-900">
            <div className="flex items-center justify-between">
              <p>Subtotal</p>
              <p>{formatCurrency(cartTotal)}</p>
            </div>
            {discountPercent > 0 ? (
              <div className="flex items-center justify-between">
                <p>Discount ({appliedDiscountCode})</p>
                <p>- {discountPercent}%</p>
              </div>
            ) : null}
            {giftWrap ? (
              <div className="flex items-center justify-between">
                <p>Gift Wrap</p>
                <p>INR 99</p>
              </div>
            ) : null}
            <div className="mt-2 flex items-center justify-between border-t border-amber-900/15 pt-2 text-base font-semibold">
              <p>Total</p>
              <p>{formatCurrency(payableTotal)}</p>
            </div>
          </div>

          <button
            type="button"
            className="w-full min-h-[44px] rounded-xl bg-amber-700 px-4 py-3 text-base font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={onCheckout}
            disabled={checkoutDisabled}
          >
            {paymentLoading
              ? "Processing Payment..."
              : user
                ? "Checkout with Razorpay"
                : "Login to Place Order"}
          </button>
        </div>
      )}
    </aside>
  );
}

export default CartSection;
