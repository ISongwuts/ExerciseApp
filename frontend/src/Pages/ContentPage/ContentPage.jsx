import React, { useEffect, useState, useCallback } from 'react';
import Category from '../../components/Category/Category';
import ContentCard from '../../components/Card/ContentCard';
import Pagination from '../../components/Pagination/Pagination';
import { Skeleton } from '@mui/material';
import SkeletonContentCard from '../../components/Card/SkeletonContentCard';
import { motion } from "framer-motion"

function ContentPage(props) {
  const itemsPerPage = 8;
  const [contentData, setContentData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [contentNotFound, setContentNotFound] = useState(false);
  const [category, setCategory] = useState(null);
  const [alreadyLoaded, setAlreadyLoaded] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const onCategoryChange = (category_id) => {
    const categoryList = ["All", "Chest", "Abdominal", "Arm", "Leg", "Bottom"];
    const categoryIndex = categoryList.findIndex(category => category.toLowerCase() === category_id.toLowerCase());
    const paddedCategoryId = String(categoryIndex).padStart(3, '0');
    const formattedCategoryId = `category-${paddedCategoryId}`;
    if (categoryIndex !== -1) {
      setCategory(formattedCategoryId);
      setCurrentPage(1);
    } else {
      console.error(`Category "${formattedCategoryId}" not found in the list`);
    }
  }

  const flexibleSearchHandler = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredData = contentData.filter(attr =>
      attr.post_title.toLowerCase().includes(term) ||
      attr.post_author.toLowerCase().includes(term) ||
      attr.post_desc.toLowerCase().includes(term) ||
      attr.post_article.toLowerCase().includes(term)
    );

    setFilterData(filteredData);
    setCurrentPage(1); // Reset to the first page when the search term changes
    setContentNotFound(term && filteredData.length === 0);
  }

  const fetchData = useCallback(async (category, page) => {
    try {
      let apiUrl = `http://localhost:3001/api/post/`;

      if (category === null || category === 'category-000') {
        apiUrl += `page=${page}`;
        const contentResponse = await fetch(apiUrl);
        const contentJson = await contentResponse.json();
        setContentData(contentJson);
        const rowResponse = await fetch('http://localhost:3001/api/post/rowcount');
        const rowJson = await rowResponse.json();
        setRowCount(rowJson.rowCount);
        console.log(rowCount);
      } else {
        apiUrl += `category=${category}`;
        const contentResponse = await fetch(apiUrl);
        const contentJson = await contentResponse.json();
        setContentData(contentJson);
        setRowCount(contentJson.length);
      }
      console.log(apiUrl);
      setLoading(false);
      setAlreadyLoaded(true);
    } catch (error) {
      console.error('Error fetching post data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setAlreadyLoaded(false);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchData(category, currentPage);
    }, 1000);


    // Use setInterval if you want to periodically fetch data
    const intervalId = setInterval(() => fetchData(category, currentPage), 600000); // Fetch data every 60 seconds

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, [category, currentPage]);

  const displayedData = searchTerm ? filterData : contentData;

  return (
    <div className="text-PrimaryColors flex flex-col font-body h-auto justify-center">
      <div className='flex justify-around items-center'>
        <Category onChange={onCategoryChange} />
        <input
          onChange={flexibleSearchHandler}
          type="text"
          value={searchTerm}
          className='h-8 rounded-myConf focus:outline-none indent-4 border placeholder:text-InactivePrimary border-PrimaryColors bg-[transparent]'
          placeholder='Search...'
        />
      </div>

      {contentNotFound && (
        <div className="text-center m-auto text-PrimaryColors">
          No content found for "{searchTerm}".
        </div>
      )}

      <div className="mx-28">
        <div className="grid CollapseCard-xl:grid-cols-4 max-CollapseCard-xl:grid-cols-3 max-CollapseCard-lg:grid-cols-2 max-CollapseCard-tiny:grid-cols-1 gap-8 justify-items-center">
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
              <motion.div
                key={index}
                className='xl:w-[25rem] max-CollapseCard-sm:w-[15rem] xl:h-[15rem] max-CollapseCard-sm:h-[10rem] font-body'
                initial={{ y: "25%" }}
                animate={{ y: "0%" }}
                transition={{ duration: index * 0.2 }}
              >
                <SkeletonContentCard
                  key={index}

                />
              </motion.div>
            ))
            : displayedData.map((attr, index) => (
              <motion.div
                key={index}
                initial={{ y: "25%" }}
                animate={{ y: "0%" }}
                transition={{ duration: index * 0.1 }}
                className={`rounded-[23px] border-2 border-InactivePrimary hover:shadow-md hover:shadow-InactivePrimary`}
              >
                <ContentCard
                  showLoginModalHandler={props.loginModalHandler}
                  key={index}
                  articleId={attr.post_id}
                  type={attr.category_id}
                  title={attr.post_title}
                  author={attr.post_author}
                  desc={attr.post_desc}
                  article={attr.post_article}
                  date={attr.post_date}
                  image={attr.cover_image}
                />
              </motion.div>

            ))}
        </div>
      </div>
      {loading && currentPage === 1 && !alreadyLoaded ? (
        <div className='flex justify-center my-14 mx-auto'>
          <Skeleton
            variant="rectangular"
            height={40}
            animation="wave"
            width={300}
          />
        </div>
      ) : (
        !contentNotFound && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(rowCount / itemsPerPage)}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        )
      )}
    </div>
  );
}

export default ContentPage;
