import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { PointLightHelper } from 'three';

const PointLight = (props) => {
  const { position, color, intensity, helper } = props;
  const ref = useRef();
  useHelper(helper && ref, PointLightHelper, 1, color);
  return <pointLight ref={ref} position={position} color={color} intensity={intensity} />;
};

export default PointLight;
