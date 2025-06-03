import { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaCamera } from "react-icons/fa";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../../components/hook/useAdmin";
import apiClient from "../../../lib/api-client";

const ProfileInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  const { admin, loading } = useAdmin();
  const navigate = useNavigate();
  console.log(admin, "Admin Data");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    profileImage: "",
  });

  // 🟨 useEffect: admin data load hole formData set
  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.userProfile.fullName || "",
        email: admin.email || "",
        phone: admin.phone || "",
        role: admin.role || "Admin",
        profileImage: admin.profileImage || "https://i.pravatar.cc/100",
      });
    }
  }, [admin]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
      // Optional: Send file to server via formData if needed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/user/update-profile-data/${admin._id}`, formData); // replace with your API path
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update admin info", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex justify-between items-center mb-6 pb-4">
        <div className="flex items-center gap-3">
          <button className="text-2xl" onClick={() => navigate(-1)}>
            <RiArrowLeftLine />
          </button>
          <h2 className="font-semibold text-2xl">Personal Information</h2>
        </div>
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
          >
            ✎ Edit Profile
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 py-5 px-20">
        {/* Left (Profile Image & Role) */}
        <div className="w-full lg:w-1/4 flex flex-col items-center bg-blue-50 border border-blue-300 p-14 rounded-md relative">
          <div className="relative">
            <img
              src={formData.profileImage}
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            {isEditing && (
              <>
                <div
                  className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaCamera className="text-white text-2xl" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>
          <p className="mt-4 text-gray-600">Profile</p>
          <p className="text-2xl font-bold mt-3">{formData.role}</p>
        </div>

        {/* Right (Form Fields) */}
        <div className="w-full lg:w-3/4 space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={formData.userProfile?.fullName || formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={!isEditing}
              className="w-full bg-blue-100 rounded px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">E-mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={!isEditing}
              className="w-full bg-blue-100 rounded px-3 py-2 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Phone Number</label>
            <PhoneInput
              country={"us"}
              value={formData.phone}
              onChange={(value) => handleChange("phone", value)}
              disabled={!isEditing}
              inputClass="!w-full px-3 py-5"
              containerClass="!w-full"
              inputStyle={{
                backgroundColor: "#DBEAFE",
                border: 0,
              }}
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Save Info
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfileInformation;
