import ControlPanel from './ControlPanel';

const ControlPanelContainer = ({ models, handleAction }) => (
  <div className="m-4 pb-[10px] flex gap-[10px] overflow-x-auto overflow-y-hidden">
    {Object.values(models).map((modelProps) => (
      <ControlPanel
        key={modelProps.uuid}
        {...modelProps}
        handleAction={handleAction}
      />
    ))}
  </div>
);

export default ControlPanelContainer;
