import ControlPanel from './ControlPanel';
import InputCheckbox from './InputCheckbox';
import InputColor from './InputColor';
import InputNumber from './InputNumber';
import { SCENE_ACTION } from '../../../utils/types';

const ControlPanelScene = (props) => {
  const {
    backgroundColor,
    showGizmo,
    showGrid,
    gridSize,
    gridInfinite,
    gridCellColor,
    gridSectionColor,
    gridFadeDistance,
    gridYLevel,
    handleSceneAction,
  } = props;

  return (
    <ControlPanel name="scene controls" editable={false}>
      <InputColor
        label="background"
        value={backgroundColor}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.BACKGROUND_COLOR, e.target.value)}
        handleBlur={(value) => handleSceneAction(SCENE_ACTION.BACKGROUND_COLOR, value)}
      />

      <InputCheckbox
        label="show gizmo"
        checked={showGizmo}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.SHOW_GIZMO)}
      />

      <InputCheckbox
        label="show grid"
        checked={showGrid}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.SHOW_GRID)}
      />

      <InputNumber
        label="grid size"
        value={gridSize}
        step={1}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.GRID_SIZE, e.target.value)}
      />

      <InputCheckbox
        label="infinite"
        checked={gridInfinite}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.GRID_INFINITE)}
      />

      <InputColor
        label="grid"
        value={gridCellColor}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.GRID_CELL_COLOR, e.target.value)}
        handleBlur={(value) => handleSceneAction(SCENE_ACTION.GRID_CELL_COLOR, value)}
      />

      <InputColor
        label="section"
        value={gridSectionColor}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.GRID_SECTION_COLOR, e.target.value)}
        handleBlur={(value) => handleSceneAction(SCENE_ACTION.GRID_SECTION_COLOR, value)}
      />

      <InputNumber
        label="fade dist"
        step="5"
        value={gridFadeDistance}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.GRID_FADE_DISTANCE, e.target.value)}
      />

      <InputNumber
        label="y-level"
        value={gridYLevel}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.GRID_Y_LEVEL, e.target.value)}
      />
    </ControlPanel>
  );
};

export default ControlPanelScene;
