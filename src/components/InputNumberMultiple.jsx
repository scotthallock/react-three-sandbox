const InputNumberMultiple = ({
  label,
  step,
  symbols,
  values,
  handleChanges,
}) => {
  return (
    <div className="flex items-center w-[260px] h-[24px] px-[10px]">
      <label>{label || '?'}</label>
      <div className="flex gap-[6px] items-center w-[160px] ml-auto">
        {values.map((_, i) => (
          <div
            key={`${label}_${i}`}
            className="flex grow basis-0 min-w-0 items-center bg-gray-700 rounded-[3px] focus-within:outline focus-within:outline-1 focus-within:outline-emerald-500"
          >
            <span className="w-[12px] shrink-0 text-center select-none text-gray-500 ">
              {symbols[i]}
            </span>
            <input
              className="h-[24px] min-w-0 text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="number"
              step={step || 0.1}
              value={values[i]}
              onChange={handleChanges[i]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputNumberMultiple;
