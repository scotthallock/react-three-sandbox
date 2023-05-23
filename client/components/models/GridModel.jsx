import { Grid } from '@react-three/drei';

const GridModel = ({
  gridSize,
  gridCellColor,
  gridSectionColor,
  gridInfinite,
  gridFadeDistance,
  gridYLevel,
}) => (
  <Grid
    position={[0, gridYLevel, 0]}
    args={gridSize}
    infiniteGrid={gridInfinite}
    cellColor={gridCellColor}
    sectionColor={gridSectionColor}
    fadeDistance={gridFadeDistance}
  />
);

export default GridModel;
