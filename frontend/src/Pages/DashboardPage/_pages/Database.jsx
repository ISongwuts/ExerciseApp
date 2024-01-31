import React, { useState, useEffect } from 'react';
import { Tab, Dialog, DialogPanel, Button, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { FaPlus } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';
import DatabaseModifierButton from '../_components/DatabaseModifierButton';
import UserTable from '../_components/UserTable';
import PostTable from '../_components/PostTable';
import CategoryTable from '../_components/CategoryTable';
import EditPostSection from '../_components/EditPostSection'
import Swal from 'sweetalert2';
import axios from 'axios';
import EditUserSection from '../_components/editUserSection';
import EditCategorySection from '../_components/EditCategorySection';

const Database = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const onEditHandler = (e, rowDatas) => {
        setIsLoading(true);
        setIsOpen(true);
        setRowData(rowDatas);
        console.log(rowDatas);
    }

    const onDialogClose = () => {setIsOpen(false);}

    const deleteHandler = async (type, id) => {
        try {
            setDeleting(true);
            const result = await axios.delete(`http://localhost:3001/api/${type}/delete/${id}`);
            Swal.fire('Deleted!', `Good luck if you don't mean to do this.`, 'success');
            console.log(`${type} deleted successfully:`, result.data);
            setDeleting(false);
        } catch (error) {
            console.error(`Error deleting ${type}:`, error.message);
            // Handle error scenarios
        }
    };

    const onDeleteHandler = (e, rowData) => {
        const keys = Object.keys(rowData);
        if (keys.includes('post_id') || keys.includes('user_id')) {
            const type = keys.includes('post_id') ? 'post' : 'user';
            const id = rowData[type + '_id'];
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, Delete!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteHandler(type, id);
                }
            });
        } else {
            console.log('Unknown type:', rowData);
        }
    };


    useEffect(() => {
        setIsLoading(false);
        console.log(rowData);
    }, [rowData])

    const modifierButtons = [
        { name: 'Edit', icon: <MdEdit />, color: 'modifier flex items-center bg-[#ffcc3d] border-[#ffcc3d] hover:border-[#ffcc3d] hover:text-[#ffcc3d]', behavior: onEditHandler },
        { name: 'Delete', icon: <MdDelete />, color: 'modifier flex items-center bg-PrimaryColors border-PrimaryColors hover: border-PrimaryColors hover:text-PrimaryColors', behavior: onDeleteHandler },
    ];

    const parentModifierButtons = [
        { name: 'Add', icon: <FaPlus />, color: 'modifier flex items-center bg-[#00a96e] border-[#00a96e] hover:border-[#00a96e] hover:text-[#00a96e]', behavior: () => { } },
        { name: 'Edit', icon: <MdEdit />, color: 'modifier flex items-center bg-[#ffcc3d] border-[#ffcc3d] hover:border-[#ffcc3d] hover:text-[#ffcc3d]', behavior: onEditHandler },
        { name: 'Delete', icon: <MdDelete />, color: 'modifier flex items-center bg-PrimaryColors border-PrimaryColors hover: border-PrimaryColors hover:text-PrimaryColors', behavior: onDeleteHandler },
    ];

    const tabPanels = [<PostTable isDeleting={deleting} modifier={modifierButtons} />, <UserTable isDeleting={deleting} modifier={modifierButtons} />, <CategoryTable isDeleting={deleting} modifier={modifierButtons} />]

    return (
        <div className='font-body text-PrimaryColors flex w-[100%] m-10 flex-col'>
            <div className='flex justify-between items-center'>
                <span className='text-3xl'>Database Monitor</span>
                <div className='flex space-x-2'>
                    {parentModifierButtons.map((item, index) => (
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
                <Dialog className='h-fit' open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
                    <DialogPanel>
                        {rowData && 'post_id' in rowData && <EditPostSection {...rowData} onDialogClose={onDialogClose} />}
                        {rowData && 'user_id' in rowData && <EditUserSection {...rowData} onDialogClose={onDialogClose}/>}
                        {rowData && 'category_name' in rowData && <EditCategorySection {...rowData} onDialogClose={onDialogClose}/>}
                    </DialogPanel>
                </Dialog>
            </div>
        </div>
    );
};

export default Database;
