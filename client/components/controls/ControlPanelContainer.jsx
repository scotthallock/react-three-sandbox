import ControlPanelScene from './ControlPanelScene';
import ControlPanelLight from './ControlPanelLight';
import ControlPanelObject from './ControlPanelObject';

const ControlPanelContainer = ({
  scene,
  handleSceneAction,
  lights,
  handleLightAction,
  models,
  handleAction,
}) => (
  <div className="m-4 pb-[10px] flex gap-[10px] overflow-x-auto overflow-y-hidden">
    <ControlPanelScene key="scene" {...scene} handleSceneAction={handleSceneAction} />

    {Object.values(lights).map((light) => (
      <ControlPanelLight key={light.uuid} {...light} handleLightAction={handleLightAction} />
    ))}

    {Object.values(models).map((model) => (
      <ControlPanelObject key={model.uuid} {...model} handleAction={handleAction} />
    ))}
  </div>
);

export default ControlPanelContainer;
