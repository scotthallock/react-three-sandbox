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
      font={'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff'}
      fontSize={1.5}
      anchorX="center"
      anchorY="center"
    >
      {text}
    </Text>
  );
};

export default TextModel;
