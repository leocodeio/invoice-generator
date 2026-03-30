import { NewInvoiceForm } from "@/app/new/component/NewInvoiceForm";
import { Suspense } from "react";

const Page = () => (
  <div className="surface min-h-screen h-full overflow-y-auto">
    <Suspense>
      <NewInvoiceForm />
    </Suspense>
  </div>
);

export default Page;
