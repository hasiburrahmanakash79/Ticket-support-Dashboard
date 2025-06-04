import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaCamera } from "react-icons/fa6"
import { toast } from "react-hot-toast"
import apiClient from "../../../lib/api-client"

const Brand = () => {
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const { register, handleSubmit, reset } = useForm()

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setSubmitError("")
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      console.log("Form data being sent:", {
        name: data.name,
        description: data.description,
        hasFile: !!file,
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type,
      })

      const formData = new FormData()
      formData.append("name", data.name)
      formData.append("description", data.description)
      if (file) {
        formData.append("image", file)
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
      }

      const res = await apiClient.post("/brand/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      console.log("Brand added successfully:", res.data)

      toast.success("Brand added successfully!", {
        duration: 4000,
        position: "top-right",
      })

      reset()
      setPreview(null)
      setFile(null)
      setSubmitError("")
    } catch (error) {
      console.error("Brand submit failed:", error)

      let errorMessage = "Failed to add brand"

      setSubmitError(errorMessage)

      toast.error(errorMessage, {
        duration: 5000,
        position: "top-right",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-[#023337]">
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{submitError}</div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-2">Upload Your Brand Image</h2>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="mb-4">
              <label className="w-72 h-72 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden relative group">
                {preview ? (
                  <img src={preview || "/placeholder.svg"} alt="Uploaded" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 group-hover:text-blue-500">
                    <FaCamera className="text-4xl mb-2" />
                    <p className="text-sm">Click to upload image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Brand Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="Brand Name"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            disabled={isSubmitting}
          />

          <label className="block text-sm font-medium mt-4 mb-1">Brand Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Write a detailed description of the brand"
            className="w-full border border-gray-200 px-3 py-2 rounded-lg bg-gray-50 outline-none"
            rows={4}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:shadow-lg transition-shadow duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publishing Brand..." : "Publish Brand"}
        </button>
      </div>
    </form>
  )
}

export default Brand
