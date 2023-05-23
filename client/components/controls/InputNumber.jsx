const InputNumber = ({ label, symbol, step, value, handleChange }) => {
  return (
    <div className="flex items-center w-[260px] h-[24px] px-[10px]">
      <label>{label || '?'}</label>
      <div className="flex items-center w-[160px] ml-auto bg-gray-700 rounded-[3px] focus-within:outline focus-within:outline-1 focus-within:outline-emerald-500">
        <span className="w-[12px] text-center select-none text-gray-500">
          {symbol}
        </span>
        <input
          className="h-[24px] grow text-gray-400 text-right pr-[6px] bg-transparent outline-none"
          type="number"
          step={step || 0.1}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InputNumber;
