import React, { useState, useEffect } from 'react';
import TableComponent from "./DatabaseTable";
import Paginations from './Pagination';

const PostTable = ({ modifier }) => {
    const [postData, setPostData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:3001/api/post')
            .then(response => response.json())
            .then(data => setPostData(data))
            .catch(error => console.error('Error fetching post data:', error));
        setTimeout(() => {

            setLoading(false);
        }, 2000);

    }, []);

    const tableHeaders = ['post_id', 'post_title', 'post_desc', 'post_article', 'post_date', 'post_feedback', 'modifIer'];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const slicedData = postData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => setCurrentPage(newPage);

    return (
        <div>
            <TableComponent
                headers={tableHeaders}
                data={slicedData}
                modifierButtons={modifier}
                isLoading={loading}
            />

            <div className='flex'>
                <Paginations
                    currentPage={currentPage}
                    totalPages={Math.ceil(postData.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            </div>

        </div>
    );
};

export default PostTable;