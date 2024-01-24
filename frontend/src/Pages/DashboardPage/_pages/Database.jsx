import React, { useState, useEffect } from 'react';
import { Tab, Dialog, DialogPanel, Button, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { FaPlus } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';
import DatabaseModifierButton from '../_components/DatabaseModifierButton';
import UserTable from '../_components/UserTable';
import PostTable from '../_components/PostTable';
import CategoryTable from '../_components/CategoryTable';
import EditPostSection from '../_components/EditPostSection'

const Database = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [loading, setIsLoading] = useState(false); 
    const onEditHandler = async (e, rowDatas) => {
        setIsLoading(true);
        setIsOpen(true);
        setRowData(rowDatas);
    }

    useEffect(()=>{
        setIsLoading(false);
        console.log(rowData);
    }, [rowData])

    const modifierButtons = [
        { name: 'Add', icon: <FaPlus />, color: 'bg-[#00a96e] border-[#00a96e] hover:border-[#00a96e] hover:text-[#00a96e]', behavior: () => { } },
        { name: 'Edit', icon: <MdEdit />, color: 'bg-[#ffcc3d] border-[#ffcc3d] hover:border-[#ffcc3d] hover:text-[#ffcc3d]', behavior: onEditHandler },
        { name: 'Delete', icon: <MdDelete />, color: 'bg-PrimaryColors border-PrimaryColors hover: border-PrimaryColors hover:text-PrimaryColors', behavior: () => { } },
    ];

    const tabPanels = [<PostTable modifier={modifierButtons} />, <UserTable modifier={modifierButtons} />, <CategoryTable modifier={modifierButtons} />]

    return (
        <div className='font-body text-PrimaryColors flex w-[100%] m-10 flex-col'>
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
                <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
                    <DialogPanel>
                        { rowData &&  <EditPostSection {...rowData}/>}
                    </DialogPanel>
                </Dialog>
            </div>
        </div>
    );
};

export default Database;
