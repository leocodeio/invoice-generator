"use client";
import Image from "next/image";
import { UserInputForm } from "@/app/component/form/userInputForm";
import { FormSteps } from "@/app/component/form/step/fromSteps";
import { UserDataPreview } from "@/app/new/component/userDataPreview";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";

const STEP_MAP: Record<string, string> = {
  "1": "Your Details",
  "2": "Company Details",
  "3": "Invoice Items",
  "4": "Payment Details",
  "5": "Invoice Terms",
  "6": "Review & Download",
};

export const NewInvoiceForm = () => {
  const methods = useForm();
  const [isClient, setIsClient] = useState(false);
  const [stepLabel, setStepLabel] = useState("Your Details");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
      try {
        const step = localStorage.getItem("step");
        if (!(step && typeof +step === "number")) {
          localStorage.setItem("step", "1");
          setStepLabel(STEP_MAP["1"]);
        } else {
          setStepLabel(STEP_MAP[step] || STEP_MAP["1"]);
        }
      } catch (e) {
        localStorage.setItem("step", "1");
        setStepLabel(STEP_MAP["1"]);
      }
    }
  }, []);

  return (
    <>
      {isClient ? (
        <FormProvider {...methods}>
          <div className="mx-auto flex min-h-screen w-full max-w-[1320px] flex-col-reverse md:flex-row">
            <section className="surface-low w-full md:max-w-[480px] md:min-h-screen">
              <div className="flex h-full flex-col justify-between p-5 md:p-10">
                <div>
                  <div className="mb-10 flex items-center gap-3">
                    <Image
                      src="/pranav.png"
                      width={42}
                      height={42}
                      className="rounded-[0.5rem]"
                      alt="logo"
                    />
                    <div>
                      <p className="editorial-label">Invoice Studio</p>
                      <p className="text-sm font-medium text-[color:var(--on-surface)]">By Streakdash</p>
                    </div>
                  </div>
                  <div className="surface-lowest mb-7 rounded-xl p-4">
                    <p className="editorial-label">Current Step</p>
                    <p className="editorial-title mt-1">{stepLabel}</p>
                  </div>
                  <UserInputForm />
                </div>
                <div className="mt-8 rounded-xl bg-[color:var(--surface-container-high)] p-2">
                  <FormSteps onStepLabelChange={setStepLabel} />
                </div>
              </div>
            </section>
            <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-5 md:p-10">
              <div className="absolute inset-0 -z-10">
                <div className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-[#dce2f3] blur-3xl" />
                <div className="absolute right-4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#e7ecfb] blur-3xl" />
              </div>
              <div className="glass-panel ambient-shadow w-full rounded-2xl p-3 md:p-6">
                <UserDataPreview onStepLabelChange={setStepLabel} />
              </div>
            </section>
          </div>
        </FormProvider>
      ) : (
        <div />
      )}
    </>
  );
};
