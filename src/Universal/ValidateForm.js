const validateForm = (values) => {
  let error = {};
  if (Object.keys(values).length === 0) {
    error = { message: 'Empty values entered' };
  } else {
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'frajile' && value === '') {
        return;
      }
      if (value === '') {
        if (key === 'password2') {
          error = {
            ...error,
            [key]: `password confirmation feild can not be blank`,
          };
        } else {
          error = {
            ...error,
            [key]: `${key.replace(/[^0-9a-z]/gi, '')} feild can not be blank`,
          };
        }
      } else if (key === 'password') {
        if (value.length < 6) {
          error = { ...error, [key]: 'password must be 6 or more character' };
        }
      } else if (key === 'password2') {
        if (value.length < 6) {
          error = { ...error, [key]: 'password must be 6 or more character' };
        } else if (value !== values.password) {
          error = { ...error, [key]: 'password does not match' };
        }
      } else if (key === 'email') {
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          error = { ...error, [key]: 'Invalid email address' };
        }
        values['email'] = value.toLowerCase();
      } else if (key === 'sender' || key === 'reciever') {
        if (
          !value.match(
            /^[+]?\d{2,}?[(]?\d{2,}[)]?[-\s.]?\d{2,}?[-\s.]?\d{2,}[-\s.]?\d{0,9}$/im
          )
        ) {
          error = { ...error, [key]: 'phone number not valid' };
        }
      }
    });
  }

  return error;
};

export default validateForm;
