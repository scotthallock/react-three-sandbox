import { useRef, useEffect } from 'react';
import { useTransition } from 'react-transition-state';

const NavButton = ({ children, text }) => {
  const ref = useRef();
  const [{ status, isMounted }, toggle] = useTransition({
    timeout: 200,
    mountOnEnter: true,
    unmountOnExit: true,
    preEnter: true,
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        // If the menu is open and the user clicks outside of the menu, close the menu
        toggle(false);
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        className="z-50 h-[24px] bg-zinc-900 text-gray-200 hover:text-emerald-500 rounded-[10px] px-4 shadow-md"
        onClick={() => toggle()}
      >
        {text}
      </button>
      {children && isMounted && (
        /* This div is the dropdown menu */
        <div
          className={`absolute transition-all duration-200 ${
            status === 'preEnter' || status === 'exiting'
              ? 'transform -translate-y-2 opacity-0 pointer-events-none'
              : ''
          } p-[10px] top-[30px] right-0 z-30 bg-zinc-900 text-gray-200 rounded-[10px] shadow-xl flex flex-col align-left gap-[6px]`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default NavButton;
