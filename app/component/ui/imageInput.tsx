/* eslint-disable @next/next/no-img-element */
"use client";

import { getInitialValue } from "@/lib/getInitialValue";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { Controller } from "react-hook-form";

type CustomNumberProps = {
  label: string;
  variableName: string;
};

export const ImageInput = ({ label, variableName }: CustomNumberProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const isAcceptedFileType = (file: File) => {
    return ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type);
  };

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div
          className="relative flex h-[56px] cursor-pointer items-center justify-between rounded-[0.375rem] border border-[rgba(var(--outline-variant),0.15)] bg-[color:var(--surface-container-low)] px-3"
          onClick={handleButtonClick}
        >
          {label && (
            <label
              htmlFor={label}
              className="editorial-label whitespace-nowrap"
            >
              {label}
            </label>
          )}
          {value ? (
            <img
              src={value}
              className="mr-3 h-8 rounded-md p-1 hover:bg-[color:var(--surface-container-high)]"
              alt="company logo"
            />
          ) : (
            <button className="rounded-full border border-[rgba(var(--outline-variant),0.15)] bg-[color:var(--surface-container-high)] p-1.5 text-[color:var(--on-surface-variant)]">
              <Plus className="w-4 h-4" />
            </button>
          )}
          <input
            accept=".png, .jpg, .jpeg, .svg, .svg+xml"
            ref={inputRef}
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file && isAcceptedFileType(file)) {
                const reader = new FileReader();
                reader.onload = () => {
                  const url = reader.result as string;
                  onChange(url);
                  localStorage.setItem(variableName, url);
                };
                reader.readAsDataURL(file);
              }
            }}
            className={`peer hidden w-full border-0 bg-transparent py-1.5 text-sm text-[color:var(--on-surface)] focus:ring-0 ${
              label ? "text-right" : "p-0"
            } placeholder:font-medium placeholder:text-[color:var(--on-surface-variant)]`}
          />
        </div>
      )}
      name={variableName}
      defaultValue={getInitialValue(variableName)}
    />
  );
};

export default ImageInput;
