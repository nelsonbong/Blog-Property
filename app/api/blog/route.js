import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary - set these env vars in Vercel or your local .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Get the image file from formData
    const image = formData.get("image");

    // Convert File/Blob to Buffer
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    // Upload image Buffer to Cloudinary (using upload_stream)
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "blogs" }, // optional folder in your Cloudinary account
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(imageBuffer);
    });

    // Get the uploaded image URL
    const imgUrl = uploadResult.secure_url;

    // Prepare blog data with Cloudinary image URL
    const blogData = {
      projectName: formData.get("projectName"),
      description: formData.get("description"),
      category: formData.get("category"),
      developer: formData.get("developer"),
      image: imgUrl,
    };

    const result = await BlogModel.create(blogData);
    console.log("Blog Saved", result);

    return NextResponse.json({ success: true, msg: "Blog Added!" });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({
      success: false,
      msg: "Failed to add blog",
      error: error.message,
    });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);

  // Optional: If you want to delete from Cloudinary as well, use public_id (if stored)
  // cloudinary.uploader.destroy(public_id)

  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted!" });
}
