import ObjectControlRow from './ObjectControlRow';
import ObjectControlHeaders from './ObjectControlHeaders';

const ObjectControlTable = (props) => {
  const { objects, handleAction } = props;

  const ObjectControlRows = Object.values(objects).map((state) => (
    <ObjectControlRow key={state.iden} {...state} handleAction={handleAction} />
  ));

  return (
    <div className="overflow-x-scroll m-4 shadow-lg">
      <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll bg-gray-100">
        <ObjectControlHeaders />
        <tbody className="bg-gray-50 divide-y divide-gray-200">
          {ObjectControlRows}
        </tbody>
      </table>
    </div>
  );
};

export default ObjectControlTable;
