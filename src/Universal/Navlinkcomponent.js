import { Link } from 'react-router-dom';

const Navlinkcomponent = ({ linkItem }) => {
  const attribute = 'to';
  const variableAttribute = {
    [attribute]: linkItem.trim() === 'home' ? '/' : `/${linkItem}`,
  };
  return (
    <Link
      {...variableAttribute}
      className="text-white p-1.5 md:hover:bg-gray-900 md:hover:text-white md:inline-flex md:w-auto md:text-gray-300"
    >
      <span>{linkItem}</span>
    </Link>
  );
};

export default Navlinkcomponent;
