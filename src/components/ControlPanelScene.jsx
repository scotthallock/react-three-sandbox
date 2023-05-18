import { useState } from 'react';
import ControlPanelButtons from './ControlPanelButtons';
import InputCheckbox from './InputCheckbox';
import InputColor from './InputColor';
import InputNumber from './InputNumber';
import InputNumberMultiple from './InputNumberMultiple';

import { SCENE_ACTION } from '../../utils/types';

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

  const [minimized, setMinimized] = useState(false);
  const toggleMinimize = () => setMinimized(!minimized);

  if (minimized) {
    return (
      <div
        className="w-[24px] shrink-0 min-h-[280px] py-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] gap-[6px] flex justify-center rounded-[10px] cursor-pointer shadow-md hover:text-emerald-500"
        onClick={toggleMinimize}
      >
        <span className="[writing-mode:vertical-lr] [text-orientation:mixed] whitespace-nowrap truncate">
          scene controls
        </span>
      </div>
    );
  }

  return (
    <div className="w-min py-[10px] rounded-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] flex flex-col gap-[6px] shadow-md">
      <ControlPanelButtons editable={false} name="scene controls" toggleMinimize={toggleMinimize} />

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
        value={gridFadeDistance}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.GRID_FADE_DISTANCE, e.target.value)}
      />

      <InputNumber
        label="y-level"
        value={gridYLevel}
        handleChange={(e) => handleSceneAction(SCENE_ACTION.GRID_Y_LEVEL, e.target.value)}
      />
    </div>
  );
};

export default ControlPanelScene;
