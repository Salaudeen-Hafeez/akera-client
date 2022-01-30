import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="p-0 inline-flex items-center text-white">
      <img src="images/logo2.png" alt="Logo" className="w-14 h-10 mr-2" />
      <span className="font-bold uppercase tracking-wide">Akera Logistics</span>
    </Link>
  );
};

export default Logo;
