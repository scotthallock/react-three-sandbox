import { useState, useRef, useEffect } from 'react';

const NavButton = ({ children, text }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        // If the menu is open and the user clicks outside of the menu,
        // close the menu
        setOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        className="h-[24px]  bg-zinc-900 text-gray-200 hover:text-emerald-500 rounded-[10px] px-4 shadow-md"
        onClick={() => setOpen(!open)}
      >
        {text}
      </button>
      {/* props.children is the dropdown menu */}
      {open && children}
    </div>
  );
};

export default NavButton;
