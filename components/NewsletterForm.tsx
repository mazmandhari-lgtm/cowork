"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="mx-auto mt-6 max-w-sm text-[14px] font-medium text-neutral-700 dark:text-neutral-200">
        شكرًا لاشتراكك! ترقّبي أحدث أخبارنا قريبًا.
      </p>
    );
  }

  return (
    <form
      className="mx-auto mt-6 flex max-w-sm items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        placeholder="بريدك الإلكتروني"
        className="h-12 flex-1 rounded-full border border-neutral-300 bg-white px-5 text-[14px] outline-none transition-colors focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:border-white"
      />
      <button
        type="submit"
        className="h-12 rounded-full bg-neutral-950 px-6 text-[14px] font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
      >
        اشتراك
      </button>
    </form>
  );
}
