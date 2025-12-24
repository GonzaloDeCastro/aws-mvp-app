export default function Select({
  value,
  onChange,
  children,
  className = "",
  ...props
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`rounded-lg border border-white/30 bg-[rgba(0,0,0,0.22)] px-3 py-2 text-sm text-[#e8eefc] outline-none ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
