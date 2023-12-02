import React, { useState } from 'react'
import { TextInput, Textarea, DatePicker, Select, SelectItem } from "@tremor/react";
import { IoMdCreate } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'

const DragAndDropArea = (props) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        handleFiles(files);
        console.log('Dropped files:', files);
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        handleFiles(files);
    };

    const handleFiles = (files) => {
        setFileName(files[0].name);
        const validFiles = Array.from(files).filter(file =>
            file.type === 'image/jpeg' || file.type === 'image/png'
        );
        validFiles.forEach(async (file) => {
            const base64String = await readFileAsBase64(file);
            props.setImageFile(base64String);
        });
        
    };
    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                // The result contains the Base64-encoded string
                resolve(reader.result.split(',')[1]);
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };
    return (
        <div
            className={`flex items-center justify-center w-full ${isDragging
                    ? 'border-2 border-PrimaryColors blur-sm' // Add your custom styles for dragging state
                    : 'border-2 border-gray-300'
                } border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
            onDragEnter={handleDragEnter}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-xl text-gray-500 dark:text-gray-400"><span className="font-semibold">{fileName.length == 0 ? "Click to upload or drag and drop" : fileName}</span></p>
                    <p className="text-lg text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpg, image/jpg" onChange={handleFileInputChange} />
            </label>
        </div>
    );
};

const CategorySelector = (props) => {
    const category = ["chest", "abdominal", "arm", "leg", "bottom"];
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
        image: '',
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
        { formTitle: "image cover", formComponent: <DragAndDropArea setImageFile={setBase64ImageFile} /> },
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