import { Link } from 'react-router-dom';
const Banner = () => {
  return (
    <div>
      <div className="text-right text-white bg-gray-700">
        <Link to={'signup'} className="text-lg pr-6 underline">
          sign-up
        </Link>
        <Link to={'login'} className="text-lg p-3 underline">
          login
        </Link>
      </div>
      <header id="showcase" className="">
        <div className="bg-banner w-full h-96 items-center flex flex-col justify-center">
          <div className="font-bold bg-mainbg rounded-lg bg-opacity-60 backdrop-filter ">
            <h1 className="text-center mb-4 px-0.5 text-xl font-bold">
              We deliver packages across the country
            </h1>
            <p className="px-5 text-center">
              You want your packages to get to your desire destination on time
              and safely? Leave the worries we've got you covered
            </p>
            <button className="py-2 text-center w-full">Read More</button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Banner;
