import { AXIS, MATERIAL, GEOMETRY, ACTION } from '../types';

function Text3DControl(props) {
  const {
    handleAction,
    iden,
    text,
    args,
    geometry,
    material,
    color,
    position,
    rotation,
    scale,
  } = props;

  return (
    <tr>
      <td className="sticky left-0 whitespace-nowrap px-4 py-2 bg-gray-50">
        <div className="flex gap-2 items-center">
          <button
            className="fill-red-500"
            onClick={() => handleAction(ACTION.DELETE_OBJECT, iden)}
          >
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
            onClick={() => handleAction(ACTION.DUPLICATE_OBJECT, iden)}
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
          <select
            name="material"
            className="border border-gray-600 h-6"
            value={geometry}
            onChange={(e) =>
              handleAction(ACTION.CHANGE_GEOMETRY, iden, e.target.value)
            }
          >
            <option value={GEOMETRY.TEXT3D}>TEXT 3D</option>
            <option value={GEOMETRY.TEXT2D}>TEXT 2D</option>
            <option value={GEOMETRY.BOX}>BOX</option>
            <option value={GEOMETRY.SPHERE}>SPHERE</option>
            <option value={GEOMETRY.CONE}>CONE</option>
          </select>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2">
        <div className="flex gap-2 items-center">
          {/* DIFFERENT VALES FOR DIFFERENT TYPES */}
          {geometry === GEOMETRY.TEXT2D || geometry === GEOMETRY.TEXT3D ? (
            <textarea
              className="min-h-[1.5rem] h-6 border border-gray-600 pl-2"
              value={text}
              onChange={(e) =>
                handleAction(ACTION.CHANGE_TEXT, iden, e.target.value)
              }
            />
          ) : null}
          {geometry === GEOMETRY.BOX || geometry === GEOMETRY.SPHERE ? (
            <>
              <input
                className="font-mono border border-gray-600 pl-2 h-6 w-16"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={args[0]}
                onChange={(e) =>
                  handleAction(ACTION.CHANGE_ARGS, iden, e.target.value, 0)
                }
              />
              <input
                className="font-mono border border-gray-600 pl-2 h-6 w-16"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={args[1]}
                onChange={(e) =>
                  handleAction(ACTION.CHANGE_ARGS, iden, e.target.value, 1)
                }
              />
              <input
                className="font-mono border border-gray-600 pl-2 h-6 w-16"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={args[2]}
                onChange={(e) =>
                  handleAction(ACTION.CHANGE_ARGS, iden, e.target.value, 2)
                }
              />
            </>
          ) : null}
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <div className="flex gap-2 items-center">
          <select
            name="material"
            className="border border-gray-600 h-6"
            value={material}
            onChange={(e) =>
              handleAction(ACTION.CHANGE_MATERIAL, iden, e.target.value)
            }
          >
            <option value={MATERIAL.NORMAL}>Normal</option>
            <option value={MATERIAL.PHONG}>Phong</option>
            <option value={MATERIAL.BASIC}>Basic</option>
            <option value={MATERIAL.TOON}>Toon</option>
            <option value={MATERIAL.STANDARD}>Standard</option>
          </select>
          {material === MATERIAL.NORMAL ? null : (
            <input
              className="h-6 w-6 border outline-none p-0 appearance-none"
              type="color"
              value={color}
              onChange={(e) =>
                handleAction(ACTION.CHANGE_COLOR, iden, e.target.value)
              }
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
          onChange={(e) =>
            handleAction(ACTION.CHANGE_SCALE, iden, e.target.value)
          }
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
            onChange={(e) =>
              handleAction(ACTION.CHANGE_POSITION, iden, e.target.value, AXIS.X)
            }
          />
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={position[1]}
            onChange={(e) =>
              handleAction(ACTION.CHANGE_POSITION, iden, e.target.value, AXIS.Y)
            }
          />
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={position[2]}
            onChange={(e) =>
              handleAction(ACTION.CHANGE_POSITION, iden, e.target.value, AXIS.Z)
            }
          />
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-sm text-gray-900">
        <div className="flex gap-2 items-center">
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            step="5"
            value={rotation[0]}
            onChange={(e) =>
              handleAction(ACTION.CHANGE_ROTATION, iden, e.target.value, AXIS.X)
            }
          />
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            step="5"
            value={rotation[1]}
            onChange={(e) =>
              handleAction(ACTION.CHANGE_ROTATION, iden, e.target.value, AXIS.Y)
            }
          />
          <input
            className="font-mono border border-gray-600 pl-2 h-6 w-16"
            type="number"
            step="5"
            value={rotation[2]}
            onChange={(e) =>
              handleAction(ACTION.CHANGE_ROTATION, iden, e.target.value, AXIS.Z)
            }
          />
        </div>
      </td>
    </tr>
  );
}

export default Text3DControl;
