import React, { useState, useEffect } from 'react';
import TableComponent from "./DatabaseTable";

const UserTable = ({ modifier }, props) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const tableHeaders = ['user_id', 'username', 'email', 'birth', 'role'];
    useEffect(() => {
        fetch('http://localhost:3001/api/user')
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error('Error fetching post data:', error));
        setTimeout(() => {

            setLoading(false);
        }, 2000);

    }, []);

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