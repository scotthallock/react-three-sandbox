import { ACTION } from '../../utils/types';

const ControlPanelButtons = ({ uuid, handleAction, toggleMinimize }) => (
  <div className="flex items-center justify-end gap-[6px] w-[260px] min-h-[24px] px-[10px]">
    <button
      className="fill-gray-400 hover:fill-emerald-500 mr-auto"
      onClick={() => handleAction(ACTION.DUPLICATE_OBJECT, uuid)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="18px"
        width="18px"
      >
        <path d="M64 464H288c8.8 0 16-7.2 16-16V384h48v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h64v48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16zM224 352c-35.3 0-64-28.7-64-64V64c0-35.3 28.7-64 64-64H448c35.3 0 64 28.7 64 64V288c0 35.3-28.7 64-64 64H224z" />
      </svg>
    </button>

    <button
      className="fill-gray-400 hover:fill-emerald-500"
      onClick={toggleMinimize}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        height="18px"
        width="18px"
      >
        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
      </svg>
    </button>

    <button
      className="fill-gray-400 hover:fill-red-500"
      onClick={() => handleAction(ACTION.DELETE_OBJECT, uuid)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        height="18px"
        width="18px"
      >
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
    </button>
  </div>
);

export default ControlPanelButtons;
