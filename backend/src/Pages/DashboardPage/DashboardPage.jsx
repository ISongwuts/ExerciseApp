import React from 'react'
import ReportCard from '../../components/ReportCard/ReportCard'
import AnalysisCard from '../../components/AnalysisCard/AnalysisCard'
function DashboardPage() {
  const reportCardContent = ["Post", "User", "Admin"]
  const analysisCardContent = ["Post Analysis", "Soon Analysis..."]
  return (
    <div className='h-full grid grid-cols-3 m-16 mx-44 text-3xl gap-6 font-body'>
      {reportCardContent.map((item, index) => (
        <ReportCard content={item}/>
      ))}
      {analysisCardContent.map((item, index) => (
        <AnalysisCard content={item}/>
      ))}
      <div className='col-span-3 py-60 border rounded-[10px] border-PrimaryColors text-center text-PrimaryColors font-bold'>
        Some table...
      </div>
    </div>
  )
}

export default DashboardPage