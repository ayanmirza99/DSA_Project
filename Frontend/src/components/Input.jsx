export default function Input({ label, ...props }) {
  return (
    <label className="block text-sm">
      <div className="text-xs text-gray-600 mb-1">{label}</div>
      <input
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        {...props}
      />
    </label>
  );
}
