import React from 'react'

function ReportCard(props) {
  return (
    <div className={` py-14 border rounded-[10px] border-PrimaryColors text-center text-PrimaryColors font-bold`}>
        {props.content}
    </div>
  )
}

export default ReportCard