import React, { useEffect, useState } from 'react';
import Category from '../../components/Category/Category';
import ContentCard from '../../components/Card/ContentCard';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import { IoReload } from "react-icons/io5";

function ContentPage() {
  const itemsPerPage = 8;
  const [contentData, setContentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setTimeout(() => {
        fetch('https://exerciseapp-api.vercel.app/api/post')
          .then(response => response.json())
          .then(data => {
            setContentData(data);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching post data:', error);
            setLoading(false);
          });
      }, 10);
    };

    fetchData();

    // Use setInterval if you want to periodically fetch data
    const intervalId = setInterval(fetchData, 600000); // Fetch data every 60 seconds

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className=' h-[75vh] w-[100%] flex justify-center items-center text-PrimaryColors text-3xl'><IoReload className=' animate-spin' /></div>;
  }


  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the subset of data for the current page
  const displayedData = contentData.slice(startIndex, endIndex);

  return (
    <div className="text-PrimaryColors flex flex-col font-body h-auto justify-center">
      <Category />
            <div className="mx-28">
              <div className="grid CollapseCard-xl:grid-cols-4 max-CollapseCard-xl:grid-cols-3 max-CollapseCard-lg:grid-cols-2 max-CollapseCard-tiny:grid-cols-1 gap-8 justify-items-center">
                {displayedData.map((attr, index) => (
                  <ContentCard
                    key={index}
                    articleId={attr.post_id}
                    type={attr.category_id}
                    title={attr.post_title}
                    author={attr.post_author}
                    desc={attr.post_desc}
                    article={attr.post_article}
                    date={attr.post_date}
                  />
                ))}
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(contentData.length / itemsPerPage)}
              onPageChange={(newPage) => setCurrentPage(newPage)}
            />
    </div>
  );
}

export default ContentPage;