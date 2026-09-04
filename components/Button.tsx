import Link from "next/link";

type Variant = "primary" | "ghost" | "gold";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
  gold: "btn-gold",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={`btn ${variants[variant]} ${className ?? ""}`}>
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
    <button className={`btn ${variants[variant]} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}
