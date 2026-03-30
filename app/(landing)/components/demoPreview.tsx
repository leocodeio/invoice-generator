import { PreviewDetails } from "@/app/component/form/previewDetails";

const DemoPreview = () => (
  <div className="mx-auto w-full flex justify-center items-center">
    <PreviewDetails
      companyDetails={defaultValue.companyDetails}
      invoiceDetails={defaultValue.invoiceDetails}
      invoiceTerms={defaultValue.invoiceTerms}
      paymentDetails={defaultValue.paymentDetails}
      yourDetails={defaultValue.yourDetails}
    />
  </div>
);

const defaultValue = {
  companyDetails: {
    companyName: "Streakdash Inc",
    companyAddress: "1600 Amphitheatre Parkway",
    companyCity: "Mountain View",
    companyState: "CA",
    companyCountry: "USA",
    companyLogo: "/pranav.png",
    companyTaxId: "",
    companyZip: "94043",
    email: "support@streakdash.sh",
  },
  yourDetails: {
    yourName: "Nidhie",
    yourAddress: "6th Main Rd, Eshwara Layout, Indiranagar,",
    yourCity: "Bengaluru",
    yourState: "Karnataka",
    yourCountry: "India",
    yourLogo: "/pranav.png",
    yourEmail: "nidhie@streakdash.sh",
    yourTaxId: "",
    yourZip: "560038",
  },
  paymentDetails: {
    paymentMethod: "upi" as const,
    bankName: "Axis Bank",
    accountNumber: "1234567890",
    accountName: "Nidhie",
    routingCode: "123456",
    swiftCode: "AXISINBB1234",
    ifscCode: "UTIB0000000",
    upiId: "nidhie@upi",
    payableAmount: 265500,
    currency: "INR",
  },
  invoiceTerms: {
    invoiceNumber: "Invoice #25",
    issueDate: "Fri Apr 19 2024 00:00:00 GMT+0530 (India Standard Time)",
    dueDate: "Mon Apr 22 2024 00:00:00 GMT+0530 (India Standard Time)",
  },
  invoiceDetails: {
    note: "Services Period  21/03/2024 to 20/04/2024",
    discount: "22000",
    taxRate: "18",
    items: [
      {
        itemDescription: "Software Development Services",
        amount: 225000,
        qty: 0,
      },
      {
        itemDescription: "Hosting Charge",
        amount: 22000,
        qty: 0,
      },
    ],
    currency: "INR",
  },
};
export default DemoPreview;
