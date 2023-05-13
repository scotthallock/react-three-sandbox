import Text3DControl from './Text3DControl';

const ObjectControlTable = (props) => {
  const {
    objects,
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
    if (state.geometry === 'Text3D') {
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
      <table className="min-w-full divide-y divide-gray-200 border-green-400 overflow-x-scroll">
        <thead className="sticky top-0 bg-gray-50">
          <tr>
            <th
              scope="col"
              className="sticky left-0 bg-gray-200 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              <span className="sr-only">Delete/Copy</span>
            </th>
            <th
              scope="col"
              className="sticky left-0 bg-gray-200 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Object
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Value
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Material
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Scale
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Position
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Rotation
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">{tableRows}</tbody>
      </table>
    </div>
  );
};

export default ObjectControlTable;
