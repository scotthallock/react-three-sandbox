import { useState } from 'react';
import InputText from './InputText';
import InputNumber from './InputNumber';
import InputNumberMultiple from './InputNumberMultiple';
import InputColor from './InputColor';
import InputTextArea from './InputTextArea';
import InputCheckbox from './InputCheckbox';
import InputSelect from './InputSelect';

import { GEOMETRY, MATERIAL, ACTION, AXIS } from '../types';

const ControlPanel = (props) => {
  const {
    uuid,
    name,
    geometry,
    material,
    color,
    text,
    args,
    scale,
    position,
    rotation,
    handleAction,
  } = props;

  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div
        className="w-[24px] shrink-0 min-h-[280px] py-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] gap-[6px] flex justify-center rounded-[10px] cursor-pointer shadow-md hover:text-emerald-500"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="[writing-mode:vertical-lr] [text-orientation:mixed] whitespace-nowrap truncate">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className="w-min py-[10px] rounded-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] flex flex-col gap-[6px] shadow-md">
      {/* COLLAPSE ICON */}

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
          onClick={() => setCollapsed(!collapsed)}
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

      <InputText
        label="name"
        value={name}
        handleChange={(e) =>
          handleAction(ACTION.CHANGE_NAME, uuid, e.target.value)
        }
      />

      <InputSelect
        label="geometry"
        options={[
          GEOMETRY.Text3D,
          GEOMETRY.Text,
          GEOMETRY.Box,
          GEOMETRY.Sphere,
          GEOMETRY.Cone,
        ]}
        value={geometry}
        handleChange={(e) =>
          handleAction(ACTION.CHANGE_GEOMETRY, uuid, e.target.value)
        }
      />

      <InputTextArea
        label="text"
        value={text}
        handleChange={(e) =>
          handleAction(ACTION.CHANGE_TEXT, uuid, e.target.value)
        }
      />

      <InputCheckbox
        label="wireframe"
        handleChange={(e) => console.log('CHANGE WIREFRAME')}
      />

      <InputSelect
        label="material"
        options={[
          MATERIAL.Normal,
          MATERIAL.Phong,
          MATERIAL.Standard,
          MATERIAL.Basic,
          MATERIAL.Toon,
        ]}
        value={material}
        handleChange={(e) =>
          handleAction(ACTION.CHANGE_MATERIAL, uuid, e.target.value)
        }
      />

      <InputColor
        label="color"
        value={color}
        handleChange={(e) =>
          handleAction(ACTION.CHANGE_COLOR, uuid, e.target.value)
        }
      />

      <InputNumber
        label="scale"
        value={scale}
        handleChange={(e) =>
          handleAction(ACTION.CHANGE_SCALE, uuid, e.target.value)
        }
      />

      <InputNumberMultiple
        label="position"
        step="0.1"
        symbols={['x', 'y', 'z']}
        values={position}
        handleChanges={[
          (e) =>
            handleAction(ACTION.CHANGE_POSITION, uuid, e.target.value, AXIS.X),
          (e) =>
            handleAction(ACTION.CHANGE_POSITION, uuid, e.target.value, AXIS.Y),
          (e) =>
            handleAction(ACTION.CHANGE_POSITION, uuid, e.target.value, AXIS.Z),
        ]}
      />

      <InputNumberMultiple
        label="rotation"
        step="5"
        symbols={['x', 'y', 'z']}
        values={rotation}
        handleChanges={[
          (e) =>
            handleAction(ACTION.CHANGE_ROTATION, uuid, e.target.value, AXIS.X),
          (e) =>
            handleAction(ACTION.CHANGE_ROTATION, uuid, e.target.value, AXIS.Y),
          (e) =>
            handleAction(ACTION.CHANGE_ROTATION, uuid, e.target.value, AXIS.Z),
        ]}
      />
    </div>
  );
};

export default ControlPanel;
