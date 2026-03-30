import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[0.375rem] text-sm font-medium transition-all duration-300 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,var(--primary),var(--primary-container))] text-[color:var(--on-primary)] hover:brightness-110",
        destructive:
          "bg-[#8a243d] text-white hover:bg-[#701f33]",
        outline:
          "border border-[rgba(var(--outline-variant),0.15)] bg-[color:var(--surface-container-low)] text-[color:var(--on-surface)] hover:bg-[color:var(--surface-container-highest)]",
        secondary:
          "bg-[color:var(--surface-container-high)] text-[color:var(--on-surface)] hover:bg-[color:var(--surface-container-highest)]",
        ghost:
          "text-[color:var(--on-surface)] hover:bg-[color:var(--surface-container-low)]",
        link: "text-[color:var(--on-surface)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
