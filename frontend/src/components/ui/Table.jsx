export default function Table({ children, className = "" }) {
  return (
    <div
      className={`rounded-[18px] border border-white/8 bg-white/[0.03] overflow-hidden ${className}`}
    >
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function TableHeader({ children, className = "" }) {
  return (
    <thead className={className}>
      <tr>{children}</tr>
    </thead>
  );
}

export function TableHeaderCell({ children, className = "" }) {
  return (
    <th
      className={`text-left text-xs opacity-80 py-3 px-3 border-b border-white/8 ${className}`}
    >
      {children}
    </th>
  );
}

export function TableBody({ children, className = "" }) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className = "", onClick }) {
  return (
    <tr
      className={`${
        onClick ? "cursor-pointer hover:bg-white/[0.02]" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className = "" }) {
  return (
    <td className={`py-3 px-3 border-b border-white/6 text-sm ${className}`}>
      {children}
    </td>
  );
}
