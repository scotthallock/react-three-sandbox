import { useState, useRef, useEffect } from 'react';

function Text3DControl(props) {
  const {
    iden,
    text,
    material,
    color,
    position,
    rotation,
    scale,
    deleteObject,
    duplicateObject,
    changeText,
    changeMaterial,
    changeColor,
    changePosition,
    changeRotation,
    changeScale,
  } = props;

  return (
    <tr>
      <td className="sticky left-0 whitespace-nowrap bg-white pl-2 py-2">
        <div className="flex gap-2 items-center">
          <button className="fill-red-500" onClick={() => deleteObject(iden)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 96 960 960"
              width="24"
            >
              <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
            </svg>
          </button>
          <button
            className="fill-blue-600"
            onClick={() => duplicateObject(iden)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 96 960 960"
              width="24"
            >
              <path d="M120 975V312h60v603h474v60H120Zm120-120V175h560v680H240Zm60-60h440V235H300v560Zm0 0V235v560Z" />
            </svg>
          </button>
        </div>
      </td>
      <td className="sticky left-0 whitespace-nowrap bg-white px-4 py-2">
        <div className="flex gap-2 items-center">
          <span className="text-sm uppercase font-bold text-gray-900">
            3D Text
          </span>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="flex gap-2 items-center">
          <textarea
            className="min-h-[1.5rem] h-6 border border-gray-600 pl-2"
            value={text}
            onChange={(e) => changeText(iden, e.target.value)}
          />
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <div className="flex gap-2 items-center">
          <select
            name="material"
            className="border border-gray-600 h-6"
            value={material}
            onChange={(e) => changeMaterial(iden, e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="basic">Basic</option>
            <option value="phong">Phong</option>
          </select>
          {/* The THREE.MeshNormalMaterial does not use a color! */}
          {material === 'normal' ? null : (
            <input
              className="h-6 w-6 border outline-none p-0 appearance-none"
              type="color"
              value={color}
              onChange={(e) => changeColor(iden, e.target.value)}
            />
          )}
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <input
          className="font-mono border border-gray-600 pl-2 h-6 w-12"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={scale}
          onChange={(e) => changeScale(iden, e.target.value)}
        />
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <div className="flex gap-2 items-center">
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={position[0]}
            onChange={(e) => changePosition(iden, 'x', e.target.value)}
          />
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={position[1]}
            onChange={(e) => changePosition(iden, 'y', e.target.value)}
          />
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={[position[2]]}
            onChange={(e) => changePosition(iden, 'z', e.target.value)}
          />
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <div className="flex gap-2 items-center">
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            step="5"
            value={rotation[0] + ''}
            onChange={(e) => changeRotation(iden, 'x', e.target.value)}
          />
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            step="5"
            value={rotation[1]}
            onChange={(e) => changeRotation(iden, 'y', e.target.value)}
          />
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            step="5"
            value={rotation[2]}
            onChange={(e) => changeRotation(iden, 'z', e.target.value)}
          />
        </div>
      </td>
    </tr>
  );
}

export default Text3DControl;
