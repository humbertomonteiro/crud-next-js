export default function Input({ ...rest }) {
  return (
    <input
      className={`h-8 rounded-sm border-0 p-2 w-2/3 mb-4 bg-slate-800`}
      {...rest}
    />
  );
}
