import { GEOMETRY } from '../../../utils/types';
import Text3DModel from './Text3DModel';
import TextModel from './TextModel';
import BoxModel from './BoxModel';
import SphereModel from './SphereModel';

const ModelCollection = ({ models }) =>
  Object.values(models).map((model) => {
    switch (model.geometry) {
      case GEOMETRY.Text3D:
        return <Text3DModel key={model.uuid} {...model} />;
      case GEOMETRY.Text:
        return <TextModel key={model.uuid} {...model} />;
      case GEOMETRY.Box:
        return <BoxModel key={model.uuid} {...model} />;
      case GEOMETRY.Sphere:
        return <SphereModel key={model.uuid} {...model} />;
      default:
        return null;
    }
  });

export default ModelCollection;
