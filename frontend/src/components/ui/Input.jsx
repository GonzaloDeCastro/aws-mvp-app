export default function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  size = "md",
  ...props
}) {
  const sizeClasses = {
    sm: "px-2.5 py-1.5 text-sm",
    md: "px-3 py-2.5 text-sm",
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-xl border border-white/12 bg-[rgba(0,0,0,0.22)] text-[#e8eefc] outline-none placeholder:text-white/50 ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}
