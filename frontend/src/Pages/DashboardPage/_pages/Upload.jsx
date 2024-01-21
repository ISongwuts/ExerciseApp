import React, { useState } from 'react';
import { TextInput, DatePicker, Select, SelectItem } from "@tremor/react";
import { IoMdCreate } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';

const CategorySelector = (props) => {
    const categories = ["chest", "abdominal", "arm", "leg", "bottom", "shoulder"];
    const [value, setValue] = useState("");

    const handleCategoryChange = (selectedValue) => {
        setValue(selectedValue);
        props.setCategoryValue(selectedValue);
    };

    return (
        <Select className=' w-[100%]' value={value} onValueChange={handleCategoryChange}>
            {categories.map((item, index) => (
                <SelectItem key={index} value={index + 1}>
                    {item}
                </SelectItem>
            ))}
        </Select>
    );
};

const PostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        date: '',
        description: '',
        content: '',
        category: '',
    });

    const setCategoryValue = (value) => {
        handleInputChange({ target: { value } }, 'category');
    };

    const handleQuillChange = (content) => {
        handleInputChange({ target: { value: content } }, 'content');
    };

    const formPattern = [
        { formTitle: "title", formComponent: <TextInput type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'title')} /> },
        { formTitle: "author", formComponent: <TextInput type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'author')} /> },
        { formTitle: "date", formComponent: <DatePicker className="" onValueChange={(date) => handleInputChange({ target: { value: date } }, 'date')} /> },
        { formTitle: "description", formComponent: <TextInput type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'description')} /> },
        { formTitle: "content", formComponent: <ReactQuill theme="snow" onChange={handleQuillChange} /> },
        { formTitle: "category", formComponent: <CategorySelector setCategoryValue={setCategoryValue} /> },
    ];

    const postFormHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://exerciseapp-api.vercel.app/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

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
        <div className='font-body w-[50%] text-PrimaryColors'>
            <form className='flex gap-4 flex-col' onSubmit={postFormHandler}>
                {formPattern.map((item, index) => (
                    <div key={index} className='flex flex-col'>
                        <label className='text-2xl font-bold'>{item.formTitle}</label>
                        {item.formComponent}
                    </div>
                ))}
                <div className=' flex text-3xl justify-center space-x-3'>
                    <button className='flex bg-PrimaryColors rounded-myConf border-2 border-PrimaryColors text-PrimaryBG p-2 hover:bg-[transparent] hover:text-PrimaryColors hover:border-2 hover:border-PrimaryColors items-center'>
                        <IoMdCreate className='text-2xl' /> Create
                    </button>
                    <button onClick={() => setFormData({})} className='flex bg-[#fde047] border-[#fde047] border-2 hover:bg-[transparent] hover:text-[#fde047] hover:border-2 hover:border-[#fde047] rounded-myConf text-PrimaryBG p-2 items-center'>
                        <FaTrashAlt className='text-2xl' /> Clear
                    </button>
                </div>
            </form>
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
