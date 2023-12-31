import React, { useState, useEffect } from 'react'
import mascot from '../../assets/png/mascot.png';
import Swal from 'sweetalert2'
import validator from "validator";
import Tooltip from '@mui/material/Tooltip';

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birth: '',
    role: 'user'
  })

  const validateForm = () => {
    const isEmailValid = validator.isEmail(registerData.email);
    const isPasswordValid = registerData.password.length >= 8 && registerData.password === registerData.confirmPassword;
    const isBirthValid = registerData.birth && registerData.birth.length >= 8;

    return isEmailValid && isPasswordValid && isBirthValid;
  };


  const postRegisterData = async () => {
    console.log(registerData)
    try {
      const response = await fetch('http://localhost:3001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData)
      })
      if (response.ok) {
        console.log("the post has been uploaded");
        Swal.fire({
          title: 'Upload Successfuly',
          text: 'Your post will show up at the main page soon.',
          icon: 'success',
          //timer: 3000,
          confirmButtonText: 'OK',
        })
      } else {
        console.log("Fail to register please try again.");
        Swal.fire({
          title: 'Register Failed',
          text: 'Fail to register please try again.',
          icon: 'error',
          timer: 3000,
          confirmButtonText: 'OK',
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Register Failed',
        text: error.message,
        icon: 'error',
        timer: 3000,
        confirmButtonText: 'OK',
      })
    }
  }

  const onRegisterSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    console.log(isFormValid);
    isFormValid ? postRegisterData() : Swal.fire({
      title: 'Form Invalid',
      text: "",
      icon: 'error',
      timer: 3000,
      confirmButtonText: 'OK',
    });
  }

  
  useEffect(() => {
    // This effect runs whenever registerData.password changes
    console.log(registerData.password);
  }, [registerData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
  };

  return (
    <div>
      <form action="" className='flex flex-col space-y-1'>
        <label htmlFor="" className='font-bold'>Username</label>
        <input name='username' onChange={handleChange} type="text" className=" placeholder-InactivePrimary border border-PrimaryColors p-2 text-PrimaryColors bg-[transparent] rounded-r-myConf" placeholder='enter username here.' />
        <label htmlFor="" className='font-bold'>email</label>
        <input name='email' onChange={handleChange} type="email" className=" placeholder-InactivePrimary border border-PrimaryColors p-2 text-PrimaryColors bg-[transparent] rounded-r-myConf" placeholder='Example@mail.com' />
        <label htmlFor="" className='font-bold'>password</label>
        <Tooltip arrow title="password must greater than 8 character and atleast 1 uppercase."><input name='password' onChange={handleChange} type="password" className=" placeholder-InactivePrimary border border-PrimaryColors p-2 text-PrimaryColors bg-[transparent] rounded-r-myConf" placeholder='enter password here.' /></Tooltip>
        <label htmlFor="" className='font-bold'>confIrm password</label>
        <input name='confirmPassword' onChange={handleChange} type="password" className=" placeholder-InactivePrimary border border-PrimaryColors p-2 text-PrimaryColors bg-[transparent] rounded-r-myConf" placeholder='enter password here.' />
        <label htmlFor="" className='font-bold'>Birth</label>
        <input name='birth' onChange={handleChange} type="date" className=" placeholder-InactivePrimary border border-PrimaryColors p-2 text-PrimaryColors bg-[transparent] rounded-r-myConf" placeholder='enter password here.' />
        <div className='pt-5 flex items-center justify-between'>
          <button onClick={onRegisterSubmit} type='submit' className='p-1 bg-PrimaryColors text-PrimaryBG text-xl font-bold rounded-r-myConf border-2 border-PrimaryColors w-[35%] hover:text-PrimaryColors hover:border-2 hover:bg-[transparent]'>register</button>
          <a href="">forgot password?</a>
        </div>
      </form>
    </div>
  );
}

function RegisterModal(props) {
  return (
    <div className={`${props.isShowModal ? '' : 'hidden'} backdrop-blur-sm fixed z-[1] bg-PrimaryBG/[.50] inset-0 h-[100%] flex justify-center items-center`}>
      <div className=" p-4 w-full max-h-full flex flex-row">
        <div className="p-10 flex flex-col justify-between bg-PrimaryColors border-2 border-PrimaryColors shadow text-PrimaryBG rounded-l-myConf font-body space-y-5 w-[50%]">
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