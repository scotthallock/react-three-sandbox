const DropdownMenu = ({ children }) => (
  <div className="absolute p-[10px] top-[30px] right-0 z-50 bg-zinc-900 text-gray-200 rounded-[10px] shadow-md flex flex-col align-left gap-[6px]">
    {children}
  </div>
);

export default DropdownMenu;
