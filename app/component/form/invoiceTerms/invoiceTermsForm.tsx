"use client";
import CustomTextInput from "@/app/component/ui/customTextInput";
import DateInput from "@/app/component/ui/dateInput";

export const InvoiceTermsForm = () => (
  <div className="pt-2 md:pt-4">
    <p className="editorial-label pb-2">Section Five</p>
    <p className="editorial-headline pb-4">Invoice terms</p>
    <CustomTextInput
      label="Invoice number"
      placeholder="INVOICE-01"
      variableName="invoiceNo"
    />
    <DateInput label="Issue date" variableName="issueDate" />
    <DateInput label="Due date" variableName="dueDate" />
  </div>
);
