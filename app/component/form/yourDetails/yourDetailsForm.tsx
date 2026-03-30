import CustomTextInput from "@/app/component/ui/customTextInput";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import ImageInput from "@/app/component/ui/imageInput";

export const YourDetailsForm = () => (
  <div className="pt-2 md:pt-4">
    <p className="editorial-label pb-2">Section One</p>
    <p className="editorial-headline pb-3">Your Details (From)</p>
    <CustomTextInput
      label="Email"
      placeholder="e.g. nidhie@streakdash.sh"
      variableName="yourEmail"
      defaultValue="nidhie@streakdash.sh"
    />
    <p className="editorial-body pb-8 pt-3">
      We&apos;ll fill the billing details automatically if we find the your.
    </p>
    <p className="editorial-label pb-3">Billing Details</p>
    <CustomTextInput
      label="Your Name"
      placeholder="Nidhie"
      variableName="yourName"
      defaultValue="Nidhie"
    />
    <ImageInput label="Logo" variableName="yourLogo" />
    <CustomTextInput
      label="Address"
      placeholder="Whitefield Circle,12"
      variableName="yourAddress"
    />
    <CustomTextInput
      label="City"
      placeholder="Bangalore"
      variableName="yourCity"
    />
    <CustomTextInput
      label="State"
      placeholder="Karnataka"
      variableName="yourState"
    />
    <CustomNumberInput
      label="Zip"
      placeholder="560066"
      variableName="yourZip"
    />
    <CustomTextInput
      label="Country"
      placeholder="India"
      variableName="yourCountry"
    />
    <CustomTextInput
      label="Tax ID"
      placeholder="GSTIN 1234"
      variableName="yourTaxId"
    />
  </div>
);
