"use client";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { getInitialValue } from "@/lib/getInitialValue";

type CustomNumberProps = {
  label: string;
  variableName: string;
};

const DateInput = ({ label, variableName }: CustomNumberProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div className="group relative flex h-[56px] items-center rounded-[0.375rem] border border-[rgba(var(--outline-variant),0.15)] bg-[color:var(--surface-container-low)] px-3">
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild className="w-full">
              <button className="flex w-full items-center justify-between gap-2">
                <label
                  htmlFor={label}
                  className="editorial-label whitespace-nowrap"
                >
                  {label}
                </label>
                <div className="flex items-center gap-2 text-sm text-[color:var(--on-surface)]">
                  {value ? format(value, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="h-4 w-4" />
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mt-3" align="end">
              <Calendar
                mode="single"
                selected={new Date(value)}
                onSelect={(day: Date | undefined) => {
                  if (day?.toString()) {
                    const updatedValue = day.toString();
                    localStorage.setItem(variableName, updatedValue);
                    onChange(updatedValue);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {open && (
            <div className="pointer-events-none absolute inset-0 rounded-[0.375rem] border border-[color:var(--primary)]" />
          )}
        </div>
      )}
      name={variableName}
      defaultValue={getInitialValue(variableName)}
    />
  );
};

export default DateInput;
