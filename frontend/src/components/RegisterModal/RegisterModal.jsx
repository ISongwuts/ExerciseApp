import React from 'react';
import mascot from '../../assets/png/mascot.png';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch('http://localhost:3001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log("the post has been uploaded");
        Swal.fire({
          title: 'Upload Successfuly',
          text: 'Your post will show up at the main page soon.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        console.log("Fail to register please try again.");
        Swal.fire({
          title: 'Register Failed',
          text: 'Fail to register please try again.',
          icon: 'error',
          timer: 3000,
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Register Failed',
        text: error.message,
        icon: 'error',
        timer: 3000,
        confirmButtonText: 'OK',
      });
    }
  };

  const isEmailValid = (value) => validator.isEmail(value);
  const isPasswordValid = (value) => value.length >= 8;
  const isBirthValid = (value) => value && value.length >= 8;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-1'>
      <label htmlFor="" className='font-bold'>Username</label>
      <input {...register('username', { required: true, maxLength: 20 })} type="text" className={`placeholder-InactivePrimary border p-2 border-PrimaryColors  text-PrimaryColors bg-[transparent] rounded-r-myConf`} placeholder='enter username here.' />
      {errors.username && toast.error('Username is require.', {autoClose: 5000, toastId: 'username'})}
      <label htmlFor="" className='font-bold'>Email</label>
      <input {...register('email', { validate: isEmailValid, required: true })} type="text" className={`placeholder-InactivePrimary border p-2 ${errors.email ? 'border-red-500' : 'border-PrimaryColors text-PrimaryColors'} bg-[transparent] rounded-r-myConf`} placeholder='Example@mail.com' />
      {errors.email && toast.error('Invalid email address.', {autoClose: 5000, toastId: 'email'})}

      <label htmlFor="" className='font-bold'>Password</label>
      <Tooltip arrow title="password must be greater than 8 characters.">
        <input {...register('password', { validate: isPasswordValid, required: true })} type="password" className={`placeholder-InactivePrimary border p-2 ${errors.password ? 'border-red-500' : 'border-PrimaryColors text-PrimaryColors'} bg-[transparent] rounded-r-myConf`} placeholder='enter password here.' />
      </Tooltip>
      {errors.password && toast.error('Invalid password.', {autoClose: 5000, toastId: 'password'})}

      <label htmlFor="" className='font-bold'>Confirm Password</label>
      <input {...register('confirmPassword', { validate: (value) => value === getValues().password, required: true })} type="password" className={`placeholder-InactivePrimary border p-2 ${errors.confirmPassword ? 'border-red-500' : 'border-PrimaryColors text-PrimaryColors'} bg-[transparent] rounded-r-myConf`} placeholder='enter password here.' />
      {errors.confirmPassword && toast.error('Password do not match.', {autoClose: 5000, toastId: 'cmpwd'})}

      <label htmlFor="" className='font-bold'>Birth</label>
      <input {...register('birth', { validate: isBirthValid, required: true })} type="date" className={`placeholder-InactivePrimary border p-2 ${errors.birth ? 'border-red-500' : 'border-PrimaryColors text-PrimaryColors'} bg-[transparent] rounded-r-myConf`} placeholder='enter password here.' />
      {errors.birth && toast.error('Invalid birth date.', { toastId: 'birth' })}

      <div className='pt-5 flex items-center justify-between'>
        <button type='submit' className='p-1 bg-PrimaryColors text-PrimaryBG text-xl font-bold rounded-r-myConf border-2 border-PrimaryColors w-[35%] hover:text-PrimaryColors hover:border-2 hover:bg-[transparent]'>register</button>
        <a href="">forgot password?</a>
      </div>
    </form>
  );
};

function RegisterModal(props) {
  return (
    <div className={`${props.isShowModal ? '' : 'hidden'} backdrop-blur-sm fixed z-[1] bg-PrimaryBG/[.50] inset-0 h-[100%] flex justify-center items-center`}>
      <div className=" p-4 w-1/2 max-h-full flex flex-row">
        <div className="p-10 flex flex-col justify-evenly bg-PrimaryColors border-2 border-PrimaryColors shadow text-PrimaryBG rounded-l-myConf font-body space-y-5 w-[50%]">
          <div className=' h-auto text-center'>
            <span className='text-[3rem] font-bold'>exercise</span>
          </div>
          <div className='m-auto'>
            <img src={mascot} alt="" className="h-[20rem] w-[25rem]" />
          </div>
        </div>
        <div className="p-10 flex flex-col justify-between bg-PrimaryBG shadow border-2 border-PrimaryColors text-PrimaryColors rounded-r-myConf font-body space-y-5 w-[50%]">
          <div className=' h-auto text-center'>
            <span className='text-[3rem] font-bold'>Register</span>
          </div>
          <RegisterForm />
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-between items-center">
            <a href="#" className='font-bold' onClick={props.closeModalHandler}>close?</a>
            <button
              className='p-1 bg-PrimaryColors text-PrimaryBG text-xl font-bold border-2 border-PrimaryColors rounded-l-myConf w-[35%] hover:text-PrimaryColors hover:border-2 hover:bg-[transparent]'
              onClick={props.loginModalHandler}
            >Login</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RegisterModal