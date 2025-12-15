export default function SearchInput({
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-2.5 py-2 rounded-lg border border-white/30 bg-[rgba(0,0,0,0.22)] text-[#e8eefc] outline-none text-sm min-w-[220px] placeholder:text-white/50 ${className}`}
      {...props}
    />
  );
}
