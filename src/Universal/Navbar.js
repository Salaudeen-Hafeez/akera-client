import { Link } from 'react-router-dom';
import Logo from './Logo';
const Navbar = ({ linkItems }) => {
  return (
    <nav
      className="flex justify-between w-full h-14 z-10 px-1 bg-gray-800 sticky top-0
     md:bg-gray-800 items-center"
    >
      <Logo />
      <div className="text-white">
        {linkItems.map((link) => {
          return (
            <Link
              to={`/${link}`}
              key={link}
              className="text-lg pr-3 underline md:pr-4"
            >
              {link}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
