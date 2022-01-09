const Maincomponent = ({ itemImage, message }) => {
  return (
    <div className="w-full text-center rounded shadow-lg bg-mainbg">
      <img src={itemImage} alt="Item" className="h-3/5 w-full" />
      <div className="pt-3 pb-4">
        <h2 className="font-bold text-lg py-2">{message}</h2>
        <p className="px-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
          cumque vero nam ex sint at officia accusantium necessitatibus,
          accusamus excepturi.
        </p>
      </div>
    </div>
  );
};

export default Maincomponent;
