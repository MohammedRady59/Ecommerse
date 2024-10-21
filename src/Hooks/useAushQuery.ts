import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config";
import { AxiosRequestConfig } from "axios";

interface IProps {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}
export function useAuthQuery({ queryKey, url, config }: IProps) {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const { data } = await axiosInstance.get(`${url}`, config);
      return data;
    },
  });
}
