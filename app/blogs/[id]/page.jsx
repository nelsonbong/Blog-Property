"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {

  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog", {
      params: {
        id: params.id,
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src={assets.logo} width={130} alt="" className="w-[130px] sm:w-auto"/>
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get started <Image src={assets.arrow} alt="" width={25} />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="mt-[-100px] text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.projectName}
          </h1>
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.developer}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image className="border-4 border-white" src={data.image} width={1280} height={720} alt=""/>
        <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}></div>
        <div className="my-24">
          <p className="text-black font font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex">
            <Image src={assets.fb} width={50} alt="" />
            <Image src={assets.ig} width={50} alt="" />
            <Image src={assets.ws} width={50} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default page;