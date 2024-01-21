import React from 'react';
import { motion } from 'framer-motion';
import { IoIosMail } from 'react-icons/io';
import { IoLogOutSharp } from 'react-icons/io5';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { FaUser } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';

function ProfilePage() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state;

    const onLogoutHandler = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log me out!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: false,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Logged out!', 'See you again next time.', 'success');
                logout();
                navigate('/');
            }
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 2 } },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex w-full m-10 h-full font-body justify-center"
        >
            <span className="text-md font-bold fixed text-end flex items-center">
                {userData.role === 'user' ? <FaUser /> : <RiAdminFill />}
                {userData.role}
            </span>
            <div className="flex bg-PrimaryColors h-fit p-6 w-full space-x-3">
                <motion.div
                    className="text-5xl bg-PrimaryBG text-center font-bold text-PrimaryColors p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    IS
                </motion.div>
                <motion.div
                    className="flex flex-col mx-3 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                >
                    <span className="text-3xl font-bold">@{userData.username}</span>
                    <div className="flex items-center text-lg">
                        <IoIosMail /> <span>{userData.email}</span>
                    </div>
                    <div className="text-xs">{userData.birth.split('T')[0]}</div>
                </motion.div>
                <motion.div
                    className="flex flex-col mx-3 justify-center "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.4 } }}
                >
                    <Tooltip title="Log Out">
                        <button onClick={onLogoutHandler} className="text-4xl text-PrimaryBG">
                            <IoLogOutSharp />
                        </button>
                    </Tooltip>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default ProfilePage;
