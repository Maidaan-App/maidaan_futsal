import { Input } from '@/components/ui/input'
import { CommandIcon, Search01Icon } from 'hugeicons-react'
import { CommandShortcut } from './ui/command'

export function Search() {
  return (
    // <div>
    //   <Input
    //     type='search'
    //     placeholder='Search...'
    //     className='md:w-[100px] lg:w-[300px]'
    //   />
    // </div>
    <div className="relative">
    <input
      type="text"
      className="bg-[#F4F4F5] outline-none border-none rounded-lg px-7 py-2"
      placeholder="Search.... "
    />

    <div className="absolute top-0 bottom-0 left-2 flex items-center">
      <Search01Icon size={15} color={"#8A92A6"} />
    </div>

    <div className="absolute top-0 bottom-0 right-2 flex items-center">
      <CommandShortcut className="flex justify-between items-center bg-white p-1 rounded-lg">
        <CommandIcon size={15} />P
      </CommandShortcut>
    </div>
  </div>
  )
}
