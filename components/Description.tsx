import React from 'react'

interface Props {
    description : string;
}


const Description = ({description}:Props) => {
  return (
    <div className={`font-normal text-[1rem] text-[#333333] text-opacity-60 leading-[1.75rem]`}>{description}</div>
  )
}

export default Description