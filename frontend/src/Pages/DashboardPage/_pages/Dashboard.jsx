import React from 'react'
import ReportCard from '../_components/ReportCard'
import AnalysisCard from '../_components/AnalysisCard'

function Dashboard() {
  const reportCardContent = ["Post", "User", "Admin"]
  const analysisCardContent = ["Post Analysis", "Soon Analysis..."]
  return (
    <div className='h-full w-[100%] grid grid-cols-3 m-6 text-3xl gap-6 font-body'>
      {reportCardContent.map((item, index) => (
        <div key={index}>
            <ReportCard content={item}/>
        </div>
        
      ))}
      {analysisCardContent.map((item, index) => (
        <div className={`${index === 0 ? 'col-span-2' : null}`} key={index}>
            <AnalysisCard content={item}/>
        </div>
        
      ))}
      <div className='col-span-3 py-60 hover:bg-[#151515] hover:border cursor-pointer duration-100 bg-[#202020] rounded-[10px] text-center text-PrimaryColors font-bold'>
        Some table...
      </div>
    </div>
  )
}

export default Dashboard