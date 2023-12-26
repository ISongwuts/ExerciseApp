import React from 'react'

function AnalysisCard(props) {
  return (
    <div 
        className={`py-32 border rounded-[10px] border-PrimaryColors text-center text-PrimaryColors font-bold ${props.content === "Soon Analysis..." ? null : "col-span-2"} `}>
        {props.content}
    </div>
  )
}

export default AnalysisCard