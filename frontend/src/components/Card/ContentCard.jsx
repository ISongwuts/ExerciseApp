import React, { useState } from 'react';

function ContentCard(props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      className={`border-2 border-InactivePrimary rounded-[23px] hover:shadow-md hover:shadow-InactivePrimary duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href="#"
    >
      <div className="xl:w-[25rem] max-CollapseCard-sm:w-[15rem] xl:h-[15rem] max-CollapseCard-sm:h-[10rem] font-body">
        <div className="flex flex-col">
          <div className={`rounded-t-myConf xl:h-36 max-xl:h-36 max-CollapseCard-sm:h-24 ${isHovered ? 'bg-PrimaryColors' : 'bg-InactivePrimary'}`}></div>
          <div className="flex flex-col m-3">
            <span className="text-PrimaryColors xl:text-3xl max-xl:text-2xl max-lg:text-xl max-sm:text-lg">{props.title}</span>
            <span className="text-InactivePrimary lg:text-lg max-lg:text-base max-sm:text-sm line-clamp-1">{props.desc}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default ContentCard;