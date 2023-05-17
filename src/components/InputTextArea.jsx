const InputTextArea = ({ label, value, handleChange }) => {
  return (
    <div className="flex items-center w-[260px] min-h-[24px] px-[10px]">
      <label>{label || 'text'}</label>
      <div className="flex gap-[6px] items-center w-[160px] ml-auto">
        <textarea
          className="min-h-[24px] p-[6px] grow self-start bg-gray-700 overflow-hidden rounded-[3px] border-none outline-offset-0 focus:outline focus:outline-1 focus:outline-emerald-500"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default InputTextArea;
