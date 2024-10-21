import toast from "react-hot-toast";
import { IProudct } from "../Interface";

export function addTocartandCheck(allCart: IProudct[], proudct: IProudct) {
  const exit = allCart.find((el) => el.id === proudct.id);
  if (exit) {
    toast.success("This Item Is exists , the quantity will be increase", {
      position: "bottom-center",
      duration: 2000,
      style: {
        backgroundColor: "black",
        color: "white",
        width: "fit-content",
      },
    });
    return allCart.map((el) =>
      el.id === proudct.id ? { ...el, qtw: (el.qtw ?? 0) + 1 } : el
    );
  }
  toast.success(" Item Add To Cart  ", {
    position: "bottom-center",
    duration: 2000,
    style: {
      backgroundColor: "black",
      color: "white",
      width: "fit-content",
    },
  });
  return [...allCart, { ...proudct, qtw: 1 }];
}
