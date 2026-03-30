import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => (
    <div
      className={`group relative flex items-center gap-3 rounded-[0.375rem] border border-[rgba(var(--outline-variant),0.15)] bg-[color:var(--surface-container-low)] px-3 focus-within:border-[color:var(--primary)] ${
        label ? "h-[56px]" : "h-[46px]"
      } ${className || ""}`}
    >
      {label && (
        <label
          htmlFor={label}
          className="editorial-label whitespace-nowrap"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        {...props}
        name={label}
        id={label}
        className={`peer block w-full border-0 bg-transparent py-1.5 text-sm text-[color:var(--on-surface)] outline-none focus:ring-0 ${
          label ? "text-right" : "p-0"
        } placeholder:font-medium placeholder:text-[color:var(--on-surface-variant)]/70`}
      />
    </div>
  )
);

Input.displayName = "Input";

export { Input };
