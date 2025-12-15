export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[18px] border border-white/8 bg-white/[0.03] p-4 ${className}`}
    >
      {children}
    </div>
  );
}
