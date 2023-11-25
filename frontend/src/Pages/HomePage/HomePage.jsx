import React from 'react';
import mascot from '../../assets/png/mascot.png'

function HomePage() {
    return (
        <div className='flex flex-col justify-between h-auto'>
            <div className="grid grid-cols-2 text-PrimaryColors p-28 font-body ml-16 mr-16">
                <div className="grid content-center">
                    <span className="text-6xl font-bold">
                        Get body healthy with the perfect exercises
                    </span>
                    <br />
                    <span className="text-3xl font-bold text-InactivePrimary indent-16">
                        This is some words for random testing before replacing it with real content
                    </span>
                    <div className='mt-9'>
                        <button
                            className="middle none center hidden rounded-myConf py-2 px-4 text-3xl font-bold uppercase text-PrimaryBG bg-PrimaryColors border-2 lg:inline-block hover:text-PrimaryColors hover:border-2 hover:bg-PrimaryBG duration-200"
                            type="button"
                            data-ripple-light="true"
                        >
                            <span>See Post</span>
                        </button>
                        <a href="#" className='text-2xl border-b-2 border-PrimaryColors m-10'> Not a member?</a>
                    </div>
                </div>
                <div className='grid place-items-center'>
                    <img src={mascot} className=' w-128' alt="Toggle Icon" />
                </div>
            </div>
        </div>

    );
}

export default HomePage;
