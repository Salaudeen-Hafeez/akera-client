import About from './About';
import Maincomponent from './Miancomponent';
const Main = ({ message }) => {
  return (
    <main>
      <div className="md:flex md:justify-center md:items-center md:w-full bg-gray-200 ">
        <div className="md:grid md:grid-cols-2 md:grid-flow-rows md:gap-3 md:w-4/5 md:col-start-2 list-none md:mt-4">
          <Maincomponent
            itemImage={'images/packaging.jpeg'}
            className="shadow-lg"
            message={message.packaging}
          />
          <Maincomponent
            itemImage={'images/sealing1.jpeg'}
            className="shadow-lg"
            message={message.seal}
          />
          <Maincomponent
            itemImage={'images/transport.jpeg'}
            className="shadow-lg"
            message={message.transport}
          />
          <Maincomponent
            itemImage={'images/delivered1.jpeg'}
            className="shadow-lg"
            message={message.deliver}
          />
          <About />
        </div>
      </div>
    </main>
  );
};

export default Main;
