import moment from "moment";
import { useGetSalesQuery } from "../../services/otherApi/salesApi";

const SaleTable = ({ saleParam }: any) => {
  const { data, isLoading } = useGetSalesQuery(saleParam);

  if (isLoading) return <></>;

  const sales = data?.data;
  return (
    <div className="overflow-x-auto ">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Buyer</th>
            <th>Buyer contact</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((s: any) => (
            <tr key={s._id}>
              <th> {moment(s?.createdAt).format("YYYY-MM-DD [at] hh:mm A")}</th>

              <td>{s?.buyer?.name}</td>
              <td>{s?.buyer?.phone}</td>
            </tr>
          ))}

          {/* row 2 */}
        </tbody>
      </table>
    </div>
  );
};

export default SaleTable;
