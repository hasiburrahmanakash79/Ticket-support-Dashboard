import { useState, useEffect } from "react";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import useProduct from "../../../components/hook/useProduct";
import CommonModal from "../../../components/Common/CommonModal";
import apiClient from "../../../lib/api-client";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const { products, refetch } = useProduct([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editFormData, setEditFormData] = useState({
    model: "",
    description: "",
  });

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditFormData({ model: product.model, description: product.description });
    setIsEditModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await apiClient.delete(`/product/${selectedProduct._id}`);
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const confirmEdit = async () => {
    try {
      await apiClient.patch(`/product/${selectedProduct._id}`, editFormData);

      refetch();
    } catch (error) {
      console.error("Edit failed:", error);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const getFirst10Words = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.slice(0, 10).join(" ") + (words.length > 10 ? "..." : "");
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB");
  };

  console.log("products:", products);

  return (
    <div className=" border border-gray-200 p-5 rounded-xl">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-bold">All Products</h2>
        <div className="flex items-center gap-5">
          <input
            type="text"
            placeholder="Search by product model"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 text-sm border border-gray-200 rounded-full outline-none"
          />
          <Link
            to="/add_product"
            className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:shadow-lg transition-shadow duration-200 font-semibold"
          >
            Add Product
          </Link>
        </div>
      </div>

      {/* Product Table */}
      <table className="min-w-full bg-white rounded-xl">
        <thead>
          <tr className="text-sm bg-blue-50 text-left">
            <th className="p-4">Product Image</th>
            <th className="p-4">Model Name</th>
            <th className="p-4">Description</th>
            <th className="p-4">Created Date</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id} className="border-t border-gray-200">
                <td className="py-3 px-4">
                  <img
                    src={
                      product?.image
                        ? `http://157.245.9.24:5001${product.image}`
                        : "/default-image.png"
                    }
                    crossOrigin="anonymous"
                    alt="Product"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-3 px-4">{product?.model}</td>
                <td className="py-3 px-4">
                  {getFirst10Words(product?.description)}
                </td>
                <td className="py-3 px-4">{formatDate(product?.createdAt)}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center gap-6">
                    <FaRegPenToSquare
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleEdit(product)}
                    />
                    <FaRegTrashCan
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDelete(product)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-6 text-gray-400 text-center">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Modal */}
      <CommonModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="text-center space-y-4 px-4 py-3">
          <p className="text-lg font-medium">
            Are you sure you want to delete this product?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      </CommonModal>

      {/* Edit Modal */}
      <CommonModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <div className="px-4 py-3 space-y-4">
          <h2 className="text-lg font-semibold text-center">Edit Product</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Model Name</label>
            <input
              type="text"
              value={editFormData.model}
              onChange={(e) =>
                setEditFormData({ ...editFormData, model: e.target.value })
              }
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={editFormData.description}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  description: e.target.value,
                })
              }
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring"
              rows={4}
            ></textarea>
          </div>
          <div className="flex justify-end gap-4 pt-2">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={confirmEdit}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default ProductsList;
