import React from 'react'

function ReportCard(props) {
  return (
    <div 
      className={`py-14 rounded-[10px] bg-[#202020] hover:bg-[#151515] hover:border cursor-pointer duration-100 text-center text-PrimaryColors font-bold`}>
        {props.content}
    </div>
  )
}

export default ReportCard