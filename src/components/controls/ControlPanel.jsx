import { useState } from 'react';
import ControlPanelButtons from './ControlPanelButtons';

const ControlPanel = (props) => {
  const { name, editable, handleNameChange, handleDelete, handleDuplicate, children } = props;
  const [minimized, setMinimized] = useState(false);
  const toggleMinimize = () => setMinimized(!minimized);

  if (minimized) {
    return (
      <div
        className="w-[24px] shrink-0 min-h-[280px] py-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] gap-[6px] flex justify-center rounded-[10px] cursor-pointer shadow-md hover:text-emerald-500"
        onClick={toggleMinimize}
      >
        <span className="[writing-mode:vertical-lr] [text-orientation:mixed] whitespace-nowrap truncate">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className="w-min py-[10px] rounded-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] flex flex-col gap-[6px] shadow-md">
      <ControlPanelButtons
        name={name}
        editable={editable}
        handleNameChange={handleNameChange}
        handleDelete={handleDelete}
        handleDuplicate={handleDuplicate}
        toggleMinimize={toggleMinimize}
      />
      {children}
    </div>
  );
};

export default ControlPanel;
