import React, { useState, useEffect } from 'react';
import TableComponent from "./DatabaseTable";
import axios from 'axios';
import LiveSearch from './LiveSearch';

const UserTable = ({ modifier }, props) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableHeaders = ['user_id', 'username', 'password', 'email', 'birth', 'role'];
    const [search, setSearch] = useState('');

    const onSearchChange = (value) => {
        setSearch(value);
        console.log(search);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get(`http://localhost:3001/api/user`, {
                    headers: {
                        'authorization': `bearer ${token}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 10000);
            }
        };
        fetchData();
    }, [loading]);

    useEffect(() => {
        console.log(search);
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get(`http://localhost:3001/api/user/search/?search=${search}`, {
                    headers: {
                        'authorization': `bearer ${token}`
                    }
                });
                const result = await response.data;
                setUserData(result);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchData();
    }, [search]);

    useEffect(() => {
        setLoading(props.isDeleting);
    }, [props.isDeleting]);

    return (
        <div className='flex flex-col gap-4'>
            <LiveSearch onSearchChange={onSearchChange} value={search} />
            <TableComponent
                headers={tableHeaders}
                modifierButtons={modifier}
                isLoading={loading}
                data={userData}
            />
        </div>
    );
};

export default UserTable;