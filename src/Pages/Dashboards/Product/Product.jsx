import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";

const Product = () => {
  const [brandName, setBrandName] = useState("phone");

  const [mainImage, setMainImage] = useState("");
  const [gallery, setGallery] = useState([]);

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setMainImage(newUrl);
    }
  };

  const handleAddToGallery = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setGallery((prev) => [...prev, newUrl]);
    }
  };
  const handleRemoveImage = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const payload = {
      ...data,
      brandName,
      mainImage,
      gallery,
    };
    console.log("Submitted:", payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-6 p-6 text-[#023337]"
    >
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Upload Product Image</h2>
          {/* Main Image Block */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="mb-4">
              <label className="w-72 h-72 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden relative group">
                {/* Image or Camera Icon */}
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-500">
                    <FaCamera className="text-4xl mb-2" />
                    <p className="text-sm">Click to upload image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {gallery.map((img, i) => (
                <div key={i} className="relative group">
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-20 h-20 object-cover rounded border border-gray-200 shadow"
                  />
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 text-xs hidden group-hover:block"
                    title="Remove"
                  >
                    <RiCloseFill />
                  </button>
                </div>
              ))}

              <label className="w-20 h-20 border border-dashed border-gray-200 rounded flex items-center justify-center text-gray-500 cursor-pointer text-3xl font-bold">
                +
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAddToGallery}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Basic Details</h2>

          <label className="block text-sm font-medium mb-1">Brand Name</label>
          <select
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
          >
            <option value="phone">Phone</option>
            <option value="accessory">Accessory</option>
            <option value="tablet">Tablet</option>
            <option value="laptop">Laptop</option>
            <option value="camera">Camera</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            {...register("productName")}
            placeholder="Product Name"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
          />
          <label className="block text-sm font-medium mt-4 mb-1">
            Product Description
          </label>
          <textarea
            {...register("productDescription")}
            placeholder="Write a detailed description of the product"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:shadow-lg transition-shadow duration-200 font-semibold"
        >
          Publish Product
        </button>
      </div>
    </form>
  );
};

export default Product;
