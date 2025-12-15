export function PrimaryButton({ children, onClick, disabled, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl border border-white/12 bg-[rgba(120,160,255,0.22)] px-3 py-2.5 text-sm font-bold text-[#e8eefc] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  disabled,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl border border-white/12 bg-white/[0.06] px-3 py-2.5 text-sm font-semibold text-[#e8eefc] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function DangerButton({ children, onClick, disabled, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-[10px] border border-[rgba(255,100,100,0.6)] bg-[rgba(255,100,100,0.1)] px-2.5 py-1.5 text-xs text-[#ffaaaa] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
