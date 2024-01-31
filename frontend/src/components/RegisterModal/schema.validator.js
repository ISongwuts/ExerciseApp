import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required').max(20, 'Username must be at most 20 characters'),
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().required('ConfIrm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
  birth: yup.date().required('Birth date is required'),
});

export default schema;