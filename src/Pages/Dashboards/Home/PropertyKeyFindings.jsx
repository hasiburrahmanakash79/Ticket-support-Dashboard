import aiIcon from "../../../assets/logo/ai-icon.svg";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PropertyKeyFindings = () => {
  const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fm.sothebysrealty.com%2F1253i215%2Fn3y4mwfc0as2mjaw5ph1hq6vd3i215&option=N&h=472&permitphotoenlargement=false",
    "https://images.estately.net/139_NWM2070873_0_1702443294_636x435.jpg",
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="flex flex-col gap-4 w-full md:w-2/3">
          {/* Main Image with Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <img
                src={mainImage}
                alt="Main"
                className="object-cover rounded-xl w-full h-[515px]"
              />
            </div>
            <div className="flex flex-col gap-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  className={`object-cover rounded-xl cursor-pointer border-2 ${
                    mainImage === img ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
          {/* Card Info */}
          <div className="border border-gray-200 rounded-2xl p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Old Trafford</h2>
              <p className="text-2xl font-semibold text-gray-800">$542K</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="flex items-center gap-2 text-gray-500 mt-1">
                <FaLocationDot /> New York
              </p>
              <p className="line-through text-gray-400">$542K</p>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/3 px-4 rounded-xl space-y-5">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            🏡 Property Details
          </h3>
          <div className="text-sm space-y-4">
            <p>
              <strong>Name:</strong> Linda Sanders
            </p>
            <p>
              <strong>Email:</strong> Linda@gmail.com
            </p>
            <p>
              <strong>Contact:</strong> +9654151515445
            </p>
            <p>
              <strong>Address:</strong> 123 Main St, Dallas, TX
            </p>
            <p>
              <strong>Type:</strong> Single Family Home
            </p>
            <p>
              <strong>Bathrooms:</strong> 2 Bath
            </p>
            <p>
              <strong>Square Footage:</strong> 2000sq ft
            </p>
            <p>
              <strong>Year Built:</strong> 2002
            </p>
            <p>
              <strong>Conditions:</strong> Needs minor repairs
            </p>
            <p>
              <strong>Occupancy:</strong> Vacant
            </p>
          </div>
        </div>
      </div>
      <div className=" border border-gray-200 rounded-2xl p-5 my-10">
        <h1 className="text-2xl font-semibold mb-3">Key Findings</h1>
        <div className="grid grid-cols-3 gap-5">
          <div className="space-y-3 bg-[#FFF9E6] p-3 rounded-xl">
            <h1 className="text-xl font-semibold">Seller Motivation</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
          </div>
          <div className="space-y-3 bg-[#F5EDFF] p-3 rounded-xl">
            <h1 className="text-xl font-semibold">Selling Preferences</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
          </div>
          <div className="space-y-3 bg-[#EBF6ED] p-3 rounded-xl">
            <h1 className="text-xl font-semibold">Timeline</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. At,
              eaque.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-10 items-center w-full">
        <button className="cursor-pointer">
          <img src={aiIcon} alt="AI Icon" className="w-6 h-6" />
        </button>

        <Link to="/create_offer" className="w-full">
          <button className="w-full bg-blue-500 text-white px-6 py-2 rounded cursor-pointer text-center">
            Generate Offer
          </button>
        </Link>
      </div>
      <div className=" border border-gray-200 rounded-2xl p-5 my-10">
        <h1 className="text-2xl font-semibold mb-3">Follow Up</h1>
      <div className="space-y-3 bg-[#FFF9E6] p-3 rounded-xl">
        <h1 className="text-xl font-semibold">Seller Motivation</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, eaque.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, eaque.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, eaque.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, eaque.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, eaque.
        </p>
      </div>
      </div>
    </div>
  );
};

export default PropertyKeyFindings;
