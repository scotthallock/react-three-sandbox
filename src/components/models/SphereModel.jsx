import { useMemo } from 'react';
import { createThreeMaterial } from '../../../utils/helpers';

const SphereModel = (props) => {
  const { args, material, color, scale, position, rotationRad } = props;

  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  return (
    <mesh
      material={memoMaterial}
      scale={scale}
      position={position}
      rotation={rotationRad}
    >
      <sphereGeometry args={args} />
    </mesh>
  );
};

export default SphereModel;
