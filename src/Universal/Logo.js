import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="p-0 inline-flex items-center text-white">
      <img src="images/logo2.png" alt="Logo" className="w-10 h-9 mr-2" />
      <span className="text-lg font-bold uppercase tracking-wide">Akera</span>
    </Link>
  );
};

export default Logo;
