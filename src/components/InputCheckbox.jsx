const InputCheckbox = ({ label, checked = false, handleChange }) => {
  return (
    <div className="flex items-center w-[260px] min-h-[24px] px-[10px]">
      <label>{label || '?'}</label>
      <div className="flex gap-[6px] w-[160px] ml-auto">
        <div className="w-[16px] h-[16px] bg-gray-700 rounded-[3px] overflow-hidden">
          <input
            className="w-full h-full accent-emerald-500 rounded-[3px] opacity-0 checked:opacity-100 cursor-pointer"
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InputCheckbox;
