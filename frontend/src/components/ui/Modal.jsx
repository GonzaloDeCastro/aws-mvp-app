export default function Modal({ open, onClose, children, className = "" }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/55 grid place-items-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className={`w-full max-w-[520px] rounded-[18px] border border-white/20 bg-[#0b1220] p-4 text-[#e8eefc] ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
