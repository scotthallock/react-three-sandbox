import { useMemo } from 'react';
import { createThreeMaterial } from '../../../utils/helpers';

const ConeModel = (props) => {
  const { args, material, color, scale, position, rotationRad } = props;

  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  return (
    <mesh material={memoMaterial} scale={scale} position={position} rotation={rotationRad}>
      <coneGeometry args={args} />
    </mesh>
  );
};

export default ConeModel;
