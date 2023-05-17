import { GEOMETRY, MATERIAL } from './types';

const initialModels = {
  0: {
    uuid: 0,
    name: 'sup',
    geometry: GEOMETRY.Text3D,
    material: MATERIAL.Normal,
    color: '#00ff00',
    text: 'sup',
    args: [1, 1, 1],
    scale: 1,
    position: [0, 0, 0],
    rotationDeg: [0, 0, 0],
    rotationRad: [0, 0, 0],
  },
  1: {
    uuid: 1,
    name: 'hello',
    geometry: GEOMETRY.Text3D,
    material: MATERIAL.Phong,
    color: '#00ffff',
    text: 'hello',
    args: [1, 1, 1],
    scale: 1,
    position: [1, 2, 1],
    rotationDeg: [0, 0, 0],
    rotationRad: [0, 0, 0],
  },
  2: {
    uuid: 2,
    name: 'box',
    geometry: GEOMETRY.Box,
    material: MATERIAL.Phong,
    color: '#ff00ff',
    text: 'world',
    args: [1, 2, 1],
    scale: 2,
    position: [0, 0, 0],
    rotationDeg: [0, 0, 0],
    rotationRad: [0, 0, 0],
  },
};

export default initialModels;
