import ControlPanel from './ControlPanel';

const ControlPanelContainer = (props) => {
  const { objects, handleAction } = props;

  const controlPanels = Object.values(objects).map((modelProps) => {
    return <ControlPanel key={modelProps.uuid} {...modelProps} />;
  });

  return (
    <div className="m-4 pb-[10px] flex gap-[10px] overflow-x-auto overflow-y-hidden">
      {controlPanels}
    </div>
  );
};

export default ControlPanelContainer;
