import React, { useState, useEffect } from 'react';
import TableComponent from "./DatabaseTable";
import axios from 'axios';
import LiveSearch from './LiveSearch';

const PostTable = ({ modifier }, props) => {
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    const onSearchChange = (value) => {
        setSearch(value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/post');
                const result = await response.data;
                setPostData(result);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setLoading(props.isDeleting);
    }, [props.isDeleting]);

    useEffect(() => {
        console.log(search);
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/post/search/?search=${search}`);
                const result = await response.data;
                setPostData(result);
            } catch (error) {
                console.error('Error fetching post data:', error);
            }
        };
        fetchData();
    }, [search]);

    const tableHeaders = ['post_id', 'post_title', 'post_desc', 'post_article', 'post_date', 'post_feedback', 'post_author', 'cover_image'];

    return (
        <div className='flex flex-col gap-4'>
            <LiveSearch onSearchChange={onSearchChange} value={search} />
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