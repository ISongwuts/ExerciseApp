import React, { useState, useEffect } from 'react'
import {
    Tab, Table,
    TableHead, TableHeaderCell,
    TableBody, TableRow,
    TableCell, TabGroup,
    TabList, TabPanel,
    TabPanels,
} from '@tremor/react';

const PostTable = () => {
    const [postData, setPostData] = useState([]);
    const tableHeaderCell = ['post_id', 'post_title', 'post_desc', 'post_article', 'post_date', 'post_feedback', 'post_image'];
  
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
              <TableRow key={index} className={` ${index % 2 == 1 ? ' bg-[transparent]':' bg-[#202020]'} border-none !text-PrimaryColors hover:!text-InactivePrimary cursor-pointer`}>
                <TableCell >{post.post_id}</TableCell>
                <TableCell >{post.post_title}</TableCell>
                <TableCell >{post.post_desc}</TableCell>
                <TableCell >{post.post_article}</TableCell>
                <TableCell >{post.post_date}</TableCell>
                <TableCell >{post.post_feedback}</TableCell>
                <TableCell >{post.post_image.slice(0, 20)}...</TableCell>
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
    const tableHeaderCell = ['category_id', 'category_name'];
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

function DatabasePage() {
    return (
        <div className='font-body text-PrimaryColors flex m-10 flex-col'>
            <div><span className='text-3xl'>Database Monitor</span></div>
            <div>
                <TabGroup>
                    <TabList className="mt-8 w-fit border-PrimaryColors border-b-2" >
                        <Tab className='text-PrimaryColors'>post</Tab>
                        <Tab className='text-PrimaryColors'>user</Tab>
                        <Tab className='text-PrimaryColors'>category</Tab>
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