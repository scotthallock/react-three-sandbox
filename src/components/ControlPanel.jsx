import { useState } from 'react';
import ControlPanelButtons from './ControlPanelButtons';
import InputText from './InputText';
import InputNumber from './InputNumber';
import InputNumberMultiple from './InputNumberMultiple';
import InputColor from './InputColor';
import InputTextArea from './InputTextArea';
import InputCheckbox from './InputCheckbox';
import InputSelect from './InputSelect';

import { GEOMETRY, MATERIAL, ACTION, AXIS } from '../../utils/types';

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
    rotationDeg,
    handleAction,
  } = props;

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
        uuid={uuid}
        handleAction={handleAction}
        toggleMinimize={toggleMinimize}
      />

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
        handleBlur={(value) => handleAction(ACTION.CHANGE_COLOR, uuid, value)}
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
        values={rotationDeg}
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
