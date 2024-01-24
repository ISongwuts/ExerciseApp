import React, { useState, useEffect } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdDashboard, MdUpload } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { Divider } from '@mui/material';
import { Skeleton } from '@mui/material';
import Cookies from 'js-cookie';

const NavigateSection = ({ onChange, hide }) => {
    const [currentNavigate, setCurrentNavigate] = useState(0);
    const navigateList = [
        { name: "Dashboard", icon: <MdDashboard className='text-2xl' />, function: () => onNavigateChange(0) },
        { name: "Database", icon: <FaDatabase className='text-2xl' />, function: () => onNavigateChange(1) },
        { name: "Upload", icon: <MdUpload className='text-2xl' />, function: () => onNavigateChange(2) }
    ];
    const onNavigateChange = (index) => {
        onChange(index);
        setCurrentNavigate(index);
    }
    return (
        <ul className='flex flex-col w-full'>
            {
                navigateList.map((item, index) => (
                    <li onClick={item.function} 
                        className={`hover:bg-[#151515] p-4 hover:text-PrimaryColors ${currentNavigate === index ? 'text-PrimaryColors bg-[#151515] border-r-4' : 'text-InactivePrimary'}  cursor-pointer`} 
                        key={index}>
                            <a className={`flex items-center ${hide ? 'justify-center' : null} text-lg gap-2 `}>
                                {!hide ? <MdKeyboardArrowRight className='text-2xl' /> : null}
                                {item.icon}
                                {!hide ? <span>{item.name}</span> : null}
                            </a>
                    </li>
                ))
            }
        </ul>
    );
}

function SideNavBar({ onChange }) {
    const [isHide, setIsHide] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => {
        setTimeout(() => {
            const userDataFromCookie = Cookies.get('userData');
            const parsedUser = JSON.parse(userDataFromCookie);
            setUser(parsedUser);
        }, 1000);
    }, []);

    const onHideNavBarHandler = () => {
        setIsHide(!isHide);
    }

    useEffect(() => {
        // This useEffect will log the updated user after the state has been set
        if (user) {
            setLoading(false);
        }
    }, [user]);

    return (
        <div className={`${isHide ? 'w-[5%]' : 'w-[15%]'} flex flex-col bg-[#202020] transition-all duration-300`}>
            <div className='flex p-4 items-center justify-around'>
                <div className='border-PrimaryColors border p-3 rounded-btn'>Admin</div>

                {!isHide ? <div className='flex flex-col'>
                    <span className='font-bold'>{loading ? <Skeleton animation="wave" width={75} /> : user.user.username}</span>
                    <span className='text-InactivePrimary text-xs'>{loading ? <Skeleton animation="wave" width={75} /> : user.user.birth.split("T")[0]}</span>
                </div> : null}
                <a className='cursor-pointer ' onClick={onHideNavBarHandler}>
                    {isHide ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
                </a>
            </div>
            <div className=' pr-3 pl-3'>
                <Divider />

            </div>
            {!isHide ? <label className='pr-4 pl-4 pt-2 pb-2 text-sm' htmlFor="Navigate">Navigate</label> : null}
            <NavigateSection hide={isHide} onChange={onChange} />
        </div>
    )
}

export default SideNavBar