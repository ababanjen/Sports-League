const ArrowDown: React.FC<{ className: string }> = ({ className }) => (
  <svg
    className={`inline-block w-4 h-4 ml-2 -mt-1 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default ArrowDown;
