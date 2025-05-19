import { useState } from "react";

const PropertyOffer = () => {
  const images = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fm.sothebysrealty.com%2F1253i215%2Fn3y4mwfc0as2mjaw5ph1hq6vd3i215&option=N&h=472&permitphotoenlargement=false",
    "https://images.estately.net/139_NWM2070873_0_1702443294_636x435.jpg",
  ];

  const [mainImage, setMainImage] = useState(images[0]);

const offerHistory = [
    {
        date: "2024-06-01",
        status: "Sent",
        amount: "$10,000",
        sentVia: "Email",
    },
    {
        date: "2024-06-02",
        status: "Viewed",
        amount: "$10,000",
        sentVia: "SMS",
    },
    {
        date: "2024-06-03",
        status: "Accepted",
        amount: "$10,000",
        sentVia: "Email",
    },
];

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
        <div className="my-10">
            <h1 className="text-2xl font-semibold mb-3">Offer Form</h1>
            <div className="space-y-4">
                <p className="font-semibold text-lg">PURCHASE OFFER</p>
                <p>
                    <span className="font-semibold">Buyer Name:</span> Alison Baker
                </p>
                <p>
                    <span className="font-semibold">Seller Name:</span> David Luis 
                </p>
                <p>
                    <span className="font-semibold">Property:</span> 123 Main St, Dallas, TX
                </p>
                <div>
                    <p className="font-semibold pb-2">Offer Price</p>
                    <input type="text" placeholder="$ 10000" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <p className="font-semibold pb-2">Terms</p>
                    <input type="text" placeholder="Cash offer,  closing in 14 days" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
            </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center w-full">
            <button className="w-full bg-blue-500 text-white px-6 py-2 rounded cursor-pointer text-center">
                Send via Email
            </button>
            <button className="w-full border border-blue-500 text-blue-500 px-6 py-2 rounded cursor-pointer">
                Send via SMS
            </button>
            <button className="w-full border border-blue-500 text-blue-500 px-6 py-2 rounded cursor-pointer">
                Save as PDF
            </button>
        </div>
        <div className=" border border-gray-200 rounded-2xl p-5 my-10">
            <h1 className="text-2xl font-semibold mb-3">Offer History</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-none text-sm text-left border">
                    <thead>
                        <tr className="bg-blue-50 text-gray-700">
                            <th className="py-2 px-4">Date</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Amount</th>
                            <th className="py-2 px-4">Sent Via</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offerHistory.map((offer, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="py-2 px-4">{offer.date}</td>
                                <td className="py-2 px-4">{offer.status}</td>
                                <td className="py-2 px-4">{offer.amount}</td>
                                <td className="py-2 px-4">{offer.sentVia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
};

export default PropertyOffer;
