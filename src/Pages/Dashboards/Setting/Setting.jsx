import { IoChevronForwardSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonModal from "../../../components/Common/CommonModal";
import { RiArrowLeftLine } from "react-icons/ri";
import apiClient from "../../../lib/api-client";
import { getCookie } from "../../../lib/cookie-utils";
import toast from "react-hot-toast";

const Setting = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // const handleSave = async () => {
  //   if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
  //     alert("All fields are required");
  //     return;
  //   }

  //   if (formData.newPassword !== formData.confirmPassword) {
  //     alert("New passwords do not match");
  //     return;
  //   }

  //   try {
  //     const res = await apiClient.patch("/auth/update-password", {
  //       currentPassword: formData.currentPassword,
  //       newPassword: formData.newPassword,
  //     });

  //     if (res.status === 200) {
  //       alert("Password updated successfully");
  //       setShowPasswordModal(false);
  //       setFormData({
  //         currentPassword: "",
  //         newPassword: "",
  //         confirmPassword: "",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Update Password Error:", error);
  //     const msg = error.response?.data?.message || "Failed to update password";
  //     alert(msg);
  //   }
  // };

  const handleSave = async () => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      alert("No access token found, please login again.");
      return;
    }
    try {
      const { old_password, new_password, confirm_password } = formData;

      if (new_password !== confirm_password) {
        alert("New passwords do not match");
        return;
      }

      const response = await apiClient.patch(
        "/auth/update-password",
        { old_password, new_password, confirm_password },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log(response);
      toast.success("Password updated successfully", {
        duration: 4000,
        position: "top-right",
      });
      setShowPasswordModal(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update password");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button className="text-2xl" onClick={() => navigate(-1)}>
          <RiArrowLeftLine />
        </button>
        <h1 className="text-2xl font-semibold">Setting</h1>
      </div>

      {/* Setting Options */}
      <div className="space-y-7">
        <Link
          to="/setting/profile"
          className="bg-blue-100 p-3 rounded flex justify-between items-center w-full px-7"
        >
          <p>Personal Information</p>
          <IoChevronForwardSharp />
        </Link>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="bg-blue-100 p-3 rounded flex justify-between items-center w-full px-7"
        >
          <p>Change Password</p>
          <IoChevronForwardSharp />
        </button>
      </div>

      {/* Change Password Modal */}
      <CommonModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
      >
        <div className="space-y-4 mt-4">
          <label className="block mb-1">Current Password</label>
          <input
            type="password"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={(e) => handleChange("old_password", e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />

          <label className="block mb-1">New Password</label>
          <input
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) => handleChange("new_password", e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />

          <label className="block mb-1">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirm_password", e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />

          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          >
            Update Password
          </button>
        </div>
      </CommonModal>
    </div>
  );
};

export default Setting;
