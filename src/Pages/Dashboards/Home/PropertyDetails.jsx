import aiIcon from "../../../assets/logo/ai-icon.svg";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaRulerCombined, FaBed, FaBath } from "react-icons/fa";
import { Link } from "react-router-dom";

const PropertyCard = () => {
  const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fm.sothebysrealty.com%2F1253i215%2Fn3y4mwfc0as2mjaw5ph1hq6vd3i215&option=N&h=472&permitphotoenlargement=false",
    "https://images.estately.net/139_NWM2070873_0_1702443294_636x435.jpg",
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col md:flex-row gap-10 p-6">
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
          <h4 className="mt-4 mb-2 font-semibold">General Info</h4>
          <div className="flex gap-10 text-gray-600 text-sm">
            <span className="flex items-center gap-1">
              <FaRulerCombined /> 2000 sqft
            </span>
            <span className="flex items-center gap-1">
              <FaBed /> 5 beds
            </span>
            <span className="flex items-center gap-1">
              <FaBath /> 2 bath
            </span>
          </div>
        </div>

        {/* 🗺️ Google Map Embed */}
        <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24161.26404299181!2d-74.0059415!3d40.7127755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuMCJX!5e0!3m2!1sen!2sus!4v1634218538899!5m2!1sen!2sus"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>

        <div className="flex gap-4 mt-4 items-center">
          <button className="cursor-pointer">
            <img src={aiIcon} alt="AI Icon" className="w-6 h-6" />
          </button>
          <Link to='/key_finding'>
            <button className="bg-blue-500 text-white px-6 py-2 rounded cursor-pointer">
              Contact Now
            </button>
          </Link>
          <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded cursor-pointer">
            Schedule Latter
          </button>
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
  );
};

export default PropertyCard;
