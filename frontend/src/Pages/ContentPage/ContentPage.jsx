import React from 'react';
import Category from '../../components/Category/Category';
import ContentCard from '../../components/Card/ContentCard';
import Pagination from '../../components/Pagination/Pagination';

function ContentPage() {
  const contentData = [
    { title: "title 1", desc: "This is some random words for test" },
    { title: "title 2", desc: "This is some random words for test" },
    { title: "title 3", desc: "This is some random words for test" },
    { title: "title 4", desc: "This is some random words for test" },
    { title: "title 5", desc: "This is some random words for test" },
    { title: "title 6", desc: "This is some random words for test" },
    { title: "title 7", desc: "This is some random words for test" },
    { title: "title 8", desc: "This is some random words for test" },
  ];
  return (
    <div className="text-PrimaryColors flex flex-col font-body h-auto justify-center">
      <Category />
      <div className="mx-28">
        <div className="grid CollapseCard-xl:grid-cols-4 max-CollapseCard-xl:grid-cols-3 max-CollapseCard-lg:grid-cols-2 max-CollapseCard-tiny:grid-cols-1 gap-8 justify-items-center">
          {contentData.map((attr, index) => {
            return (
              <ContentCard title={attr.title} desc={attr.desc} />
            )
          })}
        </div>
      </div>
      <Pagination />
    </div>
  )
}

export default ContentPage