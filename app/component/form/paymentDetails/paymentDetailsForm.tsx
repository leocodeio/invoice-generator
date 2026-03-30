"use client";

import { useFormContext } from "react-hook-form";
import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import { useGetValue } from "@/app/hooks/useGetValue";
import { getInitialValue } from "@/lib/getInitialValue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const PaymentDetailsForm = () => {
  const { setValue } = useFormContext();
  const paymentMethod =
    (useGetValue("paymentMethod", getInitialValue("paymentMethod", "bank")) as
      | "bank"
      | "upi") || "bank";

  const onPaymentMethodChange = (method: "bank" | "upi") => {
    setValue("paymentMethod", method);
    localStorage.setItem("paymentMethod", method);
  };

  return (
    <div className="pt-2 md:pt-4">
      <p className="editorial-label pb-2">Section Four</p>
      <p className="editorial-headline pb-4">Payment Details</p>
      <div className="pb-6">
        <p className="editorial-label pb-3">Payment Method</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={paymentMethod === "bank" ? "default" : "outline"}
            className={cn(
              "h-10",
              paymentMethod !== "bank" &&
                "border-[rgba(var(--outline-variant),0.15)]"
            )}
            onClick={() => onPaymentMethodChange("bank")}
          >
            Bank
          </Button>
          <Button
            type="button"
            variant={paymentMethod === "upi" ? "default" : "outline"}
            className={cn(
              "h-10",
              paymentMethod !== "upi" &&
                "border-[rgba(var(--outline-variant),0.15)]"
            )}
            onClick={() => onPaymentMethodChange("upi")}
          >
            UPI
          </Button>
        </div>
      </div>

      {paymentMethod === "bank" ? (
        <>
          <CustomTextInput
            label="Bank name"
            placeholder="HSBC"
            variableName="bankName"
            defaultValue="Axis Bank"
          />
          <CustomTextInput
            label="Account number"
            placeholder="8920804195"
            variableName="accountNumber"
            defaultValue="1234567890"
          />
          <CustomTextInput
            label="Account Name"
            placeholder="Nidhie"
            variableName="accountName"
            defaultValue="Nidhie"
          />
          <CustomTextInput
            label="IFSC code"
            placeholder="HSBC0560002"
            variableName="ifscCode"
            defaultValue="UTIB0000000"
          />
          <CustomTextInput
            label="Routing number"
            placeholder="0804189592"
            variableName="routingCode"
            defaultValue="123456"
          />
          <CustomNumberInput
            label="Swift code"
            placeholder="HSBCINAA123"
            variableName="swiftCode"
            defaultValue="AXISINBB1234"
          />
        </>
      ) : (
        <>
          <CustomTextInput
            label="UPI ID"
            placeholder="nidhie@upi"
            variableName="upiId"
            defaultValue="nidhie@upi"
          />
          <CustomTextInput
            label="Payee name"
            placeholder="Nidhie"
            variableName="accountName"
            defaultValue="Nidhie"
          />
          <p className="editorial-body pt-4">
            A QR code with this UPI ID and invoice amount will appear in the invoice.
          </p>
        </>
      )}
    </div>
  );
};
