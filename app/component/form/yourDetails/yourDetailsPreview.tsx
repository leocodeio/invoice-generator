/* eslint-disable @next/next/no-img-element */
import React from "react";

export const YourDetailsPreview: React.FC<YourDetails> = ({
  yourEmail,
  yourName,
  yourAddress,
  yourCity,
  yourState,
  yourCountry,
  yourLogo,
  yourTaxId,
  yourZip,
}) => (
  <div>
    <p className="editorial-label pb-3.5">
      From
    </p>
    <div className="h-10 mb-3">
      {yourLogo ? (
        <img src={yourLogo} alt="Company Logo" className="h-10 rounded-md" />
      ) : (
        <div className="h-10 w-10 animate-pulse rounded-full bg-[color:var(--surface-container-high)]" />
      )}
    </div>
    {yourName ? (
      <p className="text-2xl font-medium text-[color:var(--on-surface)]">{yourName}</p>
    ) : (
      <div className="mb-4 h-5 w-5/6 animate-pulse rounded-md bg-[color:var(--surface-container-high)]" />
    )}
    {yourEmail ? (
      <p className="mb-3 text-sm text-[color:var(--on-surface-variant)]">{yourEmail}</p>
    ) : (
      <div className="my-2 h-4 w-4/6 animate-pulse rounded-md bg-[color:var(--surface-container-high)]" />
    )}
    <div className="text-xs text-[color:var(--on-surface-variant)]">
      {yourAddress ? (
        <p>{yourAddress}</p>
      ) : (
        <div className="my-2 h-4 w-3/6 animate-pulse rounded-md bg-[color:var(--surface-container-high)]" />
      )}
      {yourAddress || yourState || yourZip ? (
        <p className="mb-0.5">
          {yourCity}, {yourState} {yourZip}
        </p>
      ) : (
        <div className="my-3 h-4 w-4/6 animate-pulse rounded-md bg-[color:var(--surface-container-high)]" />
      )}
      {yourCountry ? (
        <p className="mb-1">{yourCountry}</p>
      ) : (
        <div className="my-2 h-4 w-3/6 animate-pulse rounded-md bg-[color:var(--surface-container-high)]" />
      )}
      {yourTaxId && <p>Tax ID:{yourTaxId}</p>}
    </div>
  </div>
);
