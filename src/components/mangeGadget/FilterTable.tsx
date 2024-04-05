import { toast } from "react-toastify";
import { useDeleteManyGadgetMutation } from "../../services/otherApi/gadgetApi";
import { useState } from "react";
import TableDataMain from "./TableDataMain";
import { TCartModalData } from "../../types/cartTypes";
import CartModel from "./CartModel";

const FilterTable = ({ data }: any) => {
 

  const [cartModalData, setCartModalData] = useState<TCartModalData>({
    gadgetId: "",
    addedBy: "",
    quantity: 0,
  });

  const [delIds, setDelIds] = useState<string[]>([]);

  const [deleteManyGadget, { isLoading: deletingMany }] =
    useDeleteManyGadgetMutation();

  const handleDeleteManyGadget = async () => {
    const result: any = await deleteManyGadget(delIds);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDelIds([]);
    }
  };

  

  const handleCartModal = async (data: TCartModalData) => {
    setCartModalData(data);
    const element: any = document.getElementById("my_modal_6");
    element.showModal();
  };

  return (
    <div>
      {data?.length > 0 ? (
        <button
          onClick={() => handleDeleteManyGadget()}
          disabled={delIds.length < 1 || deletingMany}
          className="btn btn-danger bg-red-500 my-5 text-white"
        >
          {" "}
          Delete Selected
        </button>
      ) : (
        <></>
      )}
      <div className="grid lg:grid-cols-3 gap-5">
        {data?.map((d: any) => (
          <TableDataMain
            key={d?._id}
            d={d}
            handleCartModal={handleCartModal}
            delIds={delIds}
            setDelIds={setDelIds}
          ></TableDataMain>
        ))}

        <CartModel
          cartModalData={cartModalData}
          setCartModalData={setCartModalData}
        ></CartModel>
      </div>
    </div>
  );
};

export default FilterTable;
