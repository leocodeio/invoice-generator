/* eslint-disable @next/next/no-img-element */
import React from "react";
import { currencyList } from "@/lib/currency";
import { buildUpiPaymentUri, getUpiQrCodeUrl } from "@/lib/payment";
import { ChevronDown } from "lucide-react";

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
      className="grid grid-cols-2 group cursor-pointer relative"
      onClick={() => onClick && onClick("4")}
    >
      {!!onClick && (
        <>
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
          <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
        </>
      )}
      <div className="py-4 pl-10 pr-3">
        <p className="text-[11px] text-neutral-400 font-medium uppercase mb-3">
          {selectedPaymentMethod === "upi" ? "UPI Details" : "Bank Details"}
        </p>
        <div className="space-y-1">
          {selectedPaymentMethod === "bank" ? (
            <>
              <div className="grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-gray-500">Bank Name</p>
                {bankName ? (
                  <p className="flex truncate text-xs font-medium text-gray-600">
                    {bankName}
                  </p>
                ) : (
                  <div className="rounded-[3.5px] bg-neutral-100 h-4 w-full animate-pulse" />
                )}
              </div>
              <div className="mb-2 grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-gray-500">
                  Account Number
                </p>
                {accountNumber ? (
                  <p className="flex truncate text-xs font-medium text-gray-600">
                    {accountNumber}
                  </p>
                ) : (
                  <div className="rounded-[3.5px] bg-neutral-100 h-4 w-full animate-pulse" />
                )}
              </div>
              <div className="mb-2 grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-gray-500">Account Name</p>
                {accountName ? (
                  <p className="flex truncate text-xs font-medium text-gray-600">
                    {accountName}
                  </p>
                ) : (
                  <div className="rounded-[3.5px] bg-neutral-100 h-4 w-full animate-pulse" />
                )}
              </div>
              <div className="mb-2 grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-gray-500">Swift Code</p>
                {swiftCode ? (
                  <p className="flex truncate text-xs font-medium text-gray-600">
                    {swiftCode}
                  </p>
                ) : (
                  <div className="rounded-[3.5px] bg-neutral-100 h-4 w-full animate-pulse" />
                )}
              </div>
              {routingCode && (
                <div className="mb-2 grid grid-cols-2 items-center">
                  <p className="truncate text-xs font-medium text-gray-500">
                    Routing Code
                  </p>
                  <p className="flex truncate text-xs font-medium text-gray-600">
                    {routingCode}
                  </p>
                </div>
              )}
              {ifscCode && (
                <div className="mb-2 grid grid-cols-2 items-center">
                  <p className="truncate text-xs font-medium text-gray-500">IFSC Code</p>
                  <p className="flex truncate text-xs font-medium text-gray-600">
                    {ifscCode}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-gray-500">UPI ID</p>
                {upiId ? (
                  <p className="flex truncate text-xs font-medium text-gray-600">{upiId}</p>
                ) : (
                  <div className="rounded-[3.5px] bg-neutral-100 h-4 w-full animate-pulse" />
                )}
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-gray-500">Payee Name</p>
                {accountName ? (
                  <p className="flex truncate text-xs font-medium text-gray-600">
                    {accountName}
                  </p>
                ) : (
                  <div className="rounded-[3.5px] bg-neutral-100 h-4 w-full animate-pulse" />
                )}
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="truncate text-xs font-medium text-gray-500">Amount</p>
                <p className="flex truncate text-xs font-medium text-gray-600">
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
            <p className="text-[11px] text-neutral-400 font-medium uppercase mb-3">
              Payable in
            </p>
            {currencyDetails && (
              <div className="flex gap-2 justify-between items-center w-full">
                <div className="flex gap-3 items-center">
                  <currencyDetails.icon className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium text-sm">
                      {currencyDetails.currencyName}
                    </p>
                    <p className="text-xxs text-neutral-400">
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
            <p className="text-[11px] text-neutral-400 font-medium uppercase mb-3">
              Scan & Pay
            </p>
            {upiQrCodeUrl ? (
              <div className="flex flex-col items-center gap-2">
                <img src={upiQrCodeUrl} alt="UPI payment QR code" className="w-28 h-28" />
                <p className="text-xxs text-neutral-400 text-center">
                  Scan to pay {currencyDetails?.currencySymbol || ""}
                  {formattedAmount}
                </p>
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-gray-300 h-28 w-28 flex items-center justify-center text-[11px] text-neutral-400 text-center px-2">
                Add UPI ID to generate QR
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
