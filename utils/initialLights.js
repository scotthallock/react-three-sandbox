import { LIGHT } from './types';

const initialLights = {
  0: {
    uuid: 0,
    name: 'ambient light',
    type: LIGHT.Ambient,
    position: null,
    color: '#ffffff',
    angle: 0,
    intensity: 0.5,
    helper: false,
  },
  1: {
    uuid: 1,
    name: 'directional light',
    type: LIGHT.DirectionalLight,
    position: [10, 10, 10],
    color: '#ffff00',
    angle: 0.14,
    intensity: 1,
    helper: false,
  },
};

export default initialLights;
