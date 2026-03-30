"use client";

import DemoPreview from "@/app/(landing)/components/demoPreview";
import { ArrowRight, Download, Github, Linkedin, Sparkles, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featureTiles = [
  {
    title: "Fast Throughput",
    body: "Move from blank page to shareable invoice in minutes with a guided workflow.",
  },
  {
    title: "No-Limit Usage",
    body: "Generate as many drafts as you need without gated templates or hidden paywalls.",
  },
  {
    title: "Reliable Delivery",
    body: "Export polished PDFs with payment details that are clear for every client.",
  },
  {
    title: "Open and Extendable",
    body: "Use the project as-is or adapt the source to your own billing process.",
  },
];

const Home = () => {
  return (
    <main className="surface min-h-screen overflow-x-hidden text-[color:var(--on-background)]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-[#e6ebff] blur-3xl" />
        <div className="absolute right-0 top-60 h-80 w-80 rounded-full bg-[#e3e9fb] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-6 md:px-8 md:pb-24">
        <header className="glass-panel ambient-shadow sticky top-4 z-30 mb-14 rounded-2xl px-5 py-3 md:px-7 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/pranav.png"
                width={36}
                height={36}
                alt="Streakdash logo"
                className="rounded-[0.5rem]"
              />
              <div>
                <p className="editorial-label">Invoice Studio</p>
                <p className="text-sm font-medium text-[color:var(--on-surface)]">By Streakdash</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/nidhie/invoice-generator"
                className="surface-high inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium text-[color:var(--on-surface)] hover:bg-[color:var(--surface-container-highest)]"
              >
                <Github className="h-4 w-4" /> Code
              </a>
              <Link
                href="/new"
                className="primary-carbon inline-flex h-10 items-center gap-2 rounded-md px-4 text-sm font-medium hover:brightness-110"
              >
                New Invoice
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <section className="editorial-enter mb-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="editorial-label mb-6">Digital Gallery Billing</p>
            <h1 className="editorial-display max-w-2xl text-balance">
              Build client-ready invoices in an editorial workspace.
            </h1>
            <p className="editorial-body mt-8 max-w-xl">
              A minimalist invoice generator designed for clarity, tonal depth, and momentum.
              Focus on your terms and pricing while the layout stays premium and readable.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/new"
                className="primary-carbon inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold"
              >
                Generate Invoice
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/nidhie/invoice-generator"
                className="surface-high inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-[color:var(--on-surface)] hover:bg-[color:var(--surface-container-highest)]"
              >
                <Github className="h-4 w-4" />
                View Source
              </a>
            </div>
          </div>

          <div className="surface-low rounded-2xl p-6 md:p-8">
            <p className="editorial-label">At a Glance</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="surface-lowest rounded-xl p-5">
                <p className="editorial-label">Trusted By</p>
                <p className="editorial-headline mt-2">200+</p>
                <p className="editorial-body">Active creators and freelancers</p>
              </div>
              <div className="surface-lowest rounded-xl p-5">
                <p className="editorial-label">Documents</p>
                <p className="editorial-headline mt-2">400+</p>
                <p className="editorial-body">Invoices exported so far</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="editorial-label">Perspective Grid</p>
              <h2 className="editorial-headline mt-2">Built to feel curated, not boxed in.</h2>
            </div>
            <p className="editorial-body hidden max-w-sm text-right md:block">
              An asymmetric 2/1 split creates visual rhythm and keeps your hero document in focus.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_1fr_1.2fr]">
            <article className="surface-low rounded-2xl p-6">
              <Sparkles className="mb-4 h-5 w-5 text-[color:var(--on-surface-variant)]" />
              <p className="editorial-title mb-2">Intentional Tone</p>
              <p className="editorial-body">
                Sections are defined through tonal shifts, not hard separators, so content feels calm
                and premium.
              </p>
            </article>

            <article className="surface-low rounded-2xl p-6">
              <Download className="mb-4 h-5 w-5 text-[color:var(--on-surface-variant)]" />
              <p className="editorial-title mb-2">PDF Ready Output</p>
              <p className="editorial-body">
                Generate high-readability invoices with payment sections and totals that stay easy to
                scan.
              </p>
            </article>

            <article className="surface-low rounded-2xl p-4 md:p-6">
              <div className="surface-lowest rounded-xl p-2 md:p-3">
                <DemoPreview />
              </div>
            </article>
          </div>
        </section>

        <section className="surface-low mb-16 rounded-2xl p-6 md:p-8">
          <p className="editorial-label mb-3">Why Teams Keep It</p>
          <h2 className="editorial-headline mb-8 max-w-2xl">
            A restrained system that puts invoices first and UI chrome second.
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {featureTiles.map((tile) => (
              <article key={tile.title} className="surface-lowest rounded-xl p-6">
                <p className="editorial-title">{tile.title}</p>
                <p className="editorial-body mt-2">{tile.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="surface-lowest ambient-shadow rounded-2xl p-8 md:p-10">
          <p className="editorial-label">Ready to Start</p>
          <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h3 className="editorial-headline max-w-2xl">
              Stop formatting documents manually. Create and send your next invoice from a single
              clean workspace.
            </h3>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link
                href="/new"
                className="primary-carbon inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold"
              >
                Open Builder
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-3 text-[color:var(--on-surface-variant)]">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/nidhie/invoice-generator"
                  className="surface-high inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-[color:var(--surface-container-highest)]"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/nidhie/"
                  className="surface-high inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-[color:var(--surface-container-highest)]"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/nidhie"
                  className="surface-high inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-[color:var(--surface-container-highest)]"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
