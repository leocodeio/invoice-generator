"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "w-9 rounded-md text-[0.8rem] font-normal text-[color:var(--on-surface-variant)]",
        row: "flex w-full mt-2",
        cell: "relative h-9 w-9 p-0 text-center text-sm first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 [&:has([aria-selected].day-outside)]:bg-[color:var(--surface-container-low)] [&:has([aria-selected])]:bg-[color:var(--surface-container-high)] [&:has([aria-selected].day-range-end)]:rounded-r-md",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-[color:var(--primary)] text-[color:var(--on-primary)] hover:bg-[color:var(--primary)] hover:text-[color:var(--on-primary)] focus:bg-[color:var(--primary)] focus:text-[color:var(--on-primary)]",
        day_today:
          "bg-[color:var(--surface-container-high)] text-[color:var(--on-surface)]",
        day_outside:
          "day-outside text-[color:var(--on-surface-variant)] opacity-50 aria-selected:bg-[color:var(--surface-container-low)] aria-selected:text-[color:var(--on-surface-variant)] aria-selected:opacity-30",
        day_disabled: "text-[color:var(--on-surface-variant)] opacity-50",
        day_range_middle:
          "aria-selected:bg-[color:var(--surface-container-high)] aria-selected:text-[color:var(--on-surface)]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
