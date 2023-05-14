import ObjectControlRow from './ObjectControlRow';
import ObjectControlHeaders from './ObjectControlHeaders';

const ObjectControlTable = (props) => {
  const {
    objects,
    addObject,
    deleteObject,
    duplicateObject,
    changeText,
    changeScale,
    changeMaterial,
    changeGeometry,
    changeColor,
    changePosition,
    changeRotation,
  } = props;

  const tableRows = Object.values(objects).map((state) => (
    <ObjectControlRow
      key={state.iden}
      {...state}
      changeText={changeText}
      changeGeometry={changeGeometry}
      changeMaterial={changeMaterial}
      changeColor={changeColor}
      changeScale={changeScale}
      changePosition={changePosition}
      changeRotation={changeRotation}
      deleteObject={deleteObject}
      duplicateObject={duplicateObject}
    />
  ));

  return (
    <div className="overflow-x-scroll m-4 shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll bg-gray-100">
        <ObjectControlHeaders />
        <tbody className="bg-gray-50 divide-y divide-gray-200">
          {tableRows}
        </tbody>
      </table>
    </div>
  );
};

export default ObjectControlTable;
