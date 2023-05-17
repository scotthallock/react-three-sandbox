import { Text3D } from '@react-three/drei';
import { useMemo } from 'react';
import { createThreeMaterial } from '../../../utils/helpers';

const Text3DModel = (props) => {
  const { text, material, color, scale, position, rotationRad } = props;

  /**
   * Very helpful resource:
   * https://sbcode.net/react-three-fiber/use-memo/
   * Only create a new material if the `material` or `color` props have changed.
   * Without useMemo, we would be unnecessarily creating a new instance of
   * THREE.Material every time we change the position (but not the material).
   */
  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  return (
    <Text3D
      material={memoMaterial}
      scale={scale}
      position={position}
      rotation={rotationRad}
      font="./src/assets/Inter_Regular.json"
      lineHeight={0.7}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.01}
      bevelSize={0.01}
      bevelOffset={0}
      bevelSegments={5}
    >
      {text}
    </Text3D>
  );
};

export default Text3DModel;
