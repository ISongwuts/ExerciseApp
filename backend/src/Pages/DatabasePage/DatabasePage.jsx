import React, { useState, useEffect } from 'react'
import {
    Tab, Table,
    TableHead, TableHeaderCell,
    TableBody, TableRow,
    TableCell, TabGroup,
    TabList, TabPanel,
    TabPanels,
} from '@tremor/react';
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";

const PostTable = () => {
    const [postData, setPostData] = useState([]);
    const tableHeaderCell = ['post_id', 'post_title', 'post_desc', 'post_article', 'post_date', 'post_feedback', 'modifIer'];
    const modifierButtonObj = [
        {
            icon: <FaPlus />,
            color: 'bg-[#2d8eff] border-[#2d8eff] hover:border-[#2d8eff] hover:text-[#2d8eff]'
        },
        {
            icon: <MdEdit />,
            color: 'bg-[#ffcc3d] border-[#ffcc3d] hover:border-[#ffcc3d] hover:text-[#ffcc3d]'
        },
        {
            icon: <MdDelete />,
            color: 'bg-PrimaryColors border-PrimaryColors hover: border-PrimaryColors hover:text-PrimaryColors'
        },
    ]

    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:3001/api/post')
            .then(response => response.json())
            .then(data => setPostData(data))
            .catch(error => console.error('Error fetching post data:', error));
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div>
            <Table className='border-2 border-PrimaryColors line-clamp-1'>
                <TableHead>
                    <TableRow>
                        {tableHeaderCell.map((item, index) => (
                            <TableHeaderCell className=' text-PrimaryColors' key={index}>{item}</TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {postData.map((post, index) => (
                        <TableRow key={index} className={` ${index % 2 == 1 ? ' bg-[transparent]' : ' bg-[#202020]'} border-none !text-PrimaryColors hover:!text-InactivePrimary cursor-pointer`}>
                            <TableCell >{post.post_id}</TableCell>
                            <TableCell >{post.post_title.length > 15 ? post.post_title.slice(0, 25) + "..." : post.post_title}</TableCell>
                            <TableCell >{post.post_desc.length > 15 ? post.post_desc.slice(0, 25) + "..." : post.post_desc}</TableCell>
                            <TableCell >{post.post_article.length > 15 ? post.post_article.slice(0, 25) + "..." : post.post_article}</TableCell>
                            <TableCell >{post.post_date.split(':').at(0)}</TableCell>
                            <TableCell >{post.post_feedback}</TableCell>
                            <TableCell className='flex space-x-2'>{modifierButtonObj.map((item, index) => (
                                <DatabaseModifierButton color={item.color} icon={item.icon} />
                            ))}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

const UserTable = () => {
    const tableHeaderCell = ['user_id', 'username', 'password', 'email', 'birth', 'role'];
    return (
        <div>
            <Table className='border-2 border-PrimaryColors'>
                <TableHead>
                    <TableRow>
                        {tableHeaderCell.map((item, index) => (
                            <TableHeaderCell className=' text-PrimaryColors' key={index}>{item}</TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
            </Table>
        </div>
    )
}

const CategoryTable = () => {
    const [category, setCategory] = useState([]);
    const tableHeaderCell = ['category_id', 'category_name', 'modifIer'];
    const modifierButtonObj = [
        {
            icon: <FaPlus />,
            color: 'bg-[#2d8eff] border-[#2d8eff] hover:border-[#2d8eff] hover:text-[#2d8eff]'
        },
        {
            icon: <MdEdit />,
            color: 'bg-[#ffcc3d] border-[#ffcc3d] hover:border-[#ffcc3d] hover:text-[#ffcc3d]'
        },
        {
            icon: <MdDelete />,
            color: 'bg-PrimaryColors border-PrimaryColors hover: border-PrimaryColors hover:text-PrimaryColors'
        },
    ]
    useEffect(() => {
        // Fetch data from the API
        fetch('http://localhost:3001/api/category')
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.error('Error fetching post data:', error));
    }, []);
    return (
        <div>
            <Table className='border-2 border-PrimaryColors'>
                <TableHead>
                    <TableRow>
                        {tableHeaderCell.map((item, index) => (
                            <TableHeaderCell className=' text-PrimaryColors' key={index}>{item}</TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {category.map((category, index) => (
                        <TableRow key={index} className={` ${index % 2 == 1 ? ' bg-[transparent]' : ' bg-[#202020]'} border-none !text-PrimaryColors hover:!text-InactivePrimary cursor-pointer`}>
                            <TableCell >{category.category_id}</TableCell>
                            <TableCell >{category.category_name}</TableCell>
                            <TableCell className='flex space-x-2' >{modifierButtonObj.map((item, index) => (
                                <DatabaseModifierButton color={item.color} icon={item.icon} />
                            ))}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

const DatabaseModifierButton = (props) => {
    return (
        <button className={`${props.color} hover:bg-[transparent] border px-[1.25rem] py-[.5rem] rounded-[5px] text-lg text-PrimaryBG`}>{props.icon}</button>
    )
}

function DatabasePage() {
    const modifierButtonObj = [
        {
            icon: <FaPlus />,
            color: 'bg-[#2d8eff] border-[#2d8eff] hover:border-[#2d8eff] hover:text-[#2d8eff]'
        },
        {
            icon: <MdEdit />,
            color: 'bg-[#ffcc3d] border-[#ffcc3d] hover:border-[#ffcc3d] hover:text-[#ffcc3d]'
        },
        {
            icon: <MdDelete />,
            color: 'bg-PrimaryColors border-PrimaryColors hover: border-PrimaryColors hover:text-PrimaryColors'
        },
    ]
    return (
        <div className='font-body text-PrimaryColors flex m-10 flex-col'>
            <div className='flex justify-between items-center'>
                <span className='text-3xl'>Database Monitor</span>
                <div className='flex space-x-2'>
                    {modifierButtonObj.map((item, index) => (
                        <DatabaseModifierButton color={item.color} icon={item.icon} />
                    ))}
                </div>

            </div>
            <div>
                <TabGroup>
                    <TabList className="mt-8 w-fit border-InactivePrimary border-b-2" >
                        <Tab className=' text-InactivePrimary'>post</Tab>
                        <Tab className='text-InactivePrimary'>user</Tab>
                        <Tab className='text-InactivePrimary'>category</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="mt-10 mx-28">
                                <PostTable />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="mt-10 mx-28">
                                <UserTable />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="mt-10 mx-28">
                                <CategoryTable />
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    )
}

export default DatabasePage