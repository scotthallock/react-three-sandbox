const NavButton = ({ handleClick, text }) => (
  <button
    className="z-50 h-[24px] bg-zinc-900 text-gray-200 hover:text-emerald-500 rounded-[10px] px-4 whitespace-nowrap shadow-md"
    onClick={handleClick}
  >
    {text}
  </button>
);

export default NavButton;
