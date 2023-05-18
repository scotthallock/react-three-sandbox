import { Grid } from '@react-three/drei';

const GridModel = ({
  showGrid,
  gridSize,
  gridCellColor,
  gridSectionColor,
  gridInfinite,
  gridFadeDistance,
}) =>
  showGrid ? (
    <Grid
      args={[gridSize, gridSize]}
      infiniteGrid={gridInfinite}
      cellColor={gridCellColor}
      sectionColor={gridSectionColor}
      fadeDistance={gridFadeDistance}
    />
  ) : null;

export default GridModel;
