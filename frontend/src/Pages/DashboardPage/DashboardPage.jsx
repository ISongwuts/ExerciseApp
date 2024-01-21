import React, { useState } from 'react'
import SideNavBar from './_components/SideNavBar';
import Dashboard from './_pages/Dashboard';
import Database from './_pages/Database';
import Upload from './_pages/Upload';

function DashboardPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const page = [<Dashboard />, <Database />, <Upload />]
    const onNavigateChange = (index) => {
        setCurrentPage(index);
    }
    return (
        <div className='font-body items-stretch h-full text-PrimaryColors flex'>
            <SideNavBar onChange={onNavigateChange}/>
            {page ? (page[currentPage]) : null}
        </div>
    )
}

export default DashboardPage