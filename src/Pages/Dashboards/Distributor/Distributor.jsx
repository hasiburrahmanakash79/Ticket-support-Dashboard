import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import apiClient from "../../../lib/api-client";
import useDistributor from "../../../components/hook/useDistributor";
import { RiDeleteBin5Line } from "react-icons/ri";

const Distributor = () => {
  const { distributors, loading, refetch } = useDistributor([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // 👇 POST data directly without FormData
      const res = await apiClient.post("/distributor/add-distributor", data);
      console.log(res);
      toast.success("Distributor added successfully!", {
        duration: 4000,
        position: "top-right",
      });

      reset();
      refetch();
    } catch (error) {
      console.error("Submit failed:", error);
      setSubmitError("Failed to add distributor", error.message);

      toast.error("Failed to add distributor", error.message, {
        duration: 5000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const res = await apiClient.delete(`/distributor/${id}`);

      if (res.status === 200) {
        toast.success("Distributor deleted successfully!", {
          duration: 4000,
          position: "top-right",
        });
        refetch();
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete distributor", {
        duration: 5000,
        position: "top-right",
      });
    }
  };

  console.log(distributors);
  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-[#023337] border border-gray-100 rounded-xl"
      >
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {submitError}
            </div>
          )}

          <label className="block text-sm font-medium mb-1 mt-5">Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="write distributor name"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            disabled={isSubmitting}
          />

          <label className="block text-sm font-medium mb-1 mt-5">Email</label>
          <input
            {...register("email", { required: true })}
            placeholder="write distributor email"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            disabled={isSubmitting}
          />

          <label className="block text-sm font-medium mb-1 mt-5">
            Password
          </label>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="write distributor password"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            disabled={isSubmitting}
          />

          <label className="block text-sm font-medium mb-1 mt-5">
            Shop Name
          </label>
          <input
            {...register("shopName", { required: true })}
            placeholder="write distributor shop name"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            disabled={isSubmitting}
          />

          <label className="block text-sm font-medium mb-1 mt-5">
            Shop Address
          </label>
          <input
            {...register("shopAddress", { required: true })}
            placeholder="write distributor shop address"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            disabled={isSubmitting}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:shadow-lg transition-shadow duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto border border-gray-200 rounded-xl p-5 mt-10">
        <h2 className="text-2xl font-semibold mb-5">User</h2>
        <table className="min-w-full bg-white rounded-xl text-center">
          <thead>
            <tr className="text-sm bg-blue-50">
              <th className="p-4 text-left">User Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Number</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm text-center">
            {distributors?.map((distributor) => (
              <tr key={distributor?._id} className="border-t border-gray-200">
                <td className="py-3 px-4 text-left">
                  {distributor?.user?.userProfile?.fullName || "N/A"}
                </td>
                <td className="py-4 px-4">{distributor?.user?.email}</td>
                <td className="py-3 px-4">
                  {distributor?.user?.phone || "N/A"}
                </td>
                <td className="py-3 px-4">
                  <button onClick={() => handleDeleteClick(distributor?._id)}>
                    <RiDeleteBin5Line className="text-red-500 hover:text-red-700 transition cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Distributor;
