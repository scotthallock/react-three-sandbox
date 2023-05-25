import ControlPanel from './ControlPanel';
import InputNumber from './InputNumber';
import InputNumberMultiple from './InputNumberMultiple';
import InputColor from './InputColor';
import InputTextArea from './InputTextArea';
import InputCheckbox from './InputCheckbox';
import InputSelect from './InputSelect';
import { GEOMETRY, MATERIAL, ACTION, AXIS } from '../../../utils/types';

const ControlPanelObject = (props) => {
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

  let symbols = ['', '', ''];
  if (geometry === GEOMETRY.Box) {
    symbols = ['w', 'h', 'd'];
  } else if (geometry === GEOMETRY.Sphere) {
    symbols = ['r', 'w', 'h'];
  } else if (geometry === GEOMETRY.Cone) {
    symbols = ['r', 'h', 'r'];
  }

  return (
    <ControlPanel
      name={name}
      handleNameChange={(e) => handleAction(ACTION.CHANGE_NAME, uuid, e.target.value)}
      handleDelete={() => handleAction(ACTION.DELETE_OBJECT, uuid)}
      handleDuplicate={() => handleAction(ACTION.DUPLICATE_OBJECT, uuid)}
    >
      <InputSelect
        label="geometry"
        options={[GEOMETRY.Text3D, GEOMETRY.Text, GEOMETRY.Box, GEOMETRY.Sphere, GEOMETRY.Cone]}
        value={geometry}
        handleChange={(e) => handleAction(ACTION.CHANGE_GEOMETRY, uuid, e.target.value)}
      />

      {geometry === GEOMETRY.Text3D || geometry === GEOMETRY.Text ? (
        <InputTextArea
          label="text"
          value={text}
          handleChange={(e) => handleAction(ACTION.CHANGE_TEXT, uuid, e.target.value)}
        />
      ) : null}

      {geometry === GEOMETRY.Box ? (
        <InputNumberMultiple
          label="args"
          step="0.1"
          symbols={['w', 'h', 'd']}
          values={args}
          handleChanges={[
            (e) => handleAction(ACTION.CHANGE_ARGS, uuid, e.target.value, 0),
            (e) => handleAction(ACTION.CHANGE_ARGS, uuid, e.target.value, 1),
            (e) => handleAction(ACTION.CHANGE_ARGS, uuid, e.target.value, 2),
          ]}
        />
      ) : (
        <InputNumberMultiple
          label="args"
          step="0.1"
          symbols={symbols}
          values={args}
          handleChanges={[
            (e) => handleAction(ACTION.CHANGE_ARGS, uuid, e.target.value, 0),
            (e) => handleAction(ACTION.CHANGE_ARGS, uuid, e.target.value, 1),
            (e) => handleAction(ACTION.CHANGE_ARGS, uuid, e.target.value, 2),
          ]}
        />
      )}

      {/* <InputCheckbox label="wireframe" handleChange={(e) => console.log('CHANGE WIREFRAME')} /> */}

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
        handleChange={(e) => handleAction(ACTION.CHANGE_MATERIAL, uuid, e.target.value)}
      />

      <InputColor
        label="color"
        value={color}
        handleChange={(e) => handleAction(ACTION.CHANGE_COLOR, uuid, e.target.value)}
        handleBlur={(value) => handleAction(ACTION.CHANGE_COLOR, uuid, value)}
      />

      <InputNumber
        label="scale"
        value={scale}
        handleChange={(e) => handleAction(ACTION.CHANGE_SCALE, uuid, e.target.value)}
      />

      <InputNumberMultiple
        label="position"
        step="0.1"
        symbols={['x', 'y', 'z']}
        values={position}
        handleChanges={[
          (e) => handleAction(ACTION.CHANGE_POSITION, uuid, e.target.value, AXIS.X),
          (e) => handleAction(ACTION.CHANGE_POSITION, uuid, e.target.value, AXIS.Y),
          (e) => handleAction(ACTION.CHANGE_POSITION, uuid, e.target.value, AXIS.Z),
        ]}
      />

      <InputNumberMultiple
        label="rotation"
        step="5"
        symbols={['x', 'y', 'z']}
        values={rotationDeg}
        handleChanges={[
          (e) => handleAction(ACTION.CHANGE_ROTATION, uuid, e.target.value, AXIS.X),
          (e) => handleAction(ACTION.CHANGE_ROTATION, uuid, e.target.value, AXIS.Y),
          (e) => handleAction(ACTION.CHANGE_ROTATION, uuid, e.target.value, AXIS.Z),
        ]}
      />
    </ControlPanel>
  );
};

export default ControlPanelObject;
