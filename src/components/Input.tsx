export default function Input({
  labelName
  ,right,error, ...props
}: {
      labelName: string,
      right?: React.ReactNode,
      error?: string,
  }
  & React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <div className="flex flex-col min-h-20">
      <label htmlFor={props.name} className="text-lg">
        {labelName}
      </label>
      <div className="flex space-x-2">
        <input
          className='border-b-2 border-black'
          {...props}
        />
        {right}
      </div>
      {error && <p className="text-red-500 pointer-events-none select-none ">{error}</p>}
    </div>
  );
}


{/* <Input right={<button type="button" className=''> 중복확인 </button>} /> */}