const ObjectControl = () => {
  return (
    <div className="w-min py-[10px] rounded-[10px] m-4 bg-zinc-900 text-gray-400 flex flex-col gap-[6px] font-mono text-[11px]">
      <div className="flex items-center w-[260px] h-[24px] px-[10px]">
        <label>args</label>
        <div className="flex items-center w-[160px] ml-auto bg-gray-700 rounded-[3px]">
          <span className="w-[12px] text-center select-none text-gray-500">
            x
          </span>
          <input
            className="h-[24px] grow text-gray-400 text-right pr-[6px] bg-transparent outline-none"
            type="number"
            step="0.1"
            value="10.5"
          />
        </div>
      </div>

      <div className="flex items-center w-[260px] h-[24px] px-[10px]">
        <label>args</label>
        <div className="flex gap-[6px] items-center w-[160px] ml-auto">
          <div className="flex grow basis-0 min-w-0 items-center bg-gray-700 rounded-[3px]">
            <span className="w-[12px] shrink-0 text-center select-none text-gray-500 ">
              x
            </span>
            <input
              className="h-[24px] min-w-0 text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="number"
              step="0.1"
              value="10.5"
            />
          </div>
          <div className="flex grow basis-0 min-w-0 items-center bg-gray-700 rounded-[3px]">
            <span className="w-[12px] shrink-0 text-center select-none text-gray-500 ">
              x
            </span>
            <input
              className="h-[24px] min-w-0 text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="number"
              step="0.1"
              value="10.5"
            />
          </div>
          <div className="flex grow basis-0 min-w-0 items-center bg-gray-700 rounded-[3px]">
            <span className="w-[12px] shrink-0 text-center select-none text-gray-500 ">
              x
            </span>
            <input
              className="h-[24px] min-w-0 text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="number"
              step="0.1"
              value="10.5"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center w-[260px] h-[24px] px-[10px]">
        <label>args</label>
        <div className="flex gap-[6px] items-center w-[160px] ml-auto">
          <div className="flex grow basis-0 min-w-0 items-center bg-gray-700 rounded-[3px]">
            <span className="w-[12px] shrink-0 text-center select-none text-gray-500 ">
              x
            </span>
            <input
              className="h-[24px] min-w-0 text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="number"
              step="0.1"
              value="10.5"
            />
          </div>
          <div className="flex grow basis-0 min-w-0 items-center bg-gray-700 rounded-[3px]">
            <span className="w-[12px] shrink-0 text-center select-none text-gray-500 ">
              x
            </span>
            <input
              className="h-[24px] min-w-0 text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="number"
              step="0.1"
              value="10.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectControl;

/**
 <span className="w-[12px] text-center select-none text-gray-500 outline outline-1 outline-green-400">
              x
            </span>
            <input
              className="h-[24px] p-0 grow text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="number"
              step="0.1"
              value="10.5"
            />
          </div>
          <div className="flex grow basis-0 items-center bg-gray-700  rounded-[3px]">
            <span className="w-[12px] text-center select-none text-gray-500 outline outline-1 outline-green-400">
              x
            </span>
            <input
              className="h-[24px] p-0 grow text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="number"
              step="0.1"
              value="10.5"
            />
          </div>
          <div className="flex grow basis-0items-center bg-gray-700  rounded-[3px]">
            <span className="w-[12px] text-center select-none text-gray-500 outline outline-1 outline-green-400">
              x
            </span>
            <input
              className="h-[24px] p-0 grow text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="number"
              step="0.1"
              value="10.5"
            />
          </div>
 */
