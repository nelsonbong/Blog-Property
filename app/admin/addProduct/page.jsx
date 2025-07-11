'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  const [image, setImage] = useState(null);  // use null, not false
  const [data, setData] = useState({
    projectName: "",
    description: "",
    category: "Johor Bahru",
    developer: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("projectName", data.projectName);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("developer", data.developer);
      formData.append("image", image);

      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(null);
        setData({
          projectName: "",
          description: "",
          category: "Kuala Lumpur",
          developer: "",
        });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Upload failed: " + error.message);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Project Name</p>
        <input
          name="projectName"
          onChange={onChangeHandler}
          value={data.projectName}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />
        <p className="text-xl mt-4">Project Developer</p>
        <input
          name="developer"
          onChange={onChangeHandler}
          value={data.developer}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />
        <p className="text-xl mt-4">Project Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          placeholder="write content here"
          rows={6}
          required
        />
        <p className="text-xl mt-4">Project Category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Kuala Lumpur">Kuala Lumpur</option>
          <option value="Johor Bahru">Johor Bahru</option>
          <option value="Penang">Penang</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">
          ADD
        </button>
      </form>
    </>
  );
};

export default page;
