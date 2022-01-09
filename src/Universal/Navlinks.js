import Navlinkcomponent from './Navlinkcomponent';
const NavLinks = ({ linkItems }) => {
  return (
    <div className="flex flex-col h-auto bg-gray-700 w-auto text-center justify-between md:rounded-0 md:bg-gray-800 md:h-auto md:inline-flex md:flex-row md:ml-auto">
      {linkItems.map((data) => (
        <Navlinkcomponent key={data} linkItem={data} />
      ))}
      {/* <Navlinkcomponent linkItem={} />
      <Navlinkcomponent linkItem={} />
      <Navlinkcomponent linkItem={} />
      <Navlinkcomponent linkItem={} /> */}
    </div>
  );
};

export default NavLinks;
