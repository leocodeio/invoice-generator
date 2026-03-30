import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import ImageInput from "@/app/component/ui/imageInput";

export const CompanyDetailsForm = () => (
  <div className="pt-2 md:pt-4">
    <p className="editorial-label pb-2">Section Two</p>
    <p className="editorial-headline pb-3">Company Details (To)</p>
    <CustomTextInput
      label="Email"
      placeholder="e.g. nidhie@streakdash.sh"
      variableName="email"
    />
    <p className="editorial-body pb-8 pt-3">
      We&apos;ll fill the billing details automatically if we find the company.
    </p>
    <p className="editorial-label pb-3">Billing Details</p>
    <CustomTextInput
      label="Company name"
      placeholder="Streakdash Inc"
      variableName="companyName"
    />
    <ImageInput label="Logo" variableName="companyLogo" />
    <CustomTextInput
      label="Address"
      placeholder="Whitefield Circle,12"
      variableName="companyAddress"
    />
    <CustomTextInput
      label="City"
      placeholder="Bangalore"
      variableName="companyCity"
    />
    <CustomTextInput
      label="State"
      placeholder="Karnataka"
      variableName="companyState"
    />
    <CustomNumberInput
      label="Zip"
      placeholder="560066"
      variableName="companyZip"
    />
    <CustomTextInput
      label="Country"
      placeholder="India"
      variableName="companyCountry"
    />
    <CustomTextInput
      label="Tax ID"
      placeholder="GSTIN 1234"
      variableName="companyTaxId"
    />
  </div>
);
