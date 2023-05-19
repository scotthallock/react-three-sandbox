import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { SpotLightHelper } from 'three';

const SpotLight = (props) => {
  const { position, color, intensity, angle, helper } = props;
  const ref = useRef();
  useHelper(helper && ref, SpotLightHelper, color);
  return (
    <spotLight ref={ref} position={position} color={color} intensity={intensity} angle={angle} />
  );
};

export default SpotLight;
