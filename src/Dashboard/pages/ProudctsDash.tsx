import { useGetProudctDashQuery } from "../../redux/dashboard/Api/ApiSlice";
import DashTable from "../components/DashTable";
import TableSkelton from "../components/TableSkelton";

function ProudctsDash() {
  const { isLoading, data } = useGetProudctDashQuery(undefined);
  if (isLoading) return <TableSkelton />;
  return (
    <div>
      <DashTable details={data.data} />
    </div>
  );
}

export default ProudctsDash;
