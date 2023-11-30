import React from 'react';
import Category from '../../components/Category/Category';
import ContentCard from '../../components/Card/ContentCard';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

function ContentPage() {
  const navigate = useNavigate();
  const handleTitleCardClick = (title) => {
    // Use the navigate function to go to the ArticlePage
    navigate(`/content/article/${title}`);
  };
  const contentData = [
    { title: "title 1", author: "ISongwut", desc: "This is some random words for test" },
    { title: "title 2", author: "ISongwut", desc: "This is some random words for test" },
    { title: "title 3", author: "ISongwut", desc: "This is some random words for test" },
    { title: "title 4", author: "ISongwut", desc: "This is some random words for test" },
    { title: "title 5", author: "ISongwut", desc: "This is some random words for test" },
    { title: "title 6", author: "ISongwut", desc: "This is some random words for test" },
    { title: "title 7", author: "ISongwut", desc: "This is some random words for test" },
    { title: "title 8", author: "ISongwut", desc: "This is some random words for test" },
  ];
  return (
    <div className="text-PrimaryColors flex flex-col font-body h-auto justify-center">
      <Category />
      <div className="mx-28">
        <div className="grid CollapseCard-xl:grid-cols-4 max-CollapseCard-xl:grid-cols-3 max-CollapseCard-lg:grid-cols-2 max-CollapseCard-tiny:grid-cols-1 gap-8 justify-items-center">
          {contentData.map((attr, index) => {
            return (
                <ContentCard title={attr.title} author={attr.author} desc={attr.desc} onClick={()=>handleTitleCardClick(attr.title+"_@"+attr.author)}/>
            )
          })}
        </div>
      </div>
      <Pagination />
    </div>
  )
}

export default ContentPage