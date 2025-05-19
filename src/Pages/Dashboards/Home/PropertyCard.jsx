import { FaStar, FaHeart, FaLocationDot, FaBed, FaBath } from "react-icons/fa6";

const PropertyCard = () => {
  return (
    <div className="max-w-sm rounded-2xl border border-gray-200 overflow-hidden shadow-sm p-2">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="house"
          className="w-full h-52 object-cover rounded-xl"
        />
        <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full flex items-center gap-1 shadow text-sm font-semibold">
          <FaStar className="text-yellow-400" />
          4.9
        </div>
        <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
          <FaHeart className="text-gray-600" />
        </div>
      </div>

      <div className="px-2 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Old Trafford</h2>
          <div className="text-lg font-semibold text-gray-800">$542K</div>
        </div>

        <div className="flex items-center text-gray-500 text-sm mt-1 gap-1">
          <FaLocationDot />
          <span>New York</span>
        </div>

        <div className="text-sm text-gray-400 mt-1 line-through">$542K</div>

        <div className="border-t border-gray-200 mt-4 pt-2 flex justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaBath className="text-gray-500" />
            2000 sqft
          </div>
          <div className="flex items-center gap-1">
            <FaBed className="text-gray-500" />
            5 beds
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-gray-500" />
            2 bath
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;