import { Text } from '@react-three/drei';
import { useMemo } from 'react';
import { createThreeMaterial } from '../../../utils/helpers';

const TextModel = (props) => {
  const { text, material, color, scale, position, rotationRad } = props;

  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  return (
    <Text
      material={memoMaterial}
      scale={scale}
      position={position}
      rotation={rotationRad}
      font="./src/assets/Inter_Regular.json"
      fontSize={1}
    >
      {text}
    </Text>
  );
};

export default TextModel;
