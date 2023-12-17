import React, { useState } from 'react'
import { TextInput, Textarea, DatePicker, Select, SelectItem } from "@tremor/react";
import { IoMdCreate } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'

const CategorySelector = (props) => {
    const category = ["chest", "abdominal", "arm", "leg", "bottom", "shoulder"];
    const [value, setValue] = useState("");

    const handleCategoryChange = (selectedValue) => {
        setValue(selectedValue);
        props.setCategoryValue(selectedValue);
    };

    return (
        <Select value={value} onValueChange={handleCategoryChange}>
            {category.map((item, index) => (
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

    const setBase64ImageFile = (value) => {
        handleInputChange({ target: { value } }, 'image');
    };

    const formPattern = [
        { formTitle: "title", formComponent: <TextInput type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'title')} /> },
        { formTitle: "author", formComponent: <TextInput type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'author')} /> },
        { formTitle: "date", formComponent: <DatePicker className="max-w-sm w-fit" onValueChange={(date) => handleInputChange({ target: { value: date } }, 'date')} /> },
        { formTitle: "description", formComponent: <TextInput type='string' placeholder="Type here." onChange={(e) => handleInputChange(e, 'description')} /> },
        {
            formTitle: "content", formComponent: <Textarea
                id="description"
                placeholder="Start typing here..."
                className="min-h-[20rem]"
                onChange={(e) => handleInputChange(e, 'content')}
            />
        },
        { formTitle: "category", formComponent: <CategorySelector setCategoryValue={setCategoryValue} /> },
    ];

    const postFormHandler = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('http://localhost:3001/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                console.log("the post has been uploaded");
                Swal.fire({
                    title: 'Upload Successfuly',
                    text: 'Your post will show up at the main page soon.',
                    icon: 'success',
                    //timer: 3000,
                    confirmButtonText: 'OK',
                  })
            } else {
                console.log("fail to upload the post");
                Swal.fire({
                    title: 'Upload Failed',
                    text: 'Fail to upload the post try again.',
                    icon: 'error',
                    timer: 3000,
                    confirmButtonText: 'OK',
                  })
            }
        } catch (error) {
            Swal.fire({
                title: 'Upload Failed',
                text: error.message,
                icon: 'error',
                timer: 3000,
                confirmButtonText: 'OK',
              })
        }
    }

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

    return (
        <div className=' font-body text-PrimaryColors w-[50%] mx-auto my-10 h-fit'>
            <form onSubmit={postFormHandler}>
                {formPattern.map((item, index) => (
                    <div key={index} className='m-[2%] flex flex-col'>
                        <label className='text-2xl font-bold'>{item.formTitle}</label>
                        {item.formComponent}
                    </div>
                )
                )}
                <div className='m-[2%] flex text-3xl justify-center space-x-3'>
                    <button className='flex bg-PrimaryColors rounded-myConf border-2 border-PrimaryColors text-PrimaryBG p-2 hover:bg-[transparent] hover:text-PrimaryColors hover:border-2 hover:border-PrimaryColors items-center'><IoMdCreate className='text-2xl' /> create</button>
                    <button onClick={() => setFormData({})} className='flex bg-[#fde047] border-[#fde047] border-2 hover:bg-[transparent] hover:text-[#fde047] hover:border-2 hover:border-[#fde047] rounded-myConf text-PrimaryBG p-2 items-center'><FaTrashAlt className='text-2xl' /> clear</button>
                </div>
            </form>
        </div>
    )
}

function PostPage() {
    return (
        <div>
            <PostForm />
        </div>
    )
}

export default PostPage