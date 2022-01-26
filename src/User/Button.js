const Button = ({ handleOkayButton, handleCancelButton, cost }) => {
  return (
    <div
      className="inline-flex justify-between text-black w-full 
    rounded-lg bg-purple-300"
    >
      <button
        className=" py-2 w-1/4 text-left pl-3 hover:bg-purple-500 hover:text-white rounded-l-lg"
        onClick={handleCancelButton}
      >
        Cancel
      </button>
      <p className="bg-purple-500 w-2/4 text-center font-sans text-2xl text-white">
        {cost}
      </p>
      <button
        className="py-2 w-1/4 text-right pr-3 hover:bg-purple-500 hover:text-white rounded-r-lg"
        onClick={handleOkayButton}
      >
        Okay
      </button>
    </div>
  );
};

export default Button;
