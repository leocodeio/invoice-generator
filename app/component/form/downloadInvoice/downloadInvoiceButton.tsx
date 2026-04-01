"use client";

import { Button } from "@/components/ui/button";
import { Document, Font, Page } from "@react-pdf/renderer";
import { CheckCircle2, Download, LoaderIcon, SplineIcon } from "lucide-react";
import { PdfDetails } from "../pdfDetails";
import { useData } from "@/app/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { useEffect, useState } from "react";
import { currencyList } from "@/lib/currency";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

export const DownloadInvoiceButton = () => {
  const [status, setStatus] = useState<
    "downloaded" | "downloading" | "not-downloaded"
  >("not-downloaded");
  const [downloadOptions, setDownloadOptions] = useState({
    pdf: true,
    json: true,
  });

  const { getValues } = useFormContext();
  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
  } = useData();

  useEffect(() => {
    if (status === "downloaded") {
      setTimeout(() => {
        setStatus("not-downloaded");
      }, 1000);
    }
  }, [status]);

  const handleDownload = async () => {
    try {
      setStatus("downloading");

      // 1. Download JSON if selected
      if (downloadOptions.json) {
        const formData = getValues();
        const jsonBlob = new Blob([JSON.stringify(formData, null, 2)], {
          type: "application/json",
        });
        saveAs(jsonBlob, `invoice-${formData.invoiceNo || "data"}.json`);
      }

      // 2. Download PDF if selected
      if (downloadOptions.pdf) {
        const currencyDetails = currencyList.find(
          (currencyDetail) =>
            currencyDetail.value.toLowerCase() ===
            invoiceDetails.currency.toLowerCase()
        )?.details;

        const defaultCurrency = currencyList.find(
          (currencyDetail) =>
            currencyDetail.value.toLowerCase() === "INR".toLowerCase()
        )?.details;

        const data = await fetch(
          `/flag/1x1/${
            currencyDetails?.iconName || defaultCurrency?.iconName
          }.svg`
        );
        const svgFlag = await data.text();
        const countryImageUrl = await svgToDataUri(svgFlag);

        if (countryImageUrl) {
          const blob = await pdf(
            <Document>
              <Page size="A4" style={pdfContainers.page}>
                <PdfDetails
                  companyDetails={companyDetails}
                  invoiceDetails={invoiceDetails}
                  invoiceTerms={invoiceTerms}
                  paymentDetails={paymentDetails}
                  yourDetails={yourDetails}
                  countryImageUrl={countryImageUrl}
                />
              </Page>
            </Document>
          ).toBlob();
          saveAs(blob, `invoice-${invoiceTerms.invoiceNumber || "document"}.pdf`);
        }
      }

      setStatus("downloaded");
    } catch (e) {
      console.error(e);
      setStatus("not-downloaded");
    }
  };

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div className="max-w-md w-full">
        <h1 className="text-5xl font-semibold pb-6 text-center">Your invoice is ready</h1>
        <p className="text-neutral-500 text-xl pb-7 text-center">
          Please review the details carefully before downloading your invoice.
        </p>

        <div className="bg-neutral-50 p-6 rounded-xl border mb-8 space-y-4">
          <p className="font-medium text-neutral-700 pb-2 border-b">Download Options</p>
          
          <div className="flex items-center space-x-3 group">
            <Checkbox 
              id="pdf-option" 
              checked={downloadOptions.pdf} 
              onCheckedChange={(checked) => setDownloadOptions(prev => ({ ...prev, pdf: !!checked }))}
            />
            <div 
              className="grid gap-1.5 leading-none cursor-pointer flex-1" 
              onClick={() => setDownloadOptions(prev => ({ ...prev, pdf: !prev.pdf }))}
            >
              <label
                htmlFor="pdf-option"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                PDF Document
              </label>
              <p className="text-xs text-neutral-500">
                A professional PDF version of your invoice.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 group">
            <Checkbox 
              id="json-option" 
              checked={downloadOptions.json} 
              onCheckedChange={(checked) => setDownloadOptions(prev => ({ ...prev, json: !!checked }))}
            />
            <div 
              className="grid gap-1.5 leading-none cursor-pointer flex-1"
              onClick={() => setDownloadOptions(prev => ({ ...prev, json: !prev.json }))}
            >
              <label
                htmlFor="json-option"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                JSON Data (for Import)
              </label>
              <p className="text-xs text-neutral-500">
                Save the state to import and edit later.
              </p>
            </div>
          </div>
        </div>

        <Button
          disabled={status === "downloading" || (!downloadOptions.pdf && !downloadOptions.json)}
          onClick={handleDownload}
          type="button"
          className="w-full h-12 rounded-lg text-lg transition-all"
        >
          {status === "not-downloaded" && (
            <>
              <Download className="mr-2 h-6 w-6" /> 
              {downloadOptions.pdf && downloadOptions.json ? "Download All" : "Download Selected"}
            </>
          )}
          {status === "downloading" && (
            <>
              <LoaderIcon className="mr-2 h-6 w-6 animate-spin" />{" "}
              Processing...
            </>
          )}
          {status === "downloaded" && (
            <>
              <CheckCircle2 className="mr-2 h-6 w-6" /> Downloaded
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

Font.register({
  family: "Geist",
  fonts: [
    {
      src: "/font/Geist-Thin.ttf",
      fontWeight: "thin",
    },
    {
      src: "/font/Geist-Ultralight.ttf",
      fontWeight: "ultralight",
    },
    {
      src: "/font/Geist-Light.ttf",
      fontWeight: "light",
    },
    {
      src: "/font/Geist-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/font/Geist-Medium.ttf",
      fontWeight: "medium",
    },
    {
      src: "/font/Geist-SemiBold.ttf",
      fontWeight: "semibold",
    },
    {
      src: "/font/Geist-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/font/Geist-UltraBlack.ttf",
      fontWeight: "ultrabold",
    },
  ],
});
