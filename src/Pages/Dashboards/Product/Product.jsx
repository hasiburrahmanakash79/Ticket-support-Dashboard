"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaCamera } from "react-icons/fa6"
import { toast } from "react-hot-toast"
import apiClient from "../../../lib/api-client"
import useBrand from "../../../components/hook/useBrand"

const Product = () => {
  const { brands, loading: brandLoading } = useBrand()

  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
      setImageFile(file)
      setSubmitError("")
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const formData = new FormData()

      formData.append("brand", data.brand)
      formData.append("model", data.model)
      formData.append("description", data.description)
      if (imageFile) {
        formData.append("image", imageFile)
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value)
      }

      const res = await apiClient.post("/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(res.data, "Product added successfully")

      toast.success("Product added successfully!", {
        duration: 4000,
        position: "top-right",
      })

      reset()
      setImagePreview(null)
      setImageFile(null)
      setSubmitError("")
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message)

      let errorMessage = "Failed to add product"
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message
      }

      setSubmitError(errorMessage)
      toast.error(errorMessage, {
        duration: 5000,
        position: "top-right",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (brandLoading) return <div>Loading brands...</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-[#023337]">
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{submitError}</div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-2">Upload Product Image</h2>
          <div className="border border-gray-200 rounded-lg p-4">
            <label className="w-72 h-72 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden relative group">
              {imagePreview ? (
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-500">
                  <FaCamera className="text-4xl mb-2" />
                  <p className="text-sm">Click to upload image</p>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" disabled={isSubmitting} />
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Basic Details</h2>

          <label className="block text-sm font-medium mb-1">Brand</label>
          <select
            {...register("brand", { required: "Brand is required" })}
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            disabled={isSubmitting}
          >
            <option  disabled>Select a brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>}

          <label className="block text-sm font-medium mt-4 mb-1">Product Name</label>
          <input
            {...register("model", { required: "Product name is required" })}
            placeholder="Product Name"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            disabled={isSubmitting}
          />
          {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>}

          <label className="block text-sm font-medium mt-4 mb-1">Product Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Write a detailed description of the product"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            rows={4}
            disabled={isSubmitting}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:shadow-lg transition-shadow duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publishing Product..." : "Publish Product"}
        </button>
      </div>
    </form>
  )
}

export default Product
