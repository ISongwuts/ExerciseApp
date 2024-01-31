import React, { useState, useEffect } from 'react';
import TableComponent from "./DatabaseTable";
import axios from 'axios';

const PostTable = ({ modifier }, props) => {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/post');
                setPostData(response.data);
            } catch (error) {
                console.error('Error fetching post data:', error);
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

    const tableHeaders = ['post_id', 'post_title', 'post_desc', 'post_article', 'post_date', 'post_feedback'];

    return (
        <div>
            <TableComponent
                headers={tableHeaders}
                data={postData}
                modifierButtons={modifier}
                isLoading={loading}
            />
        </div>
    );
};

export default PostTable;