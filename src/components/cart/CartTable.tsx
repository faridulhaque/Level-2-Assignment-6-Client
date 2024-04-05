import { toast } from "react-toastify";
import {
  useManageQuantityMutation,
  useRemoveCartMutation,
} from "../../services/otherApi/cartApi";
import SaleModal from "../mangeGadget/SaleModal";

const CartTable = ({ items }: any) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};

  const [manageQuantity, { isLoading }] = useManageQuantityMutation();

  const [removeCart, { isLoading: removing }] = useRemoveCartMutation();

  let finalPrice = 0;
  items?.map((item: any) => {
    const total = item?.quantity * item?.gadgetId?.price;
    finalPrice = finalPrice + total;
    return finalPrice;
  });

  const handleSaleModal = async () => {
    const element: any = document.getElementById("my_modal_5");
    element.showModal();
  };

  const handleManageQuantity = async (
    itemId: string,
    action: string,
    currentQuantity: number
  ) => {
    const data = {
      addedBy: user?._id,
      action,
      itemId,
      currentQuantity,
    };

    await manageQuantity(data);
  };

  const handleRemoveCart = async (id: string) => {
    const result: any = await removeCart(id);
    console.log(result);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <div className="overflow-x-auto w-11/12 mx-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <td>Price</td>
            <td>Quantity</td>
            <td>Total</td>
          </tr>
        </thead>
        <tbody>
          {items?.map((item: any) => (
            <tr key={item?._id}>
              <td>{item?.gadgetId?.name}</td>
              <td>{item?.gadgetId?.price}</td>
              <td>
                <button
                  onClick={() =>
                    handleManageQuantity(item?._id, "DECREMENT", item?.quantity)
                  }
                  disabled={item?.quantity === 1 || isLoading}
                  className="btn btn-error"
                >
                  DEC
                </button>

                <span className="mx-3">{item?.quantity}</span>
                <button
                  disabled={
                    item?.quantity === item?.gadgetId?.quantity || isLoading
                  }
                  onClick={() =>
                    handleManageQuantity(item?._id, "INCREMENT", item?.quantity)
                  }
                  className="btn btn-primary"
                >
                  INC
                </button>
              </td>
              <td>{item?.gadgetId?.price * item?.quantity}</td>
            </tr>
          ))}
          <tr>
            <td>
              <button
                disabled={!items?.length || removing}
                onClick={() => handleRemoveCart(user?._id)}
                className="btn btn-error text-white"
              >
                Remove
              </button>
            </td>
            <td>
              <button
                disabled={!items?.length}
                onClick={() => handleSaleModal()}
                className="btn btn-warning text-white"
              >
                Checkout
              </button>
            </td>
            <td></td>
            <td className="">Final Total</td>
            <td className="text-bold text-3xl">$ {finalPrice}</td>
          </tr>
        </tbody>
      </table>
      <SaleModal addedBy={user?._id}></SaleModal>
    </div>
  );
};

export default CartTable;
