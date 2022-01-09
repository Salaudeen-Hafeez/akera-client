import { Link } from 'react-router-dom';
const PageNotFound = () => {
  return (
    <div className="flex font-sans items-center bg-gray-300 w-screen h-screen justify-center">
      <div className="relative z-10 bg-white bg-opacity-50 backdrop-filter h-2/4 w-5/6 md:w-3/5 md:h-3/5 flex flex-col items-center justify-center rounded-full">
        <h1 className="mb-14 text-red-400 text-8xl">Oops!</h1>
        <p className="text-4xl text-red-900 font-bold my-5">page not found</p>
        <Link
          to={'/'}
          className="mt-5 bg-blue-700 py-3 px-5 rounded-lg text-white "
        >
          Go to home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
