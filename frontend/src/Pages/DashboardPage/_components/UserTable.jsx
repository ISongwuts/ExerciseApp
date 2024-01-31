import React, { useState, useEffect } from 'react';
import TableComponent from "./DatabaseTable";
import axios from 'axios';

const UserTable = ({ modifier }, props) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableHeaders = ['user_id', 'username', 'password', 'email', 'birth', 'role', 'modification'];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await axios.get('http://localhost:3001/api/user', {headers: {
                    'authorization': `bearer ${token}`
                }});
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
        setLoading(props.isDeleting);
    }, [props.isDeleting]);

    return (
        <div>
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