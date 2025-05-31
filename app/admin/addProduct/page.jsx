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
    {/* other inputs remain the same */}
    {/* ... */}
  </form>
);