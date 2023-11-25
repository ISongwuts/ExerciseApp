import React, { useState} from 'react'

function Category() {
    const [activeCategory, setActiveCategory] = useState("All")
    const categoryList = ["All", "Chest", "Abdominal", "Arm", "Leg", "Bottom"]

    const handleCategory = (category) => {
        setActiveCategory(category)
    }
    
    return (
        <div className=' m-10 font-body'>
            <ul className='flex flex-row space-x-4 justify-center'>
                {categoryList.map((item, index) => {
                    return(
                        <a className={`border-2 rounded-myConf hover:bg-PrimaryColors hover:text-PrimaryBG duration-200 ${activeCategory === item ? 'bg-PrimaryColors text-PrimaryBG border-PrimaryColors' : 'border-transparent'}`} 
                            href="#"
                            onClick={()=>handleCategory(item)}
                        >
                            <li className=' mx-10' id={index}>{item}</li></a>
                    )
                })}
            </ul>
        </div>
    )
}

export default Category