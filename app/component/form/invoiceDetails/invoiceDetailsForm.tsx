"use client";

import CustomTextInput from "@/app/component/ui/customTextInput";
import CurrencyInput from "@/app/component/ui/currencyInput";
import { currencyList } from "@/lib/currency";
import { Input } from "@/app/component/ui/input";
import { Plus, Trash2 } from "lucide-react";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import { useGetValue } from "@/app/hooks/useGetValue";
import { Controller } from "react-hook-form";
import { getItemValue } from "@/lib/getInitialValue";

export const InvoiceDetailsForm = () => {
  const selectedCurrency = useGetValue("currency", "INR");
  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === selectedCurrency.toLowerCase()
  )?.details;

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div className="pt-2 md:pt-4">
          <p className="editorial-label pb-2">Section Three</p>
          <p className="editorial-headline pb-4">Invoice Details</p>
          <div className="flex flex-col gap-7">
            <div>
              <p className="editorial-label pb-3">Select an invoice currency</p>
              <CurrencyInput />
            </div>

            <div>
              <p className="editorial-label pb-3">Items</p>
              {value.map(({ itemDescription, amount, qty }: Item, index: number) => (
                <div
                  className="surface-lowest relative mb-2 flex items-center gap-2 rounded-xl p-2"
                  key={index}
                >
                  <div className={`h-9 w-8 ${value.length === 1 && "invisible"}`}>
                    <button
                      onClick={() => {
                        const newList = [...value];
                        newList.splice(index, 1);
                        localStorage.setItem("items", JSON.stringify(newList));
                        onChange(newList);
                      }}
                      type="button"
                      className="hidden rounded-md p-2 text-[color:var(--on-surface-variant)] hover:bg-[color:var(--surface-container-high)] group-hover:block"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="w-full flex-1">
                    <Input
                      placeholder="Item name"
                      value={itemDescription}
                      type="text"
                      onChange={(e) => {
                        const updatedArray = [...value];
                        updatedArray[index] = {
                          itemDescription: e.target.value,
                          amount,
                          qty,
                        };
                        localStorage.setItem("items", JSON.stringify(updatedArray));
                        onChange(updatedArray);
                      }}
                    />
                  </div>

                  <div className="w-20">
                    <Input
                      placeholder="Qty"
                      value={`${qty || ""}`}
                      type="text"
                      pattern="[0-9]*"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (/^-?\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                          const updatedArray = [...value];
                          updatedArray[index] = {
                            itemDescription,
                            amount,
                            qty: +inputValue,
                          };
                          localStorage.setItem("items", JSON.stringify(updatedArray));
                          onChange(updatedArray);
                        }
                      }}
                    />
                  </div>

                  <div className="w-24">
                    <Input
                      placeholder="Price"
                      value={`${amount || ""}`}
                      type="text"
                      pattern="[0-9]*"
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (/^-?\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                          const updatedArray = [...value];
                          updatedArray[index] = {
                            itemDescription,
                            amount: +inputValue,
                            qty,
                          };
                          localStorage.setItem("items", JSON.stringify(updatedArray));
                          onChange(updatedArray);
                        }
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="pt-3">
                <button
                  onClick={() => {
                    localStorage.setItem("items", JSON.stringify([...value, { itemDescription: "" }]));
                    onChange([...value, { itemDescription: "" }]);
                  }}
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-[color:var(--surface-container-high)] px-4 py-2 text-sm font-medium text-[color:var(--on-surface)] hover:bg-[color:var(--surface-container-highest)]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>

            <div>
              <p className="editorial-label pb-3">Note</p>
              <CustomTextInput placeholder="Add a note" variableName="note" />
            </div>

            <div>
              <p className="editorial-label pb-3">More options</p>
              <CustomNumberInput
                label="Discount"
                placeholder={`${currencyDetails?.currencySymbol}0`}
                variableName="discount"
              />
              <CustomNumberInput label="Taxes" placeholder="0%" variableName="tax" />
            </div>
          </div>
        </div>
      )}
      name="items"
      defaultValue={getItemValue()}
    />
  );
};
