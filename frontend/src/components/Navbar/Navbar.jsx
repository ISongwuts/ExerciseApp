import React, { useState } from 'react';
import sunIcon from '../../assets/svg/icons/sun.svg';
import moonIcon from '../../assets/svg/icons/moon.svg';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const [isSunIcon, setIsSunIcon] = useState(true);
    const location = useLocation();

    const toggleIcon = () => {
        setIsSunIcon(!isSunIcon);
    };

    const currentIcon = isSunIcon ? sunIcon : moonIcon;

    const NavbarItemsList = [
        { path: '/', label: 'Home' },
        { path: '/content', label: 'Content' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="w-full h-24 bg-PrimaryBG py-2 px-4 text-black shadow-md backdrop-blur-2xl backdrop-saturate-200 font-body border-b-1">
            <div className="container mx-auto flex items-center justify-between h-full">
                <Link to="/" className="mr-4 text-PrimaryColors block cursor-pointer py-1 text-5xl font-bold text-inherit antialiased items-center">
                    <span>Exercise</span>
                </Link>
                <div className='flex items-center gap-7 lg:flex'>
                    <ul className="flex items-center gap-6 lg:flex text-InactivePrimary">
                        {NavbarItemsList.map((item, index) => (
                            <li key={index} className={`block p-1 text-3xl font-bold text-inherit antialiased ${location.pathname === item.path ? 'text-PrimaryColors' : ''}`}>
                                <Link to={item.path} className="flex items-center hover:text-PrimaryColors focus:text-PrimaryColors">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a href="#"><img src={currentIcon} className='w-10 h-10' alt="Toggle Icon" onClick={toggleIcon} /></a>
                        </li>
                    </ul>
                    <button
                        className="middle none center hidden rounded-myConf py-2 px-4 text-3xl font-bold uppercase text-PrimaryBG bg-PrimaryColors border-2 lg:inline-block hover:text-PrimaryColors hover:border-2 hover:bg-PrimaryBG duration-200"
                        type="button"
                        data-ripple-light="true"
                    >
                        <span>Login</span>
                    </button>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
