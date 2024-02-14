import React, { useEffect, useState } from 'react';
import { TextInput, DatePicker, Select, SelectItem } from "@tremor/react";
import { IoMdCreate } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { Image } from 'mui-image'
import axios from 'axios';

const CategorySelector = (props) => {
    const [value, setValue] = useState("");
    const [category, setCategory] = useState([]);
    
    const fetchCategory = async () =>{
        const res = await axios.get('http://exerciseapp-server.agf0g3h4e2d2hwgm.southeastasia.azurecontainer.io:8000/api/category');
        setCategory(res.data);
        console.log(category)
    }
    useEffect(()=>{
        fetchCategory();
    }, [])  

    const handleCategoryChange = (selectedValue) => {
        setValue(selectedValue);
        props.setCategoryValue(selectedValue);
    };

    return (
        <Select className=' w-[100%]' value={value} onValueChange={handleCategoryChange}>
            {category.map((item, index) => (
                <SelectItem key={index} value={item.category_id}>
                    {item.category_name}
                </SelectItem>
            ))}
        </Select>
    );
};

const PostForm = () => {
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        image: '',
        author: '',
        date: '',
        description: '',
        content: '',
        category: '',
    });

    const setCategoryValue = (value) => {
        console.log(value);
        handleInputChange({ target: { value: value } }, 'category');
    };

    const handleQuillChange = (content) => {
        handleInputChange({ target: { value: content } }, 'content');
    };

    const formPattern = [
        { formTitle: "title", formComponent: <TextInput type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'title')} /> },
        { formTitle: "Image", formComponent: <TextInput type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'image')} /> },
        { formTitle: "author", formComponent: <TextInput type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'author')} /> },
        { formTitle: "date", formComponent: <DatePicker className="" onValueChange={(date) => handleInputChange({ target: { value: date } }, 'date')} /> },
        { formTitle: "description", formComponent: <TextInput type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'description')} /> },
        { formTitle: "category", formComponent: <CategorySelector setCategoryValue={setCategoryValue} /> },
        { formTitle: "content", formComponent: <ReactQuill className='displayer' theme="snow" onChange={handleQuillChange} /> },
        
    ];

    useEffect(() => {
        const getLatestPostID = async () => {
            try {
                const response = await fetch('http://exerciseapp-server.agf0g3h4e2d2hwgm.southeastasia.azurecontainer.io:8000/api/post/latestPostID');
                const data = await response.json();
                const numericPart = parseInt(data.latestPostID.split('-')[1], 10);
                const nextNumericPart = numericPart + 1;
                console.log(numericPart)
                const nextPostID = `post-${nextNumericPart.toString().padStart(4, '0')}`;
                setFormData({ ...formData, ["id"]: nextPostID });
            } catch (error) {
                console.log(error.message);
                setFormData({ ...formData, ["id"]: "post_001" });
            }
        }
        getLatestPostID();
    }, [uploading]);

    useEffect(() => {
        console.log(formData);
    }, [formData]);


    const postFormHandler = async (event) => {
        event.preventDefault();
        setTimeout(async () => {
            try {
                const response = await fetch('http://exerciseapp-server.agf0g3h4e2d2hwgm.southeastasia.azurecontainer.io:8000/api/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                setUploading(false);

                if (response.ok) {
                    console.log("The post has been uploaded");
                    showSuccessAlert();
                } else {
                    console.log("Failed to upload the post");
                    showErrorAlert('Upload Failed', 'Failed to upload the post. Please try again.');
                }
            } catch (error) {
                showErrorAlert('Upload Failed', error.message);
            }
        }, 2000);
        setUploading(true);

    };

    const handleInputChange = (e, field) => {
        if (field === 'date' && e.target.value instanceof Date) {
            const year = e.target.value.getFullYear();
            const month = String(e.target.value.getMonth() + 1).padStart(2, '0');
            const day = String(e.target.value.getDate()).padStart(2, '0');
            e.target.value = `${year}-${month}-${day}`;
        }

        setFormData({
            ...formData,
            [field]: e.target.value,
        });
        console.log(formData);
    };

    const showSuccessAlert = () => {
        Swal.fire({
            title: 'Upload Successful',
            text: 'Your post will show up on the main page soon.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    const showErrorAlert = (title, text) => {
        Swal.fire({
            title,
            text,
            icon: 'error',
            timer: 3000,
            confirmButtonText: 'OK',
        });
    };

    return (
        <div className='font-body w-[75%] flex gap-6 justify-center text-PrimaryColors'>
            <form className='flex gap-4 flex-col w-1/2' onSubmit={postFormHandler}>
                {formPattern.map((item, index) => (
                    <div key={index} className='flex flex-col'>
                        <label className='text-2xl font-bold'>{item.formTitle}</label>
                        <div className='bg-[#ffffff]'>
                            {item.formComponent}
                        </div>
                        
                    </div>
                ))}
                <div className=' flex text-3xl p-3 justify-center space-x-3'>
                    <button disabled={uploading} 
                        className={` ${uploading ? 'border-[#cccccc] text-[#cccccc] bg-[transparent] hover:border-[#cccccc] hover:text-[#cccccc] hover:bg-[transparent]':null} flex bg-PrimaryColors rounded-myConf border-2 border-PrimaryColors text-PrimaryBG p-2 hover:bg-[transparent] hover:text-PrimaryColors hover:border-2 hover:border-PrimaryColors items-center`}>
                        <IoMdCreate className='text-2xl' /> {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                    <button onClick={() => setFormData({})} className='flex bg-[#fde047] border-[#fde047] border-2 hover:bg-[transparent] hover:text-[#fde047] hover:border-2 hover:border-[#fde047] rounded-myConf text-PrimaryBG p-2 items-center'>
                        <FaTrashAlt className='text-2xl' /> Clear
                    </button>
                </div>
            </form>
            <div className=' w-1/2 h-1/2 bg-[#eee] rounded-myConf p-2 mt-6'>
                <Image src={formData.image} className='rounded-[12px] w-1/2 h-1/2 ' alt='Image Displayer'/>
            </div>
        </div>
    );
};

function Upload() {
    return (
        <div className='w-[100%] flex flex-col items-center mt-4 px-16'>
            <div className=' text-4xl p-3 flex'>
                <span >Upload</span>
            </div>
            <PostForm />
        </div>
    );
}

export default Upload;
