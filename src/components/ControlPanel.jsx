import { useState } from 'react';
import InputText from './InputText';
import InputNumber from './InputNumber';
import InputNumberMultiple from './InputNumberMultiple';
import InputColor from './InputColor';
import InputTextArea from './InputTextArea';
import InputCheckbox from './InputCheckbox';
import InputSelect from './InputSelect';

const ControlPanel = () => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div
        className="w-[24px] shrink-0 min-h-[280px] py-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] gap-[6px] flex justify-center rounded-[10px] cursor-pointer shadow-md"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="[writing-mode:vertical-lr] [text-orientation:mixed] whitespace-nowrap truncate">
          {name}
        </span>
      </div>
    );
  }

  return (
    <div className="w-min py-[10px] rounded-[10px] bg-zinc-900 text-gray-400 font-mono text-[11px] flex flex-col gap-[6px] shadow-md">
      <InputText
        label="name"
        value={'hello'}
        handleChange={() => console.log('CHANGE NAME')}
      />

      <InputSelect
        label="geometry"
        options={['3D Text', '2D Text', 'Box', 'Sphere']}
        handleChange={(e) => console.log(e.target.value)}
      />

      <InputTextArea
        label="text"
        value="hey there"
        handleChange={() => console.log('CHANGE TEXTAREA')}
      />

      <InputCheckbox
        label="wireframe"
        handleChange={() => console.log('CHANGE CHECKBOX')}
      />

      <InputSelect
        label="material"
        options={[1, 2, 3]}
        handleChange={(e) => console.log(e.target.value)}
      />

      <InputColor
        label="color"
        value="#ff0000"
        handleChange={() => console.log('CHANGE COLOR')}
      />

      <InputNumber
        label="scale"
        value={1}
        handleChange={() => console.log('CHANGE SCALE')}
      />

      <InputNumberMultiple
        label="position"
        symbols={['x', 'y', 'z']}
        values={[1, 2, 3]}
        handleChanges={[
          () => console.log('CHANGE NUM 1'),
          () => console.log('CHANGE NUM 2'),
          () => console.log('CHANGE NUM 3'),
        ]}
      />

      <InputNumberMultiple
        label="rotation"
        symbols={['x', 'y', 'z']}
        values={[1, 2, 3]}
        handleChanges={[
          () => console.log('CHANGE NUM 1'),
          () => console.log('CHANGE NUM 2'),
          () => console.log('CHANGE NUM 3'),
        ]}
      />

      <div className="flex items-center w-[260px] min-h-[24px] px-[10px] gap-[6px]">
        <button
          className="grow h-[24px] bg-emerald-700 text-white rounded-[3px]"
          onClick={() => setCollapsed(!collapsed)}
        >
          collapse
        </button>
        <button className="grow h-[24px] bg-emerald-700 text-white rounded-[3px]">
          duplicate
        </button>
        <button className="grow h-[24px] bg-transparent text-red-500 rounded-[3px]">
          delete
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
