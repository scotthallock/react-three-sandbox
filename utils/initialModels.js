import * as THREE from 'three';
import { GEOMETRY, MATERIAL } from './types';

const initialModels = {
  0: {
    uuid: 0,
    name: 'sup',
    geometry: GEOMETRY.Text3D,
    material: MATERIAL.Normal,
    color: '#00ff00',
    text: 'hello',
    args: [1, 1, 1],
    scale: 2,
    position: [-3, 3, -2],
    rotationDeg: [-15, 30, 0],
    rotationRad: [THREE.MathUtils.degToRad(-15), THREE.MathUtils.degToRad(30), 0],
  },
  1: {
    uuid: 1,
    name: 'world',
    geometry: GEOMETRY.Text,
    material: MATERIAL.Phong,
    color: '#f1f5f9',
    text: 'world',
    args: [1, 1, 1],
    scale: 2,
    position: [3, 1, -1],
    rotationDeg: [0, 0, 0],
    rotationRad: [0, 0, 0],
  },
  2: {
    uuid: 2,
    name: 'cone',
    geometry: GEOMETRY.Cone,
    material: MATERIAL.Phong,
    color: '#ff00ff',
    text: 'world',
    args: [0.75, 1.5, 8],
    scale: 1,
    position: [-1.75, 0, 1],
    rotationDeg: [0, 0, 0],
    rotationRad: [0, 0, 0],
  },
  3: {
    uuid: 3,
    name: 'sphere',
    geometry: GEOMETRY.Sphere,
    material: MATERIAL.Standard,
    color: '#22c55e',
    text: 'world',
    args: [1, 32, 32],
    scale: 1,
    position: [2.25, 1.5, -0.5],
    rotationDeg: [0, 0, 0],
    rotationRad: [0, 0, 0],
  },
};

export default initialModels;
