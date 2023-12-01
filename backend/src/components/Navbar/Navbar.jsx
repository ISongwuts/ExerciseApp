import React, { useState } from 'react';
import sunIcon from '../../assets/svg/icons/sun.svg';
import moonIcon from '../../assets/svg/icons/moon.svg';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { BsFileEarmarkPost } from "react-icons/bs";

function Navbar(props) {
    const [isSunIcon, setIsSunIcon] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const location = useLocation();

    const toggleIcon = () => {
        setIsSunIcon(!isSunIcon);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        console.log(isMobileMenuOpen)
    };

    const currentIcon = isSunIcon ? sunIcon : moonIcon;

    const NavbarItemsList = [
        { path: '/', label: 'Dashboard', icon: <MdDashboard /> },
        { path: '/database', label: 'Database', icon: <FaDatabase />  },
        { path: '/post', label: 'Post', icon: <BsFileEarmarkPost />  },
    ];

    const DropDownMenu = (props) => {
        return (
            <div className={`${props.isMenuOpen || props.isHover ? 'flex' : 'hidden'} 
                z-10 text-InactivePrimary flex-col bg-[#202020] m-5 p-5 
                border border-PrimaryColors rounded-b-myConf w-[auto] `}>
                {NavbarItemsList.map((item, index) => (
                    <li
                        key={index}
                        className={`block p-1 text-3xl font-bold text-inherit antialiased ${location.pathname === item.path
                            ? 'text-PrimaryColors'
                            : ''
                            }`}
                    >
                        <Link
                            to={item.path}
                            className="flex items-center hover:text-PrimaryColors focus:text-PrimaryColors"
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    </li>
                ))}
            </div>
        );
    }

    return (
        <nav className="h-24 bg-[transparent] py-2 px-4 text-black shadow-md backdrop-blur-2xl  font-body border-b-1">
            <div className="container mx-auto flex items-center justify-between h-full">
                <Link
                    to="/"
                    className="mr-4 text-PrimaryColors block cursor-pointer py-1 text-5xl font-bold text-inherit antialiased items-center"
                >
                    <span>Exercise</span>
                </Link>
                <div className="items-center gap-7 max-xl:hidden lg:flex">
                    <ul
                        className=" flex items-center gap-6 text-InactivePrimary"
                    >
                        {NavbarItemsList.map((item, index) => (
                            <li
                                key={index}
                                className={`block p-1 text-3xl font-bold text-inherit antialiased ${location.pathname === item.path
                                    ? 'text-PrimaryColors'
                                    : ''
                                    }`}
                            >
                                <Link
                                    to={item.path}
                                    className="flex items-center hover:text-PrimaryColors focus:text-PrimaryColors"
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <a href="#" onClick={props.themeModeHandler}>
                                <img
                                    src={currentIcon}
                                    className="w-10 h-10"
                                    alt="Toggle Icon"
                                    onClick={toggleIcon}
                                />
                            </a>
                        </li>
                        <button
                            className=" rounded-myConf py-2 px-4 text-3xl font-bold uppercase text-PrimaryBG bg-PrimaryColors border-2 border-PrimaryColors lg:inline-block hover:text-PrimaryColors hover:border-2 hover:bg-[transparent] duration-200"
                            type="button"
                            data-ripple-light="true"
                        >
                            <span>Back</span>
                        </button>
                    </ul>

                </div>
                <div className="lg:hidden">
                    <button
                        id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover"
                        type="button"
                        onClick={toggleMobileMenu}
                        className="text-PrimaryColors text-4xl focus:outline-none"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        &#9776;
                    </button>
                </div>
            </div>
            <DropDownMenu isMenuOpen={isMobileMenuOpen} isHover={isHovered}/>
        </nav>
    );
}

export default Navbar;
