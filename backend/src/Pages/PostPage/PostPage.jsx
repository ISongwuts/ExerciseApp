import React from 'react'
import { TextInput, Textarea, DatePicker, Select, SelectItem } from "@tremor/react";
import { IoMdCreate } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";

const DragAndDropArea = () => {
    return (
        <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p class="mb-2 text-xl text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-lg text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
            </label>
        </div>
    )
}

const CategorySelector = () => {
    const category = ["chest", "abdominal", "arm", "leg", "bottom"]
    return (
        <Select>
            {category.map((item, index) => (
                <SelectItem value={index + 1}>
                    {item}
                </SelectItem>
            ))}
        </Select>
    )
}

const PostForm = () => {
    const formPattern = [
        { formTitle: "title", formComponent: <TextInput type='string' placeholder="Type here." /> },
        { formTitle: "author", formComponent: <TextInput type='string' placeholder="Type here." /> },
        { formTitle: "date", formComponent: <DatePicker className="max-w-sm w-fit" /> },
        { formTitle: "description", formComponent: <TextInput type='string' placeholder="Type here." /> },
        {
            formTitle: "content", formComponent: <Textarea
                id="description"
                placeholder="Start typing here..."
                className="min-h-[20rem]"
            />
        },
        { formTitle: "category", formComponent: <CategorySelector /> },
        { formTitle: "image cover", formComponent: <DragAndDropArea /> },
    ]

    return (
        <div className=' font-body text-PrimaryColors w-[50%] mx-auto my-10 h-fit'>
            <form action="" className=''>
                {formPattern.map((item, index) => (
                    <div className='m-[2%] flex flex-col'>
                        <label className='text-2xl font-bold'>{item.formTitle}</label>
                        {item.formComponent}
                    </div>
                )
                )}
                <div className='m-[2%] flex text-3xl justify-center space-x-3'>
                    <button className='flex bg-PrimaryColors rounded-myConf border-2 border-PrimaryColors text-PrimaryBG p-2 hover:bg-[transparent] hover:text-PrimaryColors hover:border-2 hover:border-PrimaryColors items-center'><IoMdCreate className='text-2xl' /> create</button>
                    <button className='flex bg-[#fde047] border-[#fde047] border-2 hover:bg-[transparent] hover:text-[#fde047] hover:border-2 hover:border-[#fde047] rounded-myConf text-PrimaryBG p-2 items-center'><FaTrashAlt className='text-2xl'/> clear</button>
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