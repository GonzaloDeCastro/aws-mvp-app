export function InfoAlert({ children, className = "" }) {
  return (
    <div
      className={`p-3 rounded-[14px] border border-white/8 bg-black/30 ${className}`}
    >
      {children}
    </div>
  );
}

export function ErrorAlert({ children, className = "" }) {
  return (
    <div
      className={`p-3 rounded-[14px] border border-[rgba(255,80,80,0.25)] bg-[rgba(255,80,80,0.08)] text-[#ffd4d4] ${className}`}
    >
      {children}
    </div>
  );
}
