import { useState } from 'react';
import LogoHamburger from './Logohamburger';
import NavLinks from './Navlinks';

const Navbar = ({ linkItems }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleClick = () => {
    setToggleMenu(!toggleMenu);
  };

  const attribute = 'className';
  const menuDiv = {
    [attribute]: `top-nav ${
      toggleMenu ? '' : 'hidden'
    } w-full md:bg-gray-800 md:inline-flex md:flex-grow md:h-auto md:w-auto`,
  };

  return (
    <nav
      className="flex justify-between w-full z-10 py-0 sticky top-0
     md:bg-gray-800 items-center md:px-1 flex-wrap md:h-auto"
    >
      <LogoHamburger handleClick={handleClick} />
      <div {...menuDiv}>
        <NavLinks linkItems={linkItems} />
      </div>
    </nav>
  );
};

export default Navbar;
