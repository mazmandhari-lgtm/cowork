export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      <span className="page-veil" aria-hidden="true" />
      {children}
    </div>
  );
}
