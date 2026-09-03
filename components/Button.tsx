import Link from "next/link";

type BaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200",
  secondary:
    "bg-neutral-100 text-neutral-950 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
  ghost:
    "border border-neutral-300 text-neutral-950 hover:border-neutral-950 dark:border-neutral-700 dark:text-white dark:hover:border-white",
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-300 active:scale-[0.97]";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}
