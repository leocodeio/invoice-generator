export const calculatePayableAmount = ({
  items,
  discount,
  taxRate,
}: {
  items: Item[];
  discount?: string | null;
  taxRate?: string | null;
}): number => {
  const subtotal = items.reduce((total, item) => {
    const quantity = item.qty ? +item.qty : 1;
    const amount = item.amount ? +item.amount : 0;
    return total + quantity * amount;
  }, 0);

  const amountAfterDiscount = subtotal - (discount ? +discount : 0);
  const taxAmount = amountAfterDiscount * ((taxRate ? +taxRate : 0) / 100);
  const total = amountAfterDiscount + taxAmount;

  return total > 0 ? +total.toFixed(2) : 0;
};

export const buildUpiPaymentUri = ({
  upiId,
  payeeName,
  amount,
  currency,
}: {
  upiId?: string | null;
  payeeName?: string | null;
  amount?: number | null;
  currency?: string | null;
}): string | null => {
  const trimmedUpiId = upiId?.trim();

  if (!trimmedUpiId) {
    return null;
  }

  const params = new URLSearchParams();
  params.set("pa", trimmedUpiId);

  if (payeeName?.trim()) {
    params.set("pn", payeeName.trim());
  }

  if (typeof amount === "number" && amount > 0) {
    params.set("am", amount.toFixed(2));
  }

  params.set("cu", currency?.trim() || "INR");

  return `upi://pay?${params.toString()}`;
};

export const getUpiQrCodeUrl = (upiPaymentUri: string, size = 220): string =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    upiPaymentUri
  )}`;
