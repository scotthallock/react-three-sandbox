import { useState } from 'react';
import ControlPanelButtons from './ControlPanelButtons';
import InputColor from './InputColor';
import InputNumber from './InputNumber';

import { AXIS, LIGHT, LIGHT_ACTION } from '../../../utils/types';
import InputNumberMultiple from './InputNumberMultiple';
import InputCheckbox from './InputCheckbox';

const ControlPanelLight = (props) => {
  const { uuid, name, type, position, color, angle, intensity, helper, handleLightAction } = props;

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
        editable={type !== LIGHT.Ambient}
        handleNameChange={(e) => handleLightAction(LIGHT_ACTION.CHANGE_NAME, uuid, e.target.value)}
        handleDelete={() => handleLightAction(LIGHT_ACTION.DELETE_LIGHT, uuid)}
        handleDuplicate={() => handleLightAction(LIGHT_ACTION.DUPLICATE_LIGHT, uuid)}
        toggleMinimize={toggleMinimize}
      />

      <InputColor
        label="color"
        value={color}
        handleChange={(e) => handleLightAction(LIGHT_ACTION.CHANGE_COLOR, uuid, e.target.value)}
        handleBlur={(value) => handleLightAction(LIGHT_ACTION.CHANGE_COLOR, uuid, value)}
      />

      <InputNumber
        label="intensity"
        value={intensity}
        handleChange={(e) => handleLightAction(LIGHT_ACTION.CHANGE_INTENSITY, uuid, e.target.value)}
      />

      {type !== LIGHT.Ambient ? (
        <InputNumberMultiple
          label="position"
          step="0.1"
          symbols={['x', 'y', 'z']}
          values={position}
          handleChanges={[
            (e) => handleLightAction(LIGHT_ACTION.CHANGE_POSITION, uuid, e.target.value, AXIS.X),
            (e) => handleLightAction(LIGHT_ACTION.CHANGE_POSITION, uuid, e.target.value, AXIS.Y),
            (e) => handleLightAction(LIGHT_ACTION.CHANGE_POSITION, uuid, e.target.value, AXIS.Z),
          ]}
        />
      ) : null}

      {type === LIGHT.SpotLight ? (
        <InputNumber
          label="angle (rad)"
          step="0.02"
          value={angle}
          handleChange={(e) => handleLightAction(LIGHT_ACTION.CHANGE_ANGLE, uuid, e.target.value)}
        />
      ) : null}

      {type !== LIGHT.Ambient ? (
        <InputCheckbox
          label="show helper"
          checked={helper}
          handleChange={() => handleLightAction(LIGHT_ACTION.TOGGLE_HELPER, uuid)}
        />
      ) : null}
    </div>
  );
};

export default ControlPanelLight;
