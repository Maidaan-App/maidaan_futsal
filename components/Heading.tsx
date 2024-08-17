import { poppins } from '@/app/lib/constants';
import React from 'react'

interface Props {
    heading : string;
}

const Heading = ({heading}:Props) => {
  return (
    <div className={`font-semibold text-[1.5rem] text-[#1E1E1E] leading-[3.54375rem] ${poppins.className}`}>{heading}</div>
  )
}

export default Heading