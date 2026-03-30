/* eslint-disable @next/next/no-img-element */
import React from "react";
import { currencyList } from "@/lib/currency";
import { buildUpiPaymentUri, getUpiQrCodeUrl } from "@/lib/payment";

export const PaymentDetailsPreview: React.FC<
  PaymentDetails & { onClick?: (step: string) => void }
> = ({
  paymentMethod,
  bankName,
  accountNumber,
  accountName,
  routingCode,
  swiftCode,
  ifscCode,
  upiId,
  payableAmount,
  currency = "INR",
  onClick,
}) => {
  const selectedPaymentMethod = paymentMethod === "upi" ? "upi" : "bank";
  const currencyDetails = currencyList.find(
    (currencyDetails) =>
      currencyDetails.value.toLowerCase() === currency.toLowerCase()
  )?.details;

  const amountToPay = typeof payableAmount === "number" ? payableAmount : 0;
  const upiPaymentUri = buildUpiPaymentUri({
    upiId,
    payeeName: accountName,
    amount: amountToPay,
    currency,
  });
  const upiQrCodeUrl = upiPaymentUri ? getUpiQrCodeUrl(upiPaymentUri, 180) : null;
  const formattedAmount = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountToPay);

  return (
    <div
      className="grid cursor-pointer grid-cols-2 bg-[color:var(--surface-container-low)]"
      onClick={() => onClick && onClick("4")}
    >
      <div className="py-4 pl-10 pr-3">
        <p className="editorial-label mb-3">
          {selectedPaymentMethod === "upi" ? "UPI Details" : "Bank Details"}
        </p>
        <div className="space-y-1">
          {selectedPaymentMethod === "bank" ? (
            <>
              <div className="grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-[color:var(--on-surface-variant)]">Bank Name</p>
                {bankName ? (
                  <p className="flex truncate text-xs font-medium text-[color:var(--on-surface)]">
                    {bankName}
                  </p>
                ) : (
                  <div className="h-4 w-full animate-pulse rounded-[3.5px] bg-[color:var(--surface-container-high)]" />
                )}
              </div>
              <div className="mb-2 grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-[color:var(--on-surface-variant)]">
                  Account Number
                </p>
                {accountNumber ? (
                  <p className="flex truncate text-xs font-medium text-[color:var(--on-surface)]">
                    {accountNumber}
                  </p>
                ) : (
                  <div className="h-4 w-full animate-pulse rounded-[3.5px] bg-[color:var(--surface-container-high)]" />
                )}
              </div>
              <div className="mb-2 grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-[color:var(--on-surface-variant)]">Account Name</p>
                {accountName ? (
                  <p className="flex truncate text-xs font-medium text-[color:var(--on-surface)]">
                    {accountName}
                  </p>
                ) : (
                  <div className="h-4 w-full animate-pulse rounded-[3.5px] bg-[color:var(--surface-container-high)]" />
                )}
              </div>
              <div className="mb-2 grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-[color:var(--on-surface-variant)]">Swift Code</p>
                {swiftCode ? (
                  <p className="flex truncate text-xs font-medium text-[color:var(--on-surface)]">
                    {swiftCode}
                  </p>
                ) : (
                  <div className="h-4 w-full animate-pulse rounded-[3.5px] bg-[color:var(--surface-container-high)]" />
                )}
              </div>
              {routingCode && (
                <div className="mb-2 grid grid-cols-2 items-center">
                  <p className="truncate text-xs font-medium text-[color:var(--on-surface-variant)]">
                    Routing Code
                  </p>
                  <p className="flex truncate text-xs font-medium text-[color:var(--on-surface)]">
                    {routingCode}
                  </p>
                </div>
              )}
              {ifscCode && (
                <div className="mb-2 grid grid-cols-2 items-center">
                  <p className="truncate text-xs font-medium text-[color:var(--on-surface-variant)]">IFSC Code</p>
                  <p className="flex truncate text-xs font-medium text-[color:var(--on-surface)]">
                    {ifscCode}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-[color:var(--on-surface-variant)]">UPI ID</p>
                {upiId ? (
                  <p className="flex truncate text-xs font-medium text-[color:var(--on-surface)]">{upiId}</p>
                ) : (
                  <div className="h-4 w-full animate-pulse rounded-[3.5px] bg-[color:var(--surface-container-high)]" />
                )}
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-[color:var(--on-surface-variant)]">Payee Name</p>
                {accountName ? (
                  <p className="flex truncate text-xs font-medium text-[color:var(--on-surface)]">
                    {accountName}
                  </p>
                ) : (
                  <div className="h-4 w-full animate-pulse rounded-[3.5px] bg-[color:var(--surface-container-high)]" />
                )}
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-[color:var(--on-surface-variant)]">Amount</p>
                <p className="flex truncate text-xs font-medium text-[color:var(--on-surface)]">
                  {currencyDetails?.currencySymbol}
                  {formattedAmount}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="py-4 px-10">
        {selectedPaymentMethod === "bank" ? (
          <>
            <p className="editorial-label mb-3">
              Payable in
            </p>
            {currencyDetails && (
              <div className="flex gap-2 justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                  <currencyDetails.icon className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-[color:var(--on-surface)]">
                      {currencyDetails.currencyName}
                    </p>
                    <p className="text-xxs text-[color:var(--on-surface-variant)]">
                      {currencyDetails.currencySymbol}{" "}
                      {currencyDetails.currencyShortForm}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <p className="editorial-label mb-3">
              Scan & Pay
            </p>
            {upiQrCodeUrl ? (
              <div className="flex flex-col items-center gap-2">
                <img src={upiQrCodeUrl} alt="UPI payment QR code" className="w-28 h-28" />
                <p className="text-xxs text-center text-[color:var(--on-surface-variant)]">
                  Scan to pay {currencyDetails?.currencySymbol || ""}
                  {formattedAmount}
                </p>
              </div>
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-md border border-[rgba(var(--outline-variant),0.15)] bg-[color:var(--surface-container-lowest)] px-2 text-center text-[11px] text-[color:var(--on-surface-variant)]">
                Add UPI ID to generate QR
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
