import { useNavigate } from "react-router-dom";
import { useDeleteGadgetMutation } from "../../services/otherApi/gadgetApi";
import { toast } from "react-toastify";
import { TTableData } from "../../types/gadgetTypes";
import { CiEdit } from "react-icons/ci";
import { GrDuplicate } from "react-icons/gr";
import { FaCartPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useWetherAddedQuery } from "../../services/otherApi/cartApi";

const TableDataMain = ({
  delIds,
  setDelIds,
  d,
  handleCartModal,
}: TTableData) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};

  const queries = {
    gadgetId: d?._id,
    addedBy: user?._id,
  };

  const { data: checkerData, isLoading: isChecking } =
    useWetherAddedQuery(queries);

  const navigate = useNavigate();

  const [deleteGadget, { isLoading }] = useDeleteGadgetMutation();

  const handleDelete = async (id: string) => {
    const res: any = await deleteGadget(id);
    if (res.data?.success) {
      toast.success(res.data.message);
    }
  };

  const handleSelectManyGadget = async (id: string) => {
    if (delIds.includes(id)) {
      setDelIds(delIds.filter((d) => d !== id));
    } else {
      setDelIds([...delIds, id]);
    }
  };

  if (isChecking) return <h2>Loading...</h2>;

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={d?.imgUrl} alt={d?.name} className="rounded-xl" />
      </figure>
      <div className="">
        <h2 className="text-center text-2xl py-2 flex items-center justify-center gap-5">
          <input
            type="checkbox"
            defaultChecked={delIds.includes(d?._id)}
            className={`checkbox ${user?.role === "admin" ? "" : "hidden"}`}
            onClick={() => handleSelectManyGadget(d?._id)}
          />
          <span>{d?.name}</span>
        </h2>
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Price</span>
          <span className="text-xl">{d?.price}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Quantity</span>
          <span className="text-xl">{d?.quantity}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Brand</span>
          <span className="text-xl">{d?.brand}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Category</span>
          <span className="text-xl">{d?.category}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Connectivity</span>
          <span className="text-xl">{d?.connectivity}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Model</span>
          <span className="text-xl">{d?.model}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>OS</span>
          <span className="text-xl">{d?.os}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Power Source</span>
          <span className="text-xl">{d?.powerSource}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Release year</span>
          <span className="text-xl">{d?.releaseYear}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <h2 className="text-center text-2xl py-2">Features</h2>
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Camera</span>
          <span className="text-xl">{d?.features?.camera}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Storage</span>
          <span className="text-xl">{d?.features?.storage}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Screen Size</span>
          <span className="text-xl">{d?.features?.screenSize}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <h2 className="text-center text-2xl py-2">Others</h2>
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Weight</span>
          <span className="text-xl">{d?.others?.weight}</span>
        </p>
        <hr className="w-3/5 mx-auto" />
        <p className="w-3/5 flex items-center mx-auto justify-between py-2">
          <span>Dimensions</span>
          <span className="text-xl">{d?.others?.dimensions}</span>
        </p>
      </div>
      <div className="w-3/5 mx-auto flex items-center justify-evenly mt-5 py-10">
        <button
          onClick={() =>
            handleCartModal({
              gadgetId: d?._id,
              quantity: d?.quantity,
              addedBy: user?._id,
            })
          }
          className="btn btn-accent"
          disabled={checkerData?.data === true}
        >
          <FaCartPlus className="text-white text-xl" />
        </button>
        {user?.role === "admin" || user?._id === d?.createdBy ? (
          <>
            <button
              onClick={() => navigate(`/update/${d?._id}`)}
              className="btn btn-primary"
            >
              <CiEdit className="text-white text-xl" />
            </button>

            <button
              onClick={() => navigate(`/duplicate/${d?._id}`)}
              className="btn btn-secondary text-white text-xl"
            >
              <GrDuplicate />
            </button>

            <button
              disabled={isLoading}
              onClick={() => handleDelete(d?._id)}
              className="btn btn-error"
            >
              <MdDeleteOutline className="text-white text-xl" />
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TableDataMain;
