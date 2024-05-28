interface ModalFooterProps {
  closeBtnName: string;
  submitBtnName: string;
  onCancel: () => void;
}

export default function ModalFooter({
  closeBtnName,
  submitBtnName,
  onCancel
}: ModalFooterProps) {
  return (
    <div className="flex items-center justify-end mt-6">
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={onCancel}
      >
        {closeBtnName}
      </button>
      <button
        className="bg-green-600 text-white hover:bg-green-500  hover:text-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="submit"
      >
        {submitBtnName}
      </button>
    </div>
  );
}
