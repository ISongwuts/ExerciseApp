import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';

function ArticlePage() {
    const location = useLocation();
    const data = location.state;
    var config = {
        "theme": "snow",
        "modules": {
            "toolbar": false
        }
      };
    return (
        <div className="self-start h-[100%] w-[100%] flex justify-center p-10">
            <article className="prose lg:prose-xl font-body">
                <h1 className=' border-l-8 p-6 bg-[#202020]  border-PrimaryColors text-PrimaryColors indent-16 '>{data.title}</h1>
                <p className=' text-end text-InactivePrimary hover:text-PrimaryColors'>
                    @{data.author}
                </p>
                <p className=' text-PrimaryColors font-bold indent-16'>
                    {data.description}
                </p>
                <p className=' text-[#eeeeee] text-xl indent-16'>
                    <ReactQuill  readOnly={true} value={data.article} theme={"bubble"}/>
                </p>
            </article>
        </div>
    );
}

export default ArticlePage;
