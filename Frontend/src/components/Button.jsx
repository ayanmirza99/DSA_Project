export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const base = "px-5 py-2 rounded-xl font-semibold shadow-sm transition";
  const styles =
    variant === "primary"
      ? base + " bg-indigo-500 text-white hover:bg-indigo-600"
      : base + " bg-white border border-gray-200 text-gray-700 hover:shadow-md";

  return (
    <button className={`${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}
