/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Image, Text, View } from "@react-pdf/renderer";
import { currencyList } from "@/lib/currency";
import { buildUpiPaymentUri, getUpiQrCodeUrl } from "@/lib/payment";
import { pdfTypography, pdfUtils } from "@/lib/pdfStyles";

interface PaymentDetailsPdfProps extends PaymentDetails {
  countryImageUrl: string;
}

export const PaymentDetailsPdf: React.FC<PaymentDetailsPdfProps> = ({
  paymentMethod,
  bankName,
  accountNumber,
  accountName,
  routingCode,
  swiftCode,
  ifscCode,
  upiId,
  payableAmount,
  currency = "INR",
  countryImageUrl,
}) => {
  const selectedPaymentMethod = paymentMethod === "upi" ? "upi" : "bank";
  const currencyDetails = currencyList.find(
    (currencyDetail) =>
      currencyDetail.value.toLowerCase() === currency.toLowerCase()
  )?.details;

  const amountToPay = typeof payableAmount === "number" ? payableAmount : 0;
  const upiPaymentUri = buildUpiPaymentUri({
    upiId,
    payeeName: accountName,
    amount: amountToPay,
    currency,
  });
  const upiQrCodeUrl = upiPaymentUri ? getUpiQrCodeUrl(upiPaymentUri, 220) : null;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingLeft: 40,
          paddingRight: 12,
          paddingVertical: 16,
          flexDirection: "column",
        }}
      >
        <Text style={{ paddingBottom: 12, ...pdfTypography.title }}>
          {selectedPaymentMethod === "upi" ? "UPI Details" : "Bank Details"}
        </Text>
        <View style={{ flexDirection: "column", gap: 5 }}>
          {selectedPaymentMethod === "bank" ? (
            <>
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={pdfTypography.paymentTitle}>Bank Name</Text>
                <Text
                  style={{
                    flex: 1,
                    ...pdfTypography.itemDescription,
                    paddingLeft: 44.5,
                  }}
                >
                  {bankName ? bankName : "-"}
                </Text>
              </View>
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={pdfTypography.paymentTitle}>Account Number</Text>
                <Text
                  style={{
                    flex: 1,
                    ...pdfTypography.itemDescription,
                    paddingLeft: 14,
                  }}
                >
                  {accountNumber ? accountNumber : "-"}
                </Text>
              </View>
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={pdfTypography.paymentTitle}>Account Name</Text>
                <Text
                  style={{
                    flex: 1,
                    ...pdfTypography.itemDescription,
                    paddingLeft: 26,
                  }}
                >
                  {accountName ? accountName : "-"}
                </Text>
              </View>
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={pdfTypography.paymentTitle}>Swift Code</Text>
                <Text
                  style={{
                    flex: 1,
                    ...pdfTypography.itemDescription,
                    paddingLeft: 45,
                  }}
                >
                  {swiftCode ? swiftCode : "-"}
                </Text>
              </View>
              {ifscCode ? (
                <View style={pdfUtils.flexRowItemCenter}>
                  <Text style={pdfTypography.paymentTitle}>IFSC Code</Text>
                  <Text
                    style={{
                      flex: 1,
                      ...pdfTypography.itemDescription,
                      paddingLeft: 48,
                    }}
                  >
                    {ifscCode}
                  </Text>
                </View>
              ) : undefined}
              {routingCode ? (
                <View style={pdfUtils.flexRowItemCenter}>
                  <Text style={pdfTypography.paymentTitle}>Routing Code</Text>
                  <Text
                    style={{
                      flex: 1,
                      ...pdfTypography.itemDescription,
                      paddingLeft: 32,
                    }}
                  >
                    {routingCode}
                  </Text>
                </View>
              ) : undefined}
            </>
          ) : (
            <>
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={pdfTypography.paymentTitle}>UPI ID</Text>
                <Text
                  style={{
                    flex: 1,
                    ...pdfTypography.itemDescription,
                    paddingLeft: 60,
                  }}
                >
                  {upiId || "-"}
                </Text>
              </View>
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={pdfTypography.paymentTitle}>Payee Name</Text>
                <Text
                  style={{
                    flex: 1,
                    ...pdfTypography.itemDescription,
                    paddingLeft: 31,
                  }}
                >
                  {accountName || "-"}
                </Text>
              </View>
              <View style={pdfUtils.flexRowItemCenter}>
                <Text style={pdfTypography.paymentTitle}>Amount</Text>
                <Text
                  style={{
                    flex: 1,
                    ...pdfTypography.itemDescription,
                    paddingLeft: 60,
                  }}
                >
                  {currencyDetails?.currencySymbol || ""}
                  {amountToPay.toFixed(2)}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingLeft: 40,
          paddingRight: 12,
          paddingVertical: 16,
          flexDirection: "column",
        }}
      >
        <Text style={{ ...pdfTypography.title, paddingBottom: 12 }}>
          {selectedPaymentMethod === "upi" ? "Scan & Pay" : "Payable in"}
        </Text>
        {selectedPaymentMethod === "bank" ? (
          currencyDetails && (
            <View style={{ ...pdfUtils.flexRowItemCenter, gap: 8 }}>
              <Image
                src={countryImageUrl}
                style={{
                  width: 30,
                  height: 30,
                  flexShrink: 0,
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
              />
              <View>
                <Text style={{ fontSize: 14, fontWeight: "medium" }}>
                  {currencyDetails.currencyName}
                </Text>
                <Text style={pdfTypography.title}>
                  {currencyDetails.currencySymbol} {currencyDetails.currencyShortForm}
                </Text>
              </View>
            </View>
          )
        ) : upiQrCodeUrl ? (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Image
              src={upiQrCodeUrl}
              style={{
                width: 110,
                height: 110,
                objectFit: "cover",
              }}
            />
            <Text style={pdfTypography.title}>Use any UPI app to scan</Text>
          </View>
        ) : (
          <View
            style={{
              border: "1px dashed #d1d5db",
              minHeight: 70,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text style={pdfTypography.title}>Add UPI ID to generate QR</Text>
          </View>
        )}
      </View>
    </View>
  );
};
