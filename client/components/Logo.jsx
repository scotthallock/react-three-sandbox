const Logo = () => (
  <div className="relative flex flex-row items-center select-none py-[12px] font-mono">
    <div className="absolute w-[54px] h-[54px] left-1/2 transform -translate-x-1/2 skew-y-6 rounded-[6px] p-[2px] bg-gradient-to-br from-blue-400 via-cyan-400 to-emerald-500">
      <div className="flex h-full w-full bg-transparent bg-zinc-800 rounded-[4px]"></div>
    </div>
    <h1 className="text-3xl bg-zinc-800 text-gray-200 -skew-y-12 [text-shadow:_2px_4px_3px_rgb(0_0_0_/_40%)]">
      EZ
    </h1>
    <h1 className="text-3xl bg-zinc-800 text-gray-200 -skew-y-12 [text-shadow:_2px_4px_3px_rgb(0_0_0_/_40%)]">
      3D
    </h1>
  </div>
);

export default Logo;
