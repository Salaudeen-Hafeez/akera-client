import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="text-center py-4 md:px-40 w-full bg-blue-200 md:col-span-2">
      <h2 className="py-3 font-bold text-3xl">About</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
        distinctio, deleniti assumenda minus quis, natus cupiditate dignissimos
        in ea id
        <span>logomaker.thehoth.com/?project=33132701</span> perferendis ipsum
        iure eos, aliquam quam corrupti architecto. Itaque nisi tempora eius
        cumque cupiditate ullam, ratione possimus et placeat earum?
      </p>
      <p>
        click{' '}
        <Link to={'/signup'} className="underline">
          here
        </Link>{' '}
        to register
      </p>
    </div>
  );
};

export default About;
