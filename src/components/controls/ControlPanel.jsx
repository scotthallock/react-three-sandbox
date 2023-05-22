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
    setTimeout(() => setStatus(STATUS.minimized), 300);
  };

  const handleMaximize = () => {
    setStatus(STATUS.isMaximizing);
    setTimeout(() => setStatus(STATUS.maximized), 300);
  };

  return (
    <div
      className={`transition-widty duration-300 first-letter:duration-1000 bg-zinc-900 text-gray-400 font-mono text-[11px] flex gap-[6px]  shrink-0 overflow-hidden ${
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
        <>
          <ControlPanelButtons
            name={name}
            editable={editable}
            handleNameChange={handleNameChange}
            handleDelete={handleDelete}
            handleDuplicate={handleDuplicate}
            toggleMinimize={handleMinimize}
          />
          {children}
        </>
      )}
    </div>
  );
};

export default ControlPanel;

// {!isMinimized && (
//   <div className="w-min py-[10px] rounded-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] flex flex-col gap-[6px] shadow-md">
//     <ControlPanelButtons
//       name={name}
//       editable={editable}
//       handleNameChange={handleNameChange}
//       handleDelete={handleDelete}
//       handleDuplicate={handleDuplicate}
//       toggleMinimize={() => {
//         console.log('toggled');
//         toggle(true);
//       }}
//     />
//     {children}
//   </div>
// )}

// {isMinimized && (
//   <div
//     className="w-[24px] shrink-0 min-h-[280px] py-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] gap-[6px] flex justify-center rounded-[10px] cursor-pointer shadow-md hover:text-emerald-500"
//     onClick={() => {
//       console.log('toggled');
//       toggle(false);
//     }}
//   >
//     <span className="[writing-mode:vertical-lr] [text-orientation:mixed] whitespace-nowrap truncate">
//       {name}
//     </span>
//   </div>
// )}
