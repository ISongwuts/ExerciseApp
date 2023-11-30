import React from 'react';
import { useNavigate } from 'react-router-dom';
import mascot from '../../assets/png/mascot.png';

function HomePage() {
    const navigate = useNavigate();
    const directToContentPage = () => {
        navigate('/content')
        console.log("0")
    }

    return (
        <div className="grid xl:grid-cols-2 max-sm:grid-rows-2 text-PrimaryColors xl:p-28 max-xl:p-24 max-lg:p-16 max-sm:p-9 font-body ml-4 mr-4">
            <div className="grid content-center">
                <span className="xl:text-6xl max-xl:text-6xl max-lg:text-5xl max-sm:text-3xl font-bold">
                    Get body healthy with the perfect exercises
                </span>
                <br />
                <span className="xl:text-3xl lg:text-2xl sm:text-xl font-bold text-InactivePrimary indent-16">
                    This is some words for random testing before replacing it with real content
                </span>
                <div className="flex lg:mt-9 max-lg:mt-6 max-sm:flex-col xl:flex-row xl:justify-start max-xl:justify-center">
                    <div>
                        <button
                            className="xl:h-16 max-xl:h-16 max-lg:h-14 max-sm:h-10 w-[12rem] rounded-myConf xl:text-3xl max-xl:text-3xl max-lg:text-2xl max-sm:text-xl font-bold uppercase text-PrimaryBG bg-PrimaryColors border-2 border-PrimaryColors lg:inline-block hover:text-PrimaryColors hover:border-2 hover:bg-[transparent] duration-200"
                            type="button"
                            data-ripple-light="true"
                            onClick={()=>directToContentPage()}
                        >
                            <span>See Post</span>
                        </button>
                    </div>

                    <div className='flex px-5 '>
                        <a href="#" className="self-center xl:text-2xl lg:text-xl sm:text-lg border-b-2 border-PrimaryColors ">
                            Not a member?
                        </a>
                    </div>

                </div>
            </div>
            <div className="grid place-items-center">
                <img src={mascot} className="xl:w-128 max-xl:w-[24rem] max-lg:w-[20rem] max-sm:w-[18rem] max-lg:m-10 lg:p-10" alt="Toggle Icon" />
            </div>
        </div>
    );
}

export default HomePage;
