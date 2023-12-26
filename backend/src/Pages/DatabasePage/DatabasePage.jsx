import React, { useState, useEffect } from 'react';
import { Tab, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { FaPlus } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';
import Pagination from '../../components/Pagination/Pagination';

const DatabaseModifierButton = ({ color, icon }) => (
    <button className={`${color} hover:bg-[transparent] border px-[1.25rem] py-[.5rem] rounded-[5px] text-lg text-PrimaryBG`}>{icon}</button>
);

const TableComponent = ({ headers, data, modifierButtons }) => (
    <Table className='border border-PrimaryColors '>
        <TableHead>
            <TableRow>
                {headers.map((item, index) => (
                    <TableHeaderCell className='text-PrimaryColors text-center' key={index}>{item}</TableHeaderCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {data.map((rowData, index) => (
                <TableRow key={index} className={` ${index % 2 === 1 ? 'bg-[transparent]' : 'bg-[#202020]'} border-none !text-PrimaryColors hover:!text-InactivePrimary cursor-pointer`}>
                    {
                        headers.slice(0, -1).map((header, cellIndex) => {
                            return (
                                <TableCell key={cellIndex}>{typeof rowData[header] === 'string' && rowData[header].length > 15 ? `${rowData[header].slice(0, 25)}...` : rowData[header]}</TableCell>
                            )
                        })
                    }
                    <TableCell className='flex space-x-2 justify-center'>{modifierButtons.map((button, buttonIndex) => (
                        <DatabaseModifierButton key={buttonIndex} {...button} />
                    ))}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);


const PostTable = () => {
    const [postData, setPostData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetch('http://localhost:3001/api/post')
            .then(response => response.json())
            .then(data => setPostData(data))
            .catch(error => console.error('Error fetching post data:', error));
    }, []);

    const tableHeaders = ['post_id', 'post_title', 'post_desc', 'post_article', 'post_date', 'post_feedback', 'modifIer'];
    const modifierButtons = [
        { icon: <FaPlus />, color: 'bg-[#00a96e] border-[#00a96e] hover:border-[#00a96e] hover:text-[#00a96e]' },
        { icon: <MdEdit />, color: 'bg-[#ffcc3d] border-[#ffcc3d] hover:border-[#ffcc3d] hover:text-[#ffcc3d]' },
        { icon: <MdDelete />, color: 'bg-PrimaryColors border-PrimaryColors hover: border-PrimaryColors hover:text-PrimaryColors' },
    ];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const slicedData = postData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => setCurrentPage(newPage);

    return (
        <div>
            <TableComponent
                headers={tableHeaders}
                data={slicedData}
                modifierButtons={modifierButtons}
            />

            <div className='flex'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(postData.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            </div>

        </div>
    );
};


const UserTable = () => {
    const tableHeaders = ['user_id', 'username', 'password', 'email', 'birth', 'role'];

    return (
        <div>
            <TableComponent headers={tableHeaders} data={[]} modifierButtons={[]} />
        </div>
    );
};

const CategoryTable = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/category')
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.error('Error fetching post data:', error));
    }, []);

    const tableHeaders = ['category_id', 'category_name', 'modifIer'];
    const modifierButtons = [
        { icon: <FaPlus />, color: 'bg-[#00a96e] border-[#00a96e] hover:border-[#00a96e] hover:text-[#00a96e]' },
        { icon: <MdEdit />, color: 'bg-[#ffcc3d] border-[#ffcc3d] hover:border-[#ffcc3d] hover:text-[#ffcc3d]' },
        { icon: <MdDelete />, color: 'bg-PrimaryColors border-PrimaryColors hover: border-PrimaryColors hover:text-PrimaryColors' },
    ];

    const dataArray = Array.isArray(category) ? category : [];

    return (
        <div>
            <TableComponent headers={tableHeaders} data={dataArray} modifierButtons={modifierButtons} />
        </div>
    );
};

const DatabasePage = () => {
    const modifierButtons = [
        { icon: <FaPlus />, color: 'bg-[#00a96e] border-[#00a96e] hover:border-[#00a96e] hover:text-[#00a96e]' },
        { icon: <MdEdit />, color: 'bg-[#ffcc3d] border-[#ffcc3d] hover:border-[#ffcc3d] hover:text-[#ffcc3d]' },
        { icon: <MdDelete />, color: 'bg-PrimaryColors border-PrimaryColors hover: border-PrimaryColors hover:text-PrimaryColors' },
    ];

    const tabPanels = [<PostTable />, <UserTable />, <CategoryTable />]

    return (
        <div className='font-body text-PrimaryColors flex m-10 flex-col'>
            <div className='flex justify-between items-center'>
                <span className='text-3xl'>Database Monitor</span>
                <div className='flex space-x-2'>
                    {modifierButtons.map((item, index) => (
                        <DatabaseModifierButton key={index} {...item} />
                    ))}
                </div>
            </div>
            <div>
                <TabGroup>
                    <TabList className="mt-8 w-fit border-InactivePrimary border-b-2">
                        <Tab className=' text-InactivePrimary'>post</Tab>
                        <Tab className='text-InactivePrimary'>user</Tab>
                        <Tab className='text-InactivePrimary'>category</Tab>
                    </TabList>
                    <TabPanels>
                        {
                            tabPanels.map((item, index) => (
                                <TabPanel key={index}>
                                    <div className="mt-10 ">
                                        {item}
                                    </div>
                                </TabPanel>
                            ))
                        }
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    );
};

export default DatabasePage;
