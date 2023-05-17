import { useMemo } from 'react';
import { createThreeMaterial } from '../../../utils/helpers';

const BoxModel = (props) => {
  const { args, material, color, scale, position, rotationRad } = props;

  const memoMaterial = useMemo(() => {
    return createThreeMaterial(material, color);
  }, [material, color]);

  /**
   * Note: this code can show us if we are creating a new instance of geometry
   * or material when this component re-renders. If the uuid is unchanged, we
   * are re-using the current instance. If the uuid is changed, we are creating
   * a new instance.
   *
   * const ref = useRef(); // add `ref={ref}` to the <mesh>
   * useEffect(() => {
   *   console.log('geometry:', ref.current.geometry.uuid);
   *   console.log('material:', ref.current.material.uuid);
   * });
   *
   * The useMemo hook ensures we are not needlessly creating new instances of
   * material, even if the `material` or `color` have not changed since the last
   * render.
   */

  return (
    <mesh
      material={memoMaterial}
      scale={scale}
      position={position}
      rotation={rotationRad}
    >
      <boxGeometry args={args} />
    </mesh>
  );
};

export default BoxModel;
