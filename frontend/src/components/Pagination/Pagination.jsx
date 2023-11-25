import React, { useState} from 'react'

function Pagination() {
    const paginationItems = ["1", "2", "3", "Last"]
    const [activePagination, setActivePagination] = useState("1");
    const paginationHandle = (page) => setActivePagination(page);

    return (
        <div className="flex justify-center m-14">
            <div className="text-lg w-[15rem]">
                <ul className="flex flex-row justify-between">
                    {paginationItems.map((item, index) => {
                        return (
                            <a className={`${activePagination === item ? 'bg-PrimaryColors text-PrimaryBG':'bg-PrimaryBG text-PrimaryColors'} border p-1 px-3 duration-200 hover:bg-PrimaryColors hover:text-PrimaryBG`} 
                                href="#"
                                onClick={() => paginationHandle(item)}
                            >
                                <li id={index}>{item}</li>
                            </a>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Pagination