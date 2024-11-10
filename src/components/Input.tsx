export default function Input({
  labelName,
  right,
  error,
  ...props
}: {
  labelName: string;
  right?: React.ReactNode;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col min-h-20 space-y-2">
      <label htmlFor={props.name} className="text-lg font-medium text-gray-700">
        {labelName}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center space-x-2">
        <input
          className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          {...props}
        />
        {right && <div className="flex-shrink-0">{right}</div>}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1 pointer-events-none select-none">{error}</p>
      )}
    </div>
  );
}