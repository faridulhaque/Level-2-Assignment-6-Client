import CartTable from "../components/cart/CartTable";
import { useGetMyCartQuery } from "../services/otherApi/cartApi";

const CartPage = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : {};

  const { data, isLoading } = useGetMyCartQuery(user?._id);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <CartTable items={data?.data}></CartTable>
    </div>
  );
};

export default CartPage;
