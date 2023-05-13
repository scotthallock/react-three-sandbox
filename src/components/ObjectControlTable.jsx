import Text3DControl from './Text3DControl';
import ObjectControlHeaders from './ObjectControlHeaders';
import ObjectCreator from './ObjectCreator';

import { OBJECT } from '../types';

const ObjectControlTable = (props) => {
  const {
    objects,
    addObject,
    deleteObject,
    duplicateObject,
    changeText,
    changeScale,
    changeMaterial,
    changeColor,
    changePosition,
    changeRotation,
  } = props;

  const tableRows = Object.values(objects).map((state) => {
    if (state.geometry === OBJECT.TEXT3D) {
      return (
        <Text3DControl
          key={state.iden}
          {...state}
          changeText={changeText}
          changeMaterial={changeMaterial}
          changeColor={changeColor}
          changeScale={changeScale}
          changePosition={changePosition}
          changeRotation={changeRotation}
          deleteObject={deleteObject}
          duplicateObject={duplicateObject}
        />
      );
    }
    return null;
  });

  return (
    <div className="overflow-x-scroll m-4 shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll bg-gray-100">
        <ObjectControlHeaders />
        <tbody className="bg-gray-50 divide-y divide-gray-200">
          {tableRows}
          <ObjectCreator addObject={addObject} />
        </tbody>
      </table>
    </div>
  );
};

export default ObjectControlTable;
