import * as THREE from 'three';
import { MATERIAL } from './types';

export const createThreeMaterial = (material, color = '#ffffff') => {
  if (material === MATERIAL.Phong) {
    return new THREE.MeshPhongMaterial({ color });
  } else if (material === MATERIAL.Basic) {
    return new THREE.MeshBasicMaterial({ color });
  } else if (material === MATERIAL.Toon) {
    return new THREE.MeshToonMaterial({ color });
  } else if ((material = MATERIAL.Standard)) {
    return new THREE.MeshStandardMaterial({ color });
  } else {
    return new THREE.MeshNormalMaterial();
  }
};
