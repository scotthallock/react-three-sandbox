import ControlPanel from './ControlPanel';
import InputColor from './InputColor';
import InputNumber from './InputNumber';
import InputNumberMultiple from './InputNumberMultiple';
import InputCheckbox from './InputCheckbox';
import { AXIS, LIGHT, LIGHT_ACTION } from '../../../utils/types';

const ControlPanelLight = (props) => {
  const { uuid, name, type, position, color, angle, intensity, helper, handleLightAction } = props;

  return (
    <ControlPanel
      name={name}
      editable={type !== LIGHT.Ambient}
      handleNameChange={(e) => handleLightAction(LIGHT_ACTION.CHANGE_NAME, uuid, e.target.value)}
      handleDelete={() => handleLightAction(LIGHT_ACTION.DELETE_LIGHT, uuid)}
      handleDuplicate={() => handleLightAction(LIGHT_ACTION.DUPLICATE_LIGHT, uuid)}
    >
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
    </ControlPanel>
  );
};

export default ControlPanelLight;
