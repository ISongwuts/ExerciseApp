import React, { useState} from 'react'

function Category(props) {
    const [activeCategory, setActiveCategory] = useState("All")
    const categoryList = ["All", "Chest", "Abdominal", "Arm", "Leg", "Bottom"]
    const [IsCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

    const handleCategory = (category) => {
        setActiveCategory(category)
        props.onChange(category);
    }

    const CategorySlider = (props) => {
        return(
            <ul className={`${props.isCategoryOpen ? 'flex' : 'hidden'} flex flex-row space-x-4 `}>
                {categoryList.map((item, index) => {
                    return(
                        <a key={index} className={`border-2 rounded-b-myConf hover:bg-PrimaryColors hover:text-PrimaryBG duration-200 ${activeCategory === item ? 'bg-PrimaryColors text-PrimaryBG border-PrimaryColors' : 'border-transparent'}`} 
                            href="#"
                            onClick={()=>handleCategory(item)}
                        >
                            <li key={index} className=' mx-3'>{item}</li></a>
                    )
                })}
            </ul>
        )
    }

    const toggleCategoryMenu = () => {
        setIsCategoryMenuOpen(!IsCategoryMenuOpen);
    };
    
    return (
        <div className=' m-10 font-body flex flex-row'>
            <div className='lg:hidden px-4'>
                <button 
                    className='border-2 p-3 rounded-myConf hover:bg-PrimaryColors hover:text-PrimaryBG hover:shadow-sm hover:shadow-InactivePrimary'
                    onClick={toggleCategoryMenu}
                >
                Category {">"}   
                </button>
            </div>
            <ul className='flex flex-row space-x-4 justify-center max-lg:hidden'>
                {categoryList.map((item, index) => {
                    return(
                        <a key={index} className={`border border-PrimaryColors rounded-myConf hover:bg-PrimaryColors hover:text-PrimaryBG duration-200 ${activeCategory === item ? 'bg-PrimaryColors text-PrimaryBG border-PrimaryColors' : ''}`} 
                            href="#"
                            onClick={()=>handleCategory(item)}
                        >
                            <li className=' mx-10' key={index}>{item}</li></a>
                    )
                })}
            </ul>
            <CategorySlider isCategoryOpen={IsCategoryMenuOpen}/>
        </div>
    )
}

export default Category