import { useEffect } from "react";
import { toast } from "react-toastify";
import { TCartModal } from "../../types/cartTypes";
import { useAddToCartMutation } from "../../services/otherApi/cartApi";

const CartModel = ({ cartModalData, setCartModalData }: TCartModal) => {
  const [addToCart, { isLoading }] = useAddToCartMutation();

  useEffect(() => {
    const closeModalOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCartModalData({
          addedBy: "",
          gadgetId: "",
          quantity: 0,
        });
      }
    };

    document.addEventListener("keydown", closeModalOnEscape);

    return () => {
      document.removeEventListener("keydown", closeModalOnEscape);
    };
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const quantity = e.target.quantity.value;
    if (quantity < 1) {
      return toast.error("Please provide a valid quantity");
    }
    if (quantity > cartModalData?.quantity) {
      return toast.error(`You don't have ${quantity} items to sell`);
    }
    const data = {
      cartItem: {
        gadgetId: cartModalData.gadgetId,
        quantity,
      },
      addedBy: cartModalData.addedBy,
    };
    const result: any = await addToCart(data);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      e.target.reset();
      closeModal();
    }
  };

  const closeModal = () => {
    setCartModalData({
      gadgetId: "",
      quantity: 0,
      addedBy: "",
    });
    const element: any = document.getElementById("my_modal_6");
    element.close();
  };

  return (
    <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add to cart!</h3>
        <div className="">
          <form onSubmit={handleSubmit}>
            {/* Name */}

            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
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

export default CartModel;
