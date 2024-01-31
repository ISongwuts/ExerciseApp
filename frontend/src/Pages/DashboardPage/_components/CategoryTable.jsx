import React, { useState, useEffect } from 'react';
import TableComponent from "./DatabaseTable";
import axios from 'axios';

const CategoryTable = ({ modifier }, props) => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:3001/api/category');
              setCategory(response.data);
            } catch (error) {
              console.error('Error fetching category data:', error);
            } finally {
              setTimeout(() => {
                setLoading(false);
              }, 10000);
            }
          };
        
          fetchData();

    }, []);

    useEffect(() => {
        setLoading(props.isDeleting);
    }, [props.isDeleting]);

    const tableHeaders = ['category_id', 'category_name'];
    const dataArray = Array.isArray(category) ? category : [];

    return (
        <div>
            <TableComponent isLoading={loading} headers={tableHeaders} data={dataArray} modifierButtons={modifier} />
        </div>
    );
};

export default CategoryTable;