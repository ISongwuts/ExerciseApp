import React from 'react';
import mascot from '../../assets/png/mascot.png';
import Swal from 'sweetalert2';
import { useForm, Controller } from 'react-hook-form';
import schema from './schema.validator';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:3001/api/user/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log("the post has been uploaded");
        Swal.fire({
          title: 'Upload Successfully',
          text: 'Your post will show up on the main page soon.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        console.log("Fail to register, please try again.");
        Swal.fire({
          title: 'Register Failed',
          text: 'Fail to register, please try again.',
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
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-1'>
      <label htmlFor="" className='font-bold'>Username</label>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className={`placeholder-InactivePrimary border p-2 border-PrimaryColors text-PrimaryColors bg-[transparent] rounded-r-myConf`}
            placeholder='enter username here.'
          />
        )}
      />
      {errors.username && <p className='heroError'>*{errors.username.message}</p>}

      <label htmlFor="" className='font-bold'>Email</label>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className={`placeholder-InactivePrimary border p-2 ${errors.email ? 'border-red-500' : 'border-PrimaryColors text-PrimaryColors'} bg-[transparent] rounded-r-myConf`}
            placeholder='Example@mail.com'
          />
        )}
      />
      {errors.email && <p className='heroError'>*{errors.email.message}</p>}

      <label htmlFor="" className='font-bold'>Password</label>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="password"
            className={`placeholder-InactivePrimary border p-2 ${errors.password ? 'border-red-500' : 'border-PrimaryColors text-PrimaryColors'} bg-[transparent] rounded-r-myConf`}
            placeholder='enter password here.'
          />
        )}
      />
      {errors.password && <p className='heroError'>*{errors.password.message}</p>}

      <label htmlFor="" className='font-bold'>ConfIrm Password</label>
      <Controller
        name="confirPassword"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="password"
            className={`placeholder-InactivePrimary border p-2 ${errors.confirmPassword ? 'border-red-500' : 'border-PrimaryColors text-PrimaryColors'} bg-[transparent] rounded-r-myConf`}
            placeholder='enter password here.'
          />
        )}
      />
      {errors.confirmPassword && <p className='heroError'>{errors.confirmPassword.message}</p>}

      <label htmlFor="" className='font-bold'>Birth</label>
      <Controller
        name="birth"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="date"
            className={`placeholder-InactivePrimary border p-2 ${errors.birth ? 'border-red-500' : 'border-PrimaryColors text-PrimaryColors'} bg-[transparent] rounded-r-myConf`}
            placeholder='enter password here.'
          />
        )}
      />
      {errors.birth && <p className='heroError'>*{errors.birth.message}</p>}

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