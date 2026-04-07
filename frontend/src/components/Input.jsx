export function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-2.5 text-gray-300" size={18} />
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border border-white/20"
      />
    </div>
  );
}