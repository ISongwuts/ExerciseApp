import React from 'react';
import { useLocation } from 'react-router-dom';

function ArticlePage() {
    const location = useLocation();
    const data = location.state;
    console.log(data);

    return (
        <div className="self-start h-[100%] w-[100%] flex justify-center p-10">
            <article className="prose lg:prose-xl font-body">
                <h1 className=' text-PrimaryColors indent-16 '>{data.title}</h1>
                <p className=' text-end text-InactivePrimary hover:text-PrimaryColors'>
                    @{data.author}
                </p>
                <p className=' text-PrimaryColors indent-16'>
                    {data.description}
                </p>
                <p className=' text-PrimaryColors text-xl indent-16'>{data.article}</p>
            </article>
        </div>
    );
}

export default ArticlePage;
