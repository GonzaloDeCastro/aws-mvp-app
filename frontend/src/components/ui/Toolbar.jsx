export default function Toolbar({ children, className = "" }) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-[18px] border border-white/8 bg-white/[0.03] ${className}`}
    >
      {children}
    </div>
  );
}

export function ToolbarTitle({ kicker, title, className = "" }) {
  return (
    <div className={className}>
      {kicker && <div className="text-[11px] opacity-70">{kicker}</div>}
      {title && <h2 className="m-0 text-lg">{title}</h2>}
    </div>
  );
}

export function ToolbarActions({ children, className = "" }) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>{children}</div>
  );
}
