import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaLocationDot, FaBed, FaBath } from "react-icons/fa6";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import toast from "react-hot-toast";
import { useState } from "react";
const HotDeals = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    toast.success(
      liked ? "Removed from wishlist!" : "Added to wishlist!"
    );
  };
  const hotDeal = [
    {
      id: 1,
      title: "Old Trafford",
      location: "New York",
      price: "542k",
      originalPrice: "542k",
      rating: 4.9,
      sqft: 2000,
      beds: 5,
      baths: 2,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 2,
      title: "Sunset Villa",
      location: "Los Angeles",
      price: "799k",
      originalPrice: "850k",
      rating: 4.8,
      sqft: 3500,
      beds: 4,
      baths: 3,
      image: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f",
    },
    {
      id: 3,
      title: "Ocean Breeze",
      location: "Miami",
      price: "620k",
      originalPrice: "690k",
      rating: 4.7,
      sqft: 2800,
      beds: 3,
      baths: 2,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    },
    {
      id: 4,
      title: "Maple Mansion",
      location: "Toronto",
      price: "920k",
      originalPrice: "950k",
      rating: 4.6,
      sqft: 4000,
      beds: 6,
      baths: 4,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    },
    {
      id: 5,
      title: "Lakeside Cabin",
      location: "Seattle",
      price: "480k",
      originalPrice: "480k",
      rating: 4.5,
      sqft: 1800,
      beds: 2,
      baths: 1,
      image: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f",
    },
    {
      id: 6,
      title: "Countryside Home",
      location: "Austin",
      price: "515k",
      originalPrice: "540k",
      rating: 4.6,
      sqft: 2200,
      beds: 3,
      baths: 2,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    },
    {
      id: 7,
      title: "Modern Loft",
      location: "Chicago",
      price: "680k",
      originalPrice: "710k",
      rating: 4.8,
      sqft: 2500,
      beds: 3,
      baths: 2,
      image: "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f",
    },
    {
      id: 8,
      title: "Hilltop Retreat",
      location: "Denver",
      price: "740k",
      originalPrice: "770k",
      rating: 4.9,
      sqft: 3000,
      beds: 4,
      baths: 3,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
  ];

  const sliceHouse = hotDeal.slice(0, 4)

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Hot Deals</h1>
        <Link className="text-blue-500 hover:underline cursor-pointer">See All</Link>
      </div>
      <div className="grid grid-cols-4 gap-7">
        {sliceHouse.map((property) => (
          <div
            key={property.id}
            className="max-w-sm rounded-2xl border border-gray-200 overflow-hidden shadow-sm p-2"
          >
            <div className="relative">
      <img
        src={property.image}
        alt="property"
        className="w-full h-52 object-cover rounded-xl"
      />
      <div className="absolute top-2 right-2 flex gap-2">
        <div className="bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow text-sm font-semibold">
          <FaStar className="text-yellow-400" />
          {property.rating}
        </div>
        <button
          onClick={handleLike}
          className="bg-white p-2 rounded-full shadow"
        >
          <FaHeart className={liked ? "text-red-500" : "text-gray-600"} />
        </button>
      </div>
    </div>

            <div className="px-2 py-3">
              <div className="flex items-center justify-between">
                <Link to={`/propertyDetails/${property.id}`} className="text-lg font-semibold text-gray-800">
                  {property.title}
                </Link>
                <div className="text-lg font-semibold text-gray-800">${property.price}</div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500 text-sm mt-1 gap-1">
                <FaLocationDot />
                <span>{property.location}</span>
              </div>

              <div className="text-sm text-gray-400 mt-1 line-through">
                ${property.originalPrice}
              </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-2 flex justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <AiOutlineArrowsAlt className="text-gray-500" />
                  {property.sqft} sqft
                </div>
                <div className="flex items-center gap-1">
                  <FaBed className="text-gray-500" />{property.beds} beds
                </div>
                <div className="flex items-center gap-1">
                  <FaBath className="text-gray-500" />{property.baths} bath
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotDeals;
