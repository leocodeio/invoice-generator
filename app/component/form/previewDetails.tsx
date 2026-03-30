import { CompanyDetailsPreview } from "@/app/component/form/companyDetails/companyDetailsPreview";
import { InvoiceDetailsPreview } from "@/app/component/form/invoiceDetails/invoiceDetailsPreview";
import { InvoiceTermsPreview } from "@/app/component/form/invoiceTerms/InvoiceTermsPreview";
import { PaymentDetailsPreview } from "@/app/component/form/paymentDetails/paymentDetailsPreview";
import { YourDetailsPreview } from "@/app/component/form/yourDetails/yourDetailsPreview";

export const PreviewDetails = ({
  yourDetails,
  companyDetails,
  invoiceDetails,
  paymentDetails,
  invoiceTerms,
  onClick,
}: {
  yourDetails: YourDetails;
  companyDetails: CompanyDetails;
  invoiceDetails: InvoiceItemDetails;
  paymentDetails: PaymentDetails;
  invoiceTerms: InvoiceTerms;
  onClick?: (step: string) => void;
}) => (
  <div className="overflow-x-auto">
    <div className="h-[842px] w-[595px] overflow-hidden rounded-2xl border border-[rgba(var(--outline-variant),0.15)] bg-[color:var(--surface-container-lowest)] text-[color:var(--on-surface)]">
      <InvoiceTermsPreview {...invoiceTerms} onClick={onClick} />
      <div className="grid grid-cols-2 justify-between bg-[color:var(--surface-container-low)]">
        <div
          className="cursor-pointer bg-[color:var(--surface-container-lowest)] px-10 py-5 hover:bg-[color:var(--surface-container-low)]"
          onClick={() => onClick && onClick("1")}
        >
          <YourDetailsPreview {...yourDetails} />
        </div>
        <div
          className="cursor-pointer bg-[color:var(--surface-container-lowest)] px-10 py-5 hover:bg-[color:var(--surface-container-low)]"
          onClick={() => onClick && onClick("2")}
        >
          <CompanyDetailsPreview {...companyDetails} />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div className="justify-between bg-[color:var(--surface-container-lowest)]">
          <InvoiceDetailsPreview {...invoiceDetails} onClick={onClick} />
        </div>
        <div className="bg-[color:var(--surface-container-low)]">
          <PaymentDetailsPreview {...paymentDetails} onClick={onClick} />
        </div>
      </div>
    </div>
  </div>
);
