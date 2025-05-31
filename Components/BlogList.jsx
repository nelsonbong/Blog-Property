import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';

const BlogList = () => {

    const [menu,setMenu] = useState("All");
    const [blogs,setBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await axios.get('/api/blog');
        setBlogs(response.data.blogs);
        console.log(response.data.blogs);
    }

    useEffect(() => {
        fetchBlogs();
    },[])

  return (
    <div>
        <div className='flex justify-center gap-6 my-10'>
            <button onClick={()=>setMenu("All")} className={menu==="All"?'bg-black text-white py-1 px-4 rounded-sm':""} >All</button>
            <button onClick={()=>setMenu("Kuala Lumpur")} className={menu==="Kuala Lumpur"?'bg-black text-white py-1 px-4 rounded-sm':""}>Kuala Lumpur</button>
            <button onClick={()=>setMenu("Johor Bahru")} className={menu==="Johor Bahru"?'bg-black text-white py-1 px-4 rounded-sm':""}>Johor Bahru</button>
            <button onClick={()=>setMenu("Penang")} className={menu==="Penang"?'bg-black text-white py-1 px-4 rounded-sm':""}>Penang</button>
        </div>
        <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
            {blogs.filter((item)=>menu==="All"?true:item.category===menu).map((item,index)=>{
                return <BlogItem key={index} id={item._id} image={item.image} projectName={item.projectName} description={item.description} category={item.category}/>
            })}
        </div>
    </div> 
  )
}

export default BlogList