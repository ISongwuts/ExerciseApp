import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { Skeleton } from '@mui/material';

function ArticlePage() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className=" h-full w-full flex justify-center p-10">
      {!loading ? (
        <article className="prose lg:prose-xl w-1/2 flex flex-col gap-3 font-body">
          <h1 className="border-l-8 p-6 bg-[#202020] border-PrimaryColors text-PrimaryColors indent-16">
            {data.title}
          </h1>
          <p className="text-end text-InactivePrimary hover:text-PrimaryColors">
            @{data.author}
          </p>
          <p className="text-PrimaryColors font-bold indent-16">
            {data.description}
          </p>
          <p className="text-[#eeeeee] text-xl indent-16">
            <ReactQuill readOnly={true} value={data.article} theme={'bubble'} />
          </p>
        </article>
      ) : (
        <article className="prose lg:prose-xl w-1/2 flex flex-col gap-3 font-body">
          <Skeleton height={300} animation="wave"/>
          <Skeleton height={50} animation="wave"/>
          <Skeleton height={50} animation="wave"/>
          <Skeleton height={50} animation="wave"/>
          <Skeleton height={50} animation="wave"/>
          <Skeleton height={500} animation="wave"/>
        </article>
      )}
    </div>
  );
}

export default ArticlePage;
