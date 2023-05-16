import { useState } from 'react';

const ObjectControl = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState('beeg circle');

  if (collapsed) {
    return (
      <div
        className="w-[24px] h-[280px] py-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] m-4 gap-[6px] flex justify-center rounded-[10px] cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="[writing-mode:vertical-lr] [text-orientation:mixed] whitespace-nowrap truncate">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className="w-min py-[10px] rounded-[10px] m-4 bg-zinc-900 text-gray-400 font-mono text-[11px] flex flex-col gap-[6px] ">
      <div className="flex items-center w-[260px] min-h-[24px] px-[10px]">
        <label>name</label>
        <div className="flex gap-[6px] items-center w-[160px] ml-auto">
          <input
            className="h-[24px] p-[6px] grow self-start bg-gray-700 overflow-hidden rounded-[3px] border-none outline-offset-0 focus:outline focus:outline-1 focus:outline-cyan-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

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
        <label>position</label>
        <div className="flex gap-[6px] items-center w-[160px] ml-auto">
          <div className="flex grow basis-0 min-w-0 items-center bg-gray-700 rounded-[3px] focus-within:outline focus-within:outline-1 focus-within:outline-cyan-500">
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
              y
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
              z
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
            <span className="w-[12px] shrink-0 text-center select-none text-gray-500">
              s
            </span>
            <input
              className="h-[24px] min-w-0 text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="number"
              step="0.1"
              value="10.5"
            />
          </div>
          <div className="flex grow basis-0 min-w-0 items-center bg-gray-700 rounded-[3px]">
            <span className="w-[12px] shrink-0 text-center select-none text-gray-500">
              a
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
        <label>color</label>
        <div className="flex gap-[6px] items-center w-[160px] ml-auto">
          <div className="h-[24px] w-[24px] bg-red-600 rounded-[3px] flex items-center justify-center overflow-hidden">
            <input className="h-[36px] w-[36px] shrink-0" type="color" />
          </div>
          <div className="flex grow basis-0 min-w-0 items-center bg-gray-700 rounded-[3px]">
            <input
              className="h-[24px] min-w-0 text-gray-400 text-right pr-[6px] bg-transparent outline-none"
              type="text"
              step="0.1"
              value="10.5"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center w-[260px] min-h-[24px] px-[10px]">
        <label>textarea</label>
        <div className="flex gap-[6px] items-center w-[160px] ml-auto">
          <textarea
            className="min-h-[24px] p-[6px] grow self-start bg-gray-700 overflow-hidden rounded-[3px] border-none outline-offset-0 focus:outline focus:outline-1 focus:outline-cyan-500"
            value={`hey what's up hello
there are multiple lines`}
          />
        </div>
      </div>

      <div className="flex items-center w-[260px] min-h-[24px] px-[10px]">
        <label>wireframe</label>
        <div className="flex gap-[6px] w-[160px] ml-auto">
          <div className="w-[16px] h-[16px] bg-gray-700 rounded-[3px] overflow-hidden">
            <input
              className="w-full h-full accent-cyan-500  rounded-[3px] opacity-0 checked:opacity-100 cursor-pointer"
              type="checkbox"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center w-[260px] min-h-[24px] px-[10px]">
        <label>material</label>
        <div className="flex gap-[6px] items-center w-[160px] ml-auto">
          <select className="grow min-w-0 h-[24px] pl-[6px] bg-gray-700 rounded-[3px] outline-none">
            <option value="Normal">Normal</option>
            <option value="Basic">Basic</option>
            <option value="Phong">Phong</option>
          </select>
        </div>
      </div>

      <div className="flex items-center w-[260px] min-h-[24px] px-[10px] gap-[6px]">
        <button
          className="grow h-[24px] bg-emerald-700 text-white rounded-[3px]"
          onClick={() => setCollapsed(!collapsed)}
        >
          {'< collapse'}
        </button>
        <button className="grow h-[24px] bg-emerald-700 text-white rounded-[3px]">
          duplicate
        </button>
        <button className="grow h-[24px] bg-transparent text-red-500 rounded-[3px]">
          delete
        </button>
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
