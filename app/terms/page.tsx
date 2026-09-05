import { Reveal } from "@/components/Reveal";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8" dir="ltr">
      <Reveal>
        <p className="eyebrow text-right" dir="rtl">
          الشروط والأحكام
        </p>
        <h1 className="mt-3 text-[34px] font-bold text-left">Terms &amp; Conditions</h1>
      </Reveal>

      <Reveal delay={100}>
        <section className="mt-12">
          <h2 className="text-[22px] font-bold">The Purchase Orders</h2>
          <div className="t-soft mt-4 flex flex-col gap-4 text-[14.5px] leading-8 text-left">
            <p>
              The purchase orders shall be subject to our acceptance, which we may withhold at our
              discretion for reasons such as inability to confirm payment permission, suspicion of
              fraud or restrictions on shipping and availability of the inventory.
            </p>
            <p>
              When you complete your process of purchase and choose to pay on delivery, we shall
              send you a text message or call to confirm your order and the order details and the
              Deposit payment before accept it.
            </p>
            <p>
              If the order is not confirmed or the deposit not paid within (3) days of receiving
              the message or the phone call, the order shall be cancelled.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal delay={150}>
        <section className="mt-12">
          <h2 className="text-[22px] font-bold">The Payment</h2>
          <div className="t-soft mt-4 flex flex-col gap-3 text-[14.5px] leading-8 text-left">
            <p>We currently accept the following payment modes upon registering purchase orders on our website:</p>
            <ul className="flex flex-col gap-2">
              <li>- Cash on Delivery (only inside Qatar orders)</li>
              <li>- Bank Transfer</li>
            </ul>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
