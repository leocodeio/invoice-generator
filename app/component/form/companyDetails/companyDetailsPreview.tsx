/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

export const CompanyDetailsPreview: React.FC<CompanyDetails> = ({
  email,
  companyName,
  companyAddress,
  companyCity,
  companyState,
  companyCountry,
  companyLogo,
  companyTaxId,
  companyZip,
}) => (
  <div>
    <p className="editorial-label pb-3.5">
      To
    </p>
    <div className="h-10 mb-3">
      {companyLogo ? (
        <img src={companyLogo} alt="Company Logo" className="h-10 rounded-md" />
      ) : (
        <div className="h-10 w-10 animate-pulse rounded-full bg-[color:var(--surface-container-high)]" />
      )}
    </div>
    {companyName ? (
      <p className="text-2xl font-medium text-[color:var(--on-surface)]">{companyName}</p>
    ) : (
      <div className="mb-4 h-5 w-5/6 animate-pulse rounded-md bg-[color:var(--surface-container-high)]" />
    )}
    {email ? (
      <p className="mb-3 text-sm text-[color:var(--on-surface-variant)]">{email}</p>
    ) : (
      <div className="my-2 h-4 w-4/6 animate-pulse rounded-md bg-[color:var(--surface-container-high)]" />
    )}
    <div className="text-xs text-[color:var(--on-surface-variant)]">
      {companyAddress ? (
        <p>{companyAddress}</p>
      ) : (
        <div className="my-2 h-4 w-3/6 animate-pulse rounded-md bg-[color:var(--surface-container-high)]" />
      )}
      {companyAddress || companyState || companyZip ? (
        <p className="mb-0.5">
          {companyCity}, {companyState} {companyZip}
        </p>
      ) : (
        <div className="my-3 h-4 w-4/6 animate-pulse rounded-md bg-[color:var(--surface-container-high)]" />
      )}
      {companyCountry ? (
        <p className="mb-1">{companyCountry}</p>
      ) : (
        <div className="my-2 h-4 w-3/6 animate-pulse rounded-md bg-[color:var(--surface-container-high)]" />
      )}
      {companyTaxId && <p>Tax ID:{companyTaxId}</p>}
    </div>
  </div>
);
