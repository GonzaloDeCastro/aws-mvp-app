export default function Modal({
  open,
  onClose,
  children,
  className = "",
  wide = false,
}) {
  if (!open) return null;

  const maxWidth = wide ? "max-w-[800px]" : "max-w-[520px]";

  return (
    <div
      className="fixed inset-0 bg-black/55 grid place-items-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} rounded-[18px] border border-white/20 bg-[#0b1220] p-4 text-[#e8eefc] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
