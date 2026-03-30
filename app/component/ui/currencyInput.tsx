"use client";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { currencyList } from "@/lib/currency";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { getInitialValue } from "@/lib/getInitialValue";

const CurrencyInput = () => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        const currencyDetails = currencyList.find(
          (currency) => currency.value.toLowerCase() === value.toLowerCase()
        )?.details;

        return (
          <div className="relative flex h-[56px] items-center rounded-[0.375rem] border border-[rgba(var(--outline-variant),0.15)] bg-[color:var(--surface-container-low)] px-3">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="w-full">
                <button className="flex w-full items-center justify-between gap-2">
                  <label className="editorial-label whitespace-nowrap">
                    Currency
                  </label>
                  <div className="flex items-center gap-1.5 rounded-full bg-[color:var(--surface-container-high)] px-2 py-0.5 pr-2.5 text-sm text-[color:var(--on-surface)]">
                    {currencyDetails && (
                      <currencyDetails.icon className="w-4 h-4 rounded-full" />
                    )}
                    <p className="font-medium text-sm">
                      {currencyDetails?.currencyShortForm}
                    </p>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 PopoverContent mt-3">
                <Command className="w-full">
                  <CommandInput
                    placeholder="Search currency..."
                    className="peer block w-full border-0 py-1.5 text-sm text-[color:var(--on-surface)] focus:ring-0 placeholder:font-medium placeholder:text-[color:var(--on-surface-variant)]"
                  />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup className="max-h-96 overflow-y-auto scrollbar-hide">
                    {currencyList.map((currency) => (
                      <CommandItem
                        key={currency.value}
                        value={currency.value}
                        onSelect={(currentValue) => {
                          const updatedValue =
                            currentValue === value ? "INR" : currentValue;
                          localStorage.setItem("currency", updatedValue);
                          onChange(updatedValue);
                          setOpen(false);
                        }}
                        className="w-full cursor-pointer my-2"
                      >
                        <div className="flex gap-2 justify-between items-center w-full">
                          <div className="flex gap-2 items-center">
                            <currency.details.icon className="w-6 h-6 rounded-full" />
                            <p className="font-medium">
                              {currency.details.currencyName}
                            </p>
                            <p className="font-medium text-[color:var(--on-surface-variant)]">
                              {currency.details.currencyShortForm}
                            </p>
                          </div>
                          <CheckCircle2
                            className={cn(
                              "h-6 w-6 rounded-full",
                              value.toLowerCase() ===
                                currency.value.toLowerCase()
                                ? "opacity-100 bg-[color:var(--primary)] text-[color:var(--on-primary)]"
                                : "opacity-0"
                            )}
                          />
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {open && (
              <div className="pointer-events-none absolute inset-0 rounded-[0.375rem] border border-[color:var(--primary)]" />
            )}
          </div>
        );
      }}
      name="currency"
      defaultValue={getInitialValue("currency", "INR")}
    />
  );
};

export default CurrencyInput;
