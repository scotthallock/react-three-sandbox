import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';

const DirectionalLight = (props) => {
  const { position, color, intensity, helper } = props;
  const ref = useRef();
  useHelper(helper && ref, DirectionalLightHelper, 1, color);
  return <directionalLight ref={ref} position={position} color={color} intensity={intensity} />;
};

export default DirectionalLight;
