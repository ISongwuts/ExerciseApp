import React, { useState } from 'react';
import mascot from '../../assets/png/mascot.png';
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthProvider';

function LoginModal(props) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: usernameOrEmail, 
          password: password
        })
      })
      if (response.ok) {
        const userData = await response.json();
        login(userData);
        Swal.fire({
          title: 'Logged In Successfuly',
          text: 'Welcome to our site.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        props.closeModalHandler();
      } else {
        console.log("Fail to login please try again.");
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
        title: 'login Failed',
        text: error.message,
        icon: 'error',
        timer: 3000,
        confirmButtonText: 'OK',
      })
    }
  };

  return (
    <div className={`${props.isShowModal ? '' : 'hidden'} backdrop-blur-sm fixed z-[1] bg-PrimaryBG/[.50] inset-0 h-[100%] flex justify-center items-center`}>
      <div className="p-4 w-full max-h-full flex flex-row">
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
            <span className='text-[3rem] font-bold'>login</span>
          </div>
          <div>
            <form onSubmit={handleLogin} className='flex flex-col space-y-1'>
              <label htmlFor="" className='font-bold'>Username or email</label>
              <input
                type="text"
                className=" placeholder-InactivePrimary border border-PrimaryColors p-2 text-PrimaryColors bg-[transparent] rounded-r-myConf"
                placeholder='Example@mail.com'
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
              <label htmlFor="" className='font-bold'>Password</label>
              <input
                type="password"
                className="placeholder-InactivePrimary border border-PrimaryColors p-2 text-PrimaryColors bg-[transparent] rounded-r-myConf"
                placeholder='Enter password here.'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='pt-5 flex items-center justify-between'>
                <button
                  type="submit"
                  className='p-1 bg-PrimaryColors text-PrimaryBG text-xl font-bold rounded-r-myConf border-2 border-PrimaryColors w-[35%] hover:text-PrimaryColors hover:border-2 hover:bg-[transparent]'
                >
                  Login
                </button>
                <a href="">Forgot password?</a>
              </div>
            </form>
          </div>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-between items-center">
            <a href="#" className='font-bold' onClick={props.closeModalHandler}>Close?</a>
            <button
              className='p-1 bg-PrimaryColors text-PrimaryBG text-xl font-bold border-2 border-PrimaryColors rounded-l-myConf w-[35%] hover:text-PrimaryColors hover:border-2 hover:bg-[transparent]'
              onClick={props.registerModalHandler}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;