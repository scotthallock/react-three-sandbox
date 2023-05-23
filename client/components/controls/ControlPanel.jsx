import { useState } from 'react';
import ControlPanelButtons from './ControlPanelButtons';

const STATUS = {
  isMinimizing: 0,
  minimized: 1,
  isMaximizing: 2,
  maximized: 3,
};

const ControlPanel = (props) => {
  const { name, editable, handleNameChange, handleDelete, handleDuplicate, children } = props;

  const [status, setStatus] = useState(STATUS.maximized);

  const handleMinimize = () => {
    setStatus(STATUS.isMinimizing);
    setTimeout(() => setStatus(STATUS.minimized), 150);
  };

  const handleMaximize = () => {
    setStatus(STATUS.isMaximizing);
    setTimeout(() => setStatus(STATUS.maximized), 150);
  };

  return (
    <div
      className={`transition-width duration-300 py-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] rounded-[10px] shadow-md ${
        status === STATUS.minimized || status === STATUS.isMinimizing
          ? 'w-[24px] min-h-[280px] shrink-0'
          : 'w-[260px]'
      }`}
      onClick={status === STATUS.minimized ? handleMaximize : undefined}
    >
      {(status === STATUS.minimized || status === STATUS.isMinimizing) && (
        <div className="w-[24px] shrink-0 min-h-[280px] flex flex-col items-center rounded-[10px] cursor-pointer shadow-md hover:text-emerald-500">
          <span
            className={`[writing-mode:vertical-lr] [text-orientation:mixed] whitespace-nowrap truncate ${
              status === STATUS.minimized
                ? 'transition-opacity duration-300 opacity-100'
                : 'opacity-0'
            }`}
          >
            {name}
          </span>
        </div>
      )}

      {(status === STATUS.maximized || status === STATUS.isMaximizing) && (
        <div
          className={`flex flex-col gap-[6px] shrink-0 overflow-hidden ${
            status === STATUS.maximized
              ? 'transition-opacity duration-300 opacity-100'
              : 'opacity-0'
          }`}
        >
          <ControlPanelButtons
            name={name}
            editable={editable}
            handleNameChange={handleNameChange}
            handleDelete={handleDelete}
            handleDuplicate={handleDuplicate}
            toggleMinimize={handleMinimize}
          />
          {children}
        </div>
      )}
    </div>
  );
};

export default ControlPanel;

/**

<div
      className={`transition-width duration-300 first-letter:duration-1000 bg-zinc-900 text-gray-400 font-mono text-[11px] flex gap-[6px]  shrink-0 overflow-hidden ${
        status === STATUS.minimized || status === STATUS.isMinimizing
          ? 'w-[24px] shrink-0 min-h-[280px] py-[10px] justify-center rounded-[10px] cursor-pointer shadow-md hover:text-emerald-500'
          : 'w-[260px] py-[10px] rounded-[10px] flex-col shadow-md'
      }`}
      onClick={status === STATUS.minimized ? handleMaximize : undefined}
    >
      {(status === STATUS.minimized || status === STATUS.isMinimizing) && (
        <span
          className={`[writing-mode:vertical-lr] [text-orientation:mixed] whitespace-nowrap truncate ${
            status === STATUS.minimized
              ? 'transition-opacity duration-300 opacity-100'
              : 'opacity-0'
          }`}
        >
          {name}
        </span>
      )}

      {(status === STATUS.maximized || status === STATUS.isMaximizing) && (
        <div>
          <ControlPanelButtons
            name={name}
            editable={editable}
            handleNameChange={handleNameChange}
            handleDelete={handleDelete}
            handleDuplicate={handleDuplicate}
            toggleMinimize={handleMinimize}
          />
          {children}
        </div>
      )}
    </div>

 */
