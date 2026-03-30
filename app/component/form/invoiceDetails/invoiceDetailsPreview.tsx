/* eslint-disable @next/next/no-img-element */
import React from "react";
import { currencyList } from "@/lib/currency";

export const InvoiceDetailsPreview: React.FC<
  InvoiceItemDetails & { onClick?: (step: string) => void }
> = ({ note, discount, taxRate, items, currency = "INR", onClick }) => {
  const currencyType = currency;
  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === currencyType.toLowerCase()
  )?.details;
  const subtotal = calculateTotalAmount(items);
  const discountAmount = subtotal - (discount ? +discount : 0);
  const taxAmount = discountAmount * ((taxRate ? +taxRate : 0) / 100);
  const totalAmount = discountAmount + taxAmount;

  return (
    <div
      className="cursor-pointer bg-[color:var(--surface-container-lowest)]"
      onClick={() => onClick && onClick("3")}
    >
      <div className="grid grid-cols-2 items-center">
        <div className="py-4 px-10">
          <p className="editorial-label">
            Description
          </p>
        </div>
        <div className="py-4 px-10 grid grid-cols-3 items-center">
          <div>
            <p className="editorial-label">
              QTY
            </p>
          </div>
          <div>
            <p className="editorial-label">
              Price
            </p>
          </div>
          <div>
            <p className="editorial-label text-right">
              Amount
            </p>
          </div>
        </div>
      </div>
      {items.map(({ itemDescription, amount, qty }, index) => (
        <div
          className={`mx-10 grid grid-cols-2 items-center py-3 ${
            index % 2 === 0 ? "bg-transparent" : "bg-[color:var(--surface-container-low)]"
          }`}
          key={index}
        >
          <p className="flex truncate px-2 text-xs font-medium text-[color:var(--on-surface-variant)]">
            {itemDescription}
          </p>
          <div className="pl-10 grid grid-cols-3 items-center">
            <p className="flex truncate text-xs font-medium text-[color:var(--on-surface-variant)]">
              {qty || "-"}
            </p>
            <p className="flex truncate text-xs font-medium text-[color:var(--on-surface-variant)]">
              {amount ? addCommasToNumber(amount) : ""}
            </p>
            <p className="flex w-full items-end justify-end text-right text-xs font-medium text-[color:var(--on-surface-variant)]">
              {currencyDetails?.currencySymbol}
              {amount ? addCommasToNumber((qty ? qty : 1) * amount) : ""}
            </p>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2">
        {note ? (
          <div className="pt-6 pb-4">
            <p className="editorial-label px-10 pb-1">
              Note
            </p>
            <p className="break-words px-10 text-xs font-medium text-[color:var(--on-surface-variant)]">
              {note}
            </p>
          </div>
        ) : (
          <div />
        )}
        <div>
          <div className="mx-10 flex items-center justify-between bg-[color:var(--surface-container-low)] py-3 px-2">
            <p className="flex truncate text-xs font-medium text-[color:var(--on-surface-variant)]">
              Subtotal
            </p>
            <p className="flex truncate text-xs font-medium text-[color:var(--on-surface-variant)]">
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(subtotal)}
            </p>
          </div>
          {discount && (
            <div className="mx-10 mt-2 flex items-center justify-between bg-[color:var(--surface-container-low)] py-3 px-2">
              <p className="flex truncate text-xs font-medium text-[color:var(--on-surface-variant)]">
                Discount
              </p>
              <p className="flex truncate text-xs font-medium text-[color:var(--on-surface-variant)]">
                {currencyDetails?.currencySymbol}
                {discount ? addCommasToNumber(+discount) : ""}
              </p>
            </div>
          )}
          {taxRate && (
            <div className="mx-10 mt-2 flex items-center justify-between bg-[color:var(--surface-container-low)] py-3 px-2">
              <p className="flex truncate text-xs font-medium text-[color:var(--on-surface-variant)]">
                Tax ({taxRate})%
              </p>
              <p className="flex truncate text-xs font-medium text-[color:var(--on-surface-variant)]">
                {currencyDetails?.currencySymbol}
                {addCommasToNumber(+taxAmount.toFixed(2))}
              </p>
            </div>
          )}
          <div className="mt-2 flex items-center justify-between bg-[color:var(--surface-container-high)] px-10 py-3">
            <div>
              <p className="flex truncate text-xs font-medium text-[color:var(--on-surface)]">
                Amount
              </p>
            </div>
            <p className="flex truncate text-base font-semibold text-[color:var(--on-surface)]">
              {currencyDetails?.currencySymbol}
              {addCommasToNumber(totalAmount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateTotalAmount = (items: Item[]): number =>
  items.reduce((total, item) => {
    const quantity = item.qty ? +item.qty : 1;
    const amount = item.amount ? +item.amount : 0;
    return total + quantity * amount;
  }, 0);

const addCommasToNumber = (number: number): string => {
  let numberString = number.toString();
  const parts = numberString.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
