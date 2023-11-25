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
      <div className="w-[25rem] h-[15rem] font-body">
        <div className="flex flex-col">
          <div className={`rounded-t-myConf h-36  ${isHovered ? 'bg-PrimaryColors' : 'bg-InactivePrimary'}`}></div>
          <div className="flex flex-col m-3">
            <span className="text-PrimaryColors text-3xl">{props.title}</span>
            <span className="text-InactivePrimary text-lg line-clamp-1">{props.desc}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default ContentCard;