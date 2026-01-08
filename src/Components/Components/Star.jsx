export default function Star({ filled, onClick }) {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "gold" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5 cursor-pointer transition-colors text-yellow-400"
    >
      <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8" />
    </svg>
  );
}
