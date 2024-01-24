import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import armImg from '../../assets/icon/arm.ico';
import legImg from '../../assets/icon/leg.ico';
import backImg from '../../assets/icon/back.ico';
import abdominalImg from '../../assets/icon/abdominal.ico';
import chestImg from '../../assets/icon/chest.ico';
import bottomImg from '../../assets/icon/bottom.ico';
import { useAuth } from '../../context/AuthProvider';
import Swal from 'sweetalert2';


function ContentCard(props) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const imgResource = [chestImg, abdominalImg, armImg, legImg, bottomImg, backImg];
  
  const myState = {
    type: props.type,
    title: props.title,
    author: props.author,
    description: props.desc,
    article: props.article,
    date: props.date
  };

  const isNotUserHandler = () => {
    Swal.fire(
      {
        title: "Permission not allow.",
        text: "Only user allow to view the content, Please Login.",
        icon: "error",
        confirmButtonText: "Log In",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }
    ).then((res) => {
      if(res.isConfirmed) props.showLoginModalHandler();
    })
  }
  return (

    <Link
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      to={user ? `/content/article/${props.articleId + "_" + props.title + "_@" + props.author}` : ''}
      onClick={user ? null : isNotUserHandler}
      state={myState}
    >
      <div className="xl:w-[25rem] max-CollapseCard-sm:w-[15rem] xl:h-[15rem] max-CollapseCard-sm:h-[10rem] font-body">
        <div className="flex flex-col">
          <div className={`rounded-t-myConf xl:h-36 max-xl:h-36 max-CollapseCard-sm:h-24 ${isHovered ? 'bg-PrimaryColors' : 'bg-InactivePrimary'}`}><img className='h-[100%] m-auto p-2' src={imgResource.at(parseInt(props.type.match(/\d+/)?.[0], 10) - 1)} alt="" /></div>
          <div className="flex flex-col m-3 ">
            <div className='flex flex-row justify-between'>
              <span className="text-PrimaryColors xl:text-xl max-xl:text-lg max-lg:text-lg max-sm:text-lg">{props.title.length > 20 ? props.title.slice(0, 20) + "..." : props.title}</span>
              <span className="text-InactivePrimary xl:text-sm max-xl:text-sm max-lg:text-xs max-sm:text-xs self-center hover:text-PrimaryColors">@{props.author.length > 15 ? props.author.slice(0, 15) + "..." : props.author}</span>
            </div>

            <span className="text-InactivePrimary lg:text-md max-lg:text-base max-sm:text-sm line-clamp-1">{props.desc}</span>
            <span className="text-InactivePrimary lg:text-xs max-lg:text-xs max-sm:text-xs">date: {props.date.split(':').at(0)}</span>
          </div>
        </div>
      </div>
    </Link>

  );
}

export default ContentCard;