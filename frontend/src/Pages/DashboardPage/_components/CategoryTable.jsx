import React, { useState, useEffect } from 'react';
import TableComponent from "./DatabaseTable";

const CategoryTable = ({ modifier }, props) => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:3001/api/category')
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.error('Error fetching post data:', error));
        setTimeout(() => {

            setLoading(false);
        }, 2000);

    }, []);

    useEffect(() => {
        setLoading(props.isDeleting);
    }, [props.isDeleting]);

    const tableHeaders = ['category_id', 'category_name', 'modifIer'];
    const dataArray = Array.isArray(category) ? category : [];

    return (
        <div>
            <TableComponent isLoading={loading} headers={tableHeaders} data={dataArray} modifierButtons={modifier} />
        </div>
    );
};

export default CategoryTable;