import { toast } from "react-toastify";
import { useCreateSaleMutation } from "../../services/otherApi/salesApi";

const SaleModal = ({ addedBy }: any) => {
  const [addSale, { isLoading }] = useCreateSaleMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.buyerName.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;
    const buyer = {
      name,
      phone,
      address,
    };
    const data = {
      buyer,
      addedBy,
    };

    const result: any = await addSale(data);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
    } else {
      toast.error("something went wrong");
    }
  };

  const closeModal = () => {
    const element: any = document.getElementById("my_modal_5");
    element.close();
  };

  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add as sold!</h3>
        <div className="">
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="buyerName" className="block text-sm font-medium">
                Buyer Name
              </label>
              <input
                type="text"
                id="buyerName"
                name="buyerName"
                className="mt-1 p-2 w-full border rounded-md bg-gray-600 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="mt-1 p-2 w-full border rounded-md bg-gray-600 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="mt-1 p-2 w-full border rounded-md bg-gray-600 text-black"
                required
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-secondary"
            >
              Submit
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="btn btn-primary ml-5"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SaleModal;
