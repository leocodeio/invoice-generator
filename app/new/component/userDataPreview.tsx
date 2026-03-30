"use client";

import { PreviewDetails } from "@/app/component/form/previewDetails";
import { useData } from "@/app/hooks/useData";
import { useFormContext } from "react-hook-form";

type UserDataPreviewProps = {
  onStepLabelChange?: (title: string) => void;
};

const stepTitleMap: Record<string, string> = {
  "1": "Your Details",
  "2": "Company Details",
  "3": "Invoice Items",
  "4": "Payment Details",
  "5": "Invoice Terms",
  "6": "Review & Download",
};

export const UserDataPreview = ({ onStepLabelChange }: UserDataPreviewProps) => {
  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
  } = useData();
  const { setValue } = useFormContext();

  const onClick = (step: string) => {
    setValue("step", step);
    localStorage.setItem("step", step);
    onStepLabelChange?.(stepTitleMap[step] || stepTitleMap["1"]);
  };

  return (
    <PreviewDetails
      onClick={onClick}
      companyDetails={companyDetails}
      invoiceDetails={invoiceDetails}
      invoiceTerms={invoiceTerms}
      paymentDetails={paymentDetails}
      yourDetails={yourDetails}
    />
  );
};
