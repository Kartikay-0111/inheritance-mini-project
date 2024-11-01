import React from 'react'
import propertyReferralsInfo from "../constants/constants"

const ProgressBar = ({ title, percentage, color }) => {
  return (
    <div>
      <div className='flex flex-row justify-between mb-1'>
        <p>{title}</p>
        <p>{percentage}%</p>
      </div>
      <div className='w-full h-3 bg-slate-400 relative rounded-md'>
        <div className='absolute rounded-md h-full' style={{ width: `${percentage}%`, backgroundColor: color }}></div>
      </div>
    </div>
  )
}
const Propretyref = () => {

  return (
    <div className='flex flex-col bg-slate-100 rounded-2xl p-3 m-2'>
      <p className='font-semibold text-2xl'>Property referals</p>
      {propertyReferralsInfo.map((bar) => <ProgressBar key={bar.title} {...bar} />)}
    </div>
  )
}

export default Propretyref