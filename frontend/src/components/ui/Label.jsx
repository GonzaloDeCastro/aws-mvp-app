export default function Label({ children, className = "" }) {
  return (
    <label className={`block text-xs opacity-75 mb-1 ${className}`}>
      {children}
    </label>
  );
}
