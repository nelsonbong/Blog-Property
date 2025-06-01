import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({image,projectName,developer,date,deleteBlog,mongoId}) => {
    const BlogDate = new Date(date);
  return (
    <tr className='bg-white border-b'>
        <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
            <Image width={40} height={40} alt='' src={image?image:assets.logo} />
        </th>
        <td className='px-6 py-4'>
            <p>{developer?developer:"No author"}</p>
        </td>
        <td className='px-6 py-4'>
            {projectName?projectName:"no name provided"}
        </td>
        <td className='px-6 py-4'>
            {BlogDate.toLocaleString()}
        </td>
        <td onClick={() => deleteBlog(mongoId)} className='px-6 py-4 cursor-pointer'>
            x
        </td>
    </tr>
  )
}

export default BlogTableItem