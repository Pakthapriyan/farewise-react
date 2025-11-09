export default function Button1({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded text-white shadow ${className}`}
    >
      {children}
    </button>
  );
}

