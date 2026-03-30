import { format } from "date-fns";

export const InvoiceTermsPreview: React.FC<
  InvoiceTerms & { onClick?: (step: string) => void }
> = ({ invoiceNumber, issueDate, dueDate, onClick }) => (
  <div
    className="grid cursor-pointer grid-cols-2 justify-between bg-[color:var(--surface-container-high)] px-10 py-4"
    onClick={() => onClick && onClick("5")}
  >
    <div>
      <p className="editorial-label">
        Invoice NO
      </p>
      <p className="text-xs font-medium text-[color:var(--on-surface)]">{invoiceNumber}</p>
    </div>
    <div className="flex items-center justify-between pl-10">
      <div>
        <p className="editorial-label">
          Issued
        </p>
        <p className="text-xs font-medium text-[color:var(--on-surface)]">
          {issueDate ? format(issueDate, "do MMM yyyy'") : ""}
        </p>
      </div>
      <div>
        <p className="editorial-label text-right">
          Due Date
        </p>
        <p className="text-xs font-medium text-[color:var(--on-surface)]">
          {dueDate ? format(dueDate, "do MMM yyyy'") : ""}
        </p>
      </div>
    </div>
  </div>
);
