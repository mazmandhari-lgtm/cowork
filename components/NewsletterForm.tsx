"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="mt-6 text-[14px] font-semibold">شكرًا لاشتراكك! ترقّبي أحدث أخبارنا قريبًا.</p>
    );
  }

  return (
    <form
      className="mx-auto mt-5 flex max-w-sm items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input type="email" required placeholder="بريدك الإلكتروني" className="input input-pill flex-1" />
      <button type="submit" className="btn btn-primary">
        اشتراك
      </button>
    </form>
  );
}
