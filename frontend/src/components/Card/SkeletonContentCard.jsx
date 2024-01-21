import React from 'react'
import { Skeleton } from '@mui/material';

function SkeletonContentCard() {
  return (
    <div className='rounded-[23px] border border-[#303030] '>
      <div className="xl:w-[25rem] max-CollapseCard-sm:w-[15rem] xl:h-[15rem] max-CollapseCard-sm:h-[10rem] font-body">
        <div className="flex flex-col w-[100%]">
          <div className={`rounded-t-myConf xl:h-36 max-xl:h-36 max-CollapseCard-sm:h-24 m-auto w-[100%]`}>
            <Skeleton variant='rounded' height={130} 
                sx={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 20, borderTopRightRadius: 20}} 
                animation="wave"/>
        </div>
          <div className="flex flex-col m-3 ">
            <div className='flex flex-row justify-between'>
              <Skeleton animation="wave" width="50%"/>
              <Skeleton animation="wave" width="25%"/>
            </div>

            <Skeleton animation="wave"/>
            <Skeleton animation="wave" width="35%"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonContentCard