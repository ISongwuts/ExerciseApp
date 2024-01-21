import React from 'react'

function AnalysisCard(props) {
  return (
    <div 
        className={`py-32 rounded-[10px] bg-[#202020] hover:bg-[#151515] hover:border cursor-pointer duration-100 text-center text-PrimaryColors font-bold ${props.content === "Soon Analysis..." ? null : "col-span-2"} `}>
        {props.content}
    </div>
  )
}

export default AnalysisCard