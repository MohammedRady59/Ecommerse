import { Grid } from "@chakra-ui/react";
import ProudctCard from "../Components/ProudctCard";
import { useAuthQuery } from "../Hooks/useAushQuery";
import { IProudct } from "../Interface";
import ProudctSkleton from "../Components/UI/ProudctSkleton";

function Proudcts() {
  const { isPending, data } = useAuthQuery({
    queryKey: ["proudcts"],
    url: "/proudcts?populate=thumbnail,category",
  });
  if (isPending)
    return (
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px,1fr))"
        gap={6}
        margin={30}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <ProudctSkleton key={idx} />
        ))}
      </Grid>
    );
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(300px,1fr))"
      gap={6}
      margin={30}
    >
      {data.data.map((el: IProudct) => (
        <ProudctCard proudctDetail={el} key={el.id} />
      ))}
    </Grid>
  );
}

export default Proudcts;
