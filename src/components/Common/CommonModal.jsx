const CommonModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex justify-center items-center z-50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-white bg-red-500 px-3 py-1 rounded-bl-2xl rounded-tr-lg text-lg cursor-pointer"
        >
          ✕
        </button>
        <div className=" p-6">
          <h2 className="text-xl font-semibold text-center my-4">{title}</h2>

          <div className="text-sm text-gray-700 ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
