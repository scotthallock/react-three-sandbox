import { useState } from 'react';

const InputColor = ({ label, value, handleChange, handleBlur }) => {
  const [colorString, setColorString] = useState(value || '#fb923c');

  return (
    <div className="flex items-center w-[260px] h-[24px] px-[10px]">
      <label>{label || 'color'}</label>
      <div className="flex gap-[6px] items-center w-[160px] ml-auto">
        <div className="h-[24px] w-[24px] rounded-[3px] flex items-center justify-center overflow-hidden">
          <input
            className="h-[36px] w-[36px] shrink-0"
            type="color"
            value={value || '#fb923c'}
            onChange={(e) => {
              handleChange(e);
              setColorString(e.target.value);
            }}
          />
        </div>
        <div className="flex grow basis-0 min-w-0 items-center bg-gray-700 rounded-[3px] focus-within:outline focus-within:outline-1 focus-within:outline-emerald-500">
          <input
            className="h-[24px] min-w-0 text-gray-400 text-right pr-[6px] bg-transparent outline-none"
            type="text"
            value={colorString}
            onChange={(e) => setColorString(e.target.value)}
            onBlur={() => handleBlur(colorString)}
            onKeyDown={(e) => (e.key === 'Enter' ? e.target.blur() : null)}
          />
        </div>
      </div>
    </div>
  );
};

export default InputColor;
