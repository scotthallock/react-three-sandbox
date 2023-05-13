import { useState } from 'react';

const ObjectCreator = ({ addObject }) => {
  const [objectType, setObjectType] = useState('box');

  return (
    <tr>
      <td className="sticky left-0 whitespace-nowrap px-4 py-2 bg-gray-50">
        <div className="flex gap-2 items-center">
          <button onClick={() => addObject(objectType)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 96 960 960"
              width="24"
            >
              <path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z" />
            </svg>
          </button>
          <select
            name="object"
            className="border border-gray-600 h-6 text-sm uppercase font-bold text-gray-900 ml-auto"
            value={objectType}
            onChange={(e) => setObjectType(e.target.value)}
          >
            <option value="3dtext">3D Text</option>
            <option value="2dtext">2D Text</option>
            <option value="box">Box</option>
            <option value="sphere">Sphere</option>
          </select>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <div className="flex gap-2 items-center"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <div className="flex gap-2 items-center"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <div className="flex gap-2 items-center"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <div className="flex gap-2 items-center"></div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <div className="flex gap-2 items-center">hi</div>
      </td>
    </tr>
  );
};

export default ObjectCreator;
