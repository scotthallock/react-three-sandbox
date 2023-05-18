import ControlPanelScene from './ControlPanelScene';
import ControlPanelObject from './ControlPanelObject';

const ControlPanelContainer = ({
  scene,
  handleSceneAction,
  lights,
  handleLightsAction,
  models,
  handleAction,
}) => (
  <div className="m-4 pb-[10px] flex gap-[10px] overflow-x-auto overflow-y-hidden">
    <ControlPanelScene
      key="scene"
      {...scene}
      handleSceneAction={handleSceneAction}
    />

    {/** map lights to <ControlPanelLight /> */}

    {Object.values(models).map((model) => (
      <ControlPanelObject
        key={model.uuid}
        {...model}
        handleAction={handleAction}
      />
    ))}
  </div>
);

export default ControlPanelContainer;
