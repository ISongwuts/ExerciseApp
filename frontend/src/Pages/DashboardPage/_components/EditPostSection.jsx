import React, { useEffect, useState } from 'react';
import { TextInput, DatePicker, Select, SelectItem } from "@tremor/react";
import { IoMdCreate } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';

const CategorySelector = (props) => {
    const categories = ["chest", "abdominal", "arm", "leg", "bottom", "shoulder"];
    const [value, setValue] = useState(props.value || "");

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

const PostForm = ({ post_id, post_title, post_desc, post_article, post_date, post_feedback, post_author, category_id, onClose }) => {
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        id: post_id,
        title: post_title,
        author: post_author,
        date: post_date,
        description: post_desc,
        content: post_article,
        category: category_id,
        feedback: post_feedback
    });

    const setCategoryValue = (value) => {
        const categoryFormat = `category-00${value}`;
        handleInputChange({ target: { value: categoryFormat } }, 'category');
    };

    const handleQuillChange = (content) => {
        handleInputChange({ target: { value: content } }, 'content');
    };

    const formPattern = [
        { formTitle: "title", formComponent: <TextInput value={formData.title} type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'title')} /> },
        { formTitle: "author", formComponent: <TextInput value={formData.author} type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'author')} /> },
        { formTitle: "date", formComponent: <DatePicker className="" onValueChange={(date) => handleInputChange({ target: { value: date } }, 'date')} /> },
        { formTitle: "description", formComponent: <TextInput value={formData.description} type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'description')} /> },
        { formTitle: "category", formComponent: <CategorySelector setCategoryValue={setCategoryValue} /> },
        { formTitle: "content", formComponent: <ReactQuill value={formData.content} theme="snow" onChange={handleQuillChange} /> },

    ];

    useEffect(() => {
        console.log(formData);
    }, [formData]);


    const postFormHandler = async (event) => {
        event.preventDefault();
        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/upload/${formData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                setUploading(false);

                if (response.ok) {
                    console.log(formData);
                    showSuccessAlert();
                } else {
                    console.log("Failed to Update the post");
                    showErrorAlert('Update Failed', 'Failed to update the post. Please try again.');
                }
            } catch (error) {
                showErrorAlert('Update Failed', error.message);
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
            title: 'Update Successful',
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
        <div className='font-body w-[100%] text-PrimaryColors'>
            <form className='flex gap-4 flex-col'>
                {formPattern.map((item, index) => (
                    <div key={index} className='flex flex-col'>
                        <label className='text-2xl font-bold'>{item.formTitle}</label>
                        {item.formComponent}
                    </div>
                ))}
                <div className=' flex text-xl justify-center space-x-3'>
                    <button onClick={(e) => postFormHandler(e)} type='submit' disabled={uploading}
                        className={` ${uploading ? 'border-[#cccccc] text-[#cccccc] bg-[transparent] hover:border-[#cccccc] hover:text-[#cccccc] hover:bg-[transparent]' : null} flex bg-[#00a96e] rounded-myConf border-2 border-[#00a96e] text-PrimaryBG px-2 py-1 hover:bg-[transparent] hover:text-[#00a96e] hover:border-2 hover:border-[#00a96e] items-center`}>
                        <IoMdCreate className='text-2xl' /> {uploading ? 'Updating...' : 'Update'}
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setFormData({});
                    }} className='flex bg-[#fde047] border-[#fde047] border-2 hover:bg-[transparent] hover:text-[#fde047] hover:border-2 hover:border-[#fde047] rounded-myConf text-PrimaryBG px-2 py-1 items-center'>
                        <FaTrashAlt className='text-2xl' /> Clear
                    </button>
                    <button onClick={(e) => {
                        e.preventDefault();
                        onClose();  // Invoke the onClose function
                    }} className='flex bg-PrimaryColors border-PrimaryColors border-2 hover:bg-[transparent] hover:text-PrimaryColors hover:border-2 hover:border-PrimaryColors rounded-myConf text-PrimaryBG px-2 py-1 items-center'>
                        <FaTrashAlt className='text-2xl' /> Close
                    </button>
                </div>
            </form>
        </div>
    );
};

function EditPostSection({ post_id, post_title, post_desc, post_article, post_date, post_feedback, post_author, category_id, onClose }) {
    return (
        <div className='font-body w-[100%] h-fit flex flex-col items-center'>
            <div className='text-4xl p-3 flex'>
                <span>Update: {post_id}</span>
            </div>
            <PostForm
                post_id={post_id}
                post_title={post_title}
                post_desc={post_desc}
                post_article={post_article}
                post_date={post_date}
                post_feedback={post_feedback}
                post_author={post_author}
                category_id={category_id}
                onClose={onClose}
            />
        </div>
    );
}

export default EditPostSection;
