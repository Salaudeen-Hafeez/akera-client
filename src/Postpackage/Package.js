import usePackageForm from './usePackageForm';
import validateForm from '../Universal/ValidateForm';
import PackageComponent from './Packagecomponent';
import Logo from '../Universal/Logo';
import CheckboxComponent from './Chechbox';
import PlaceAutocomplete from '../Placeautocomplete';
import { Link } from 'react-router-dom';

const Package = () => {
  const { handleChange, handleSubmit, isLoading, values, error } =
    usePackageForm(validateForm);
  const usePackageFormData = {
    handleChange,
    values,
    error,
  };
  return (
    <div
      className='flex items-center bg-gray-100 
    justify-center w-full h-screen'
    >
      <form
        onSubmit={handleSubmit}
        className='bg-gray-800 text-white rounded-md 
        min-h-max w-4/5 shadow-2xl md:w-2/5'
      >
        <div className='flex justify-between'>
          <Logo />
          <Link
            to={'/dashboard'}
            className='text-lg py-2 text-gray-300 underline px-4'
          >
            dashboard
          </Link>
        </div>

        <div
          className='flex flex-col items-left justify-center
        bg-gray-800 text-white px-10 text-sm h-4/5 rounded-md'
        >
          <div className='text-center'>
            <h2 className='mb-6 text-lg font-bold'>Add new package</h2>
            <p className='mb-4'>
              Kindly fill the form below to add new package order
            </p>
          </div>
          {isLoading && <h2>Loading....</h2>}
          <small className='text-red-600 font-bold brightness-105'>
            {Object.keys(error).length > 0 && error.errMessage}
          </small>
          <div>
            <PackageComponent
              data={usePackageFormData}
              label={'Package name'}
              inputName={'name'}
            />
            <PlaceAutocomplete
              data={usePackageFormData}
              label={'Location'}
              inputName={'location'}
              key={'location'}
            />
            <PlaceAutocomplete
              data={usePackageFormData}
              label={'Destination'}
              inputName={'destination'}
              key={'destination'}
            />
            <PackageComponent
              data={usePackageFormData}
              label={'Sender mobile'}
              inputName={'sender'}
            />
            <PackageComponent
              data={usePackageFormData}
              label={'Reciever mobile'}
              inputName={'reciever'}
            />
            <CheckboxComponent
              data={usePackageFormData}
              label={'Is frajile'}
              inputName={'frajile'}
            />
          </div>
          <input
            type='submit'
            className='mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-900'
            id='submitBtn'
            value='Add package'
          />
        </div>
      </form>
    </div>
  );
};

export default Package;
