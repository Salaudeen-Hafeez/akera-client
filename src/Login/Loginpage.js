import { Link } from 'react-router-dom';
const LoginPage = ({
  handleChange,
  handleSubmit,
  error,
  values,
  isLoading,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-white rounded-md h-4/5 shadow-2xl"
    >
      <a href="home.html" className="px-1 inline-flex items-center">
        <img src="images/logo2.png" alt="Logo" className="w-10 h-9 mr-2" />
        <span className="text-lg font-bold uppercase tracking-wide">
          Akera Logistics
        </span>
      </a>
      {isLoading && <h2 className="text-center mt-10">Loading...</h2>}
      <div
        className="flex flex-col items-left justify-center
         bg-gray-800 text-white px-10 text-sm h-4/5 rounded-md"
      >
        <div className="mb-10 text-center">
          <h2 className="text-lg font-bold">Login to Akera logistics</h2>
        </div>
        <div className="">
          <small className="text-red-600 font-bold brightness-105">
            {Object.keys(error).length > 0 && error.errMessage}
          </small>
          <div className="flex flex-col mb-4">
            <label className="pb-1">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="bg-gray-600 focus:bg-gray-800 h-6 hover:bg-gray-900"
              value={values.email}
              onChange={handleChange}
            />
            <small className="text-red-600 font-bold brightness-105">
              {error.email}
            </small>
          </div>
          <div className="flex flex-col mb-6">
            <label className="pb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-600 focus:bg-gray-800 h-6 hover:bg-gray-900"
              value={values.password}
              onChange={handleChange}
            />
            <small className="text-red-600 font-bold brightness-105">
              {error.password}
            </small>
          </div>
        </div>
        <input
          type="submit"
          className="mb-6 px-6 py-1 bg-gray-700 rounded hover:bg-gray-900"
          id="submitBtn"
          value="Login"
        />
        <p>
          Are you new to sendIT? {''}
          <Link
            to="/signup"
            className="text-blue-400 underline hover:text-green-400"
          >
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
