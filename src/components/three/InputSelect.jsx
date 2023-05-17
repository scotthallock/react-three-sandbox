const InputSelect = ({ label, value, options, handleChange }) => {
  return (
    <div className="flex items-center w-[260px] min-h-[24px] px-[10px]">
      <label>{label || '?'}</label>
      <div className="flex gap-[6px] items-center w-[160px] ml-auto">
        <select
          className="grow min-w-0 h-[24px] pl-[6px] bg-gray-700 rounded-[3px] outline-none"
          value={value}
          onChange={handleChange}
        >
          {options.map((option, i) => (
            <option key={`${label}_${i}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputSelect;
