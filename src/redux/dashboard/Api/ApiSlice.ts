import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CookiesServise from "../../../service/CookiesServise";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Proudcts"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1337/api" }),
  endpoints: (build) => ({
    getProudctDash: build.query({
      query: () => ({
        url: `/proudcts?populate=thumbnail,category`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }: { id: number }) => ({
                type: "Proudcts" as const,
                id,
              })),
              { type: "Proudcts", id: "LIST" },
            ]
          : [{ type: "Proudcts", id: "LIST" }],
    }),
    deleteProudctDash: build.mutation({
      query: (id) => ({
        url: `/proudcts/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${CookiesServise.get("jwt")}`,
        },
      }),
      invalidatesTags: [{ type: "Proudcts", id: "LIST" }],
    }),
    updateProudctDash: build.mutation({
      query: ({ id, body }) => {
        return {
          url: `/proudcts/${id}`,
          method: "PUT",
          body,
          headers: {
            Authorization: `Bearer ${CookiesServise.get("jwt")}`,
          },
        };
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getProudctDash", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Proudcts", id: "LIST" }],
    }),
    createProudctDash: build.mutation({
      query: (body) => ({
        url: "/proudcts?populate=thumbnail,category",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${CookiesServise.get("jwt")}`,
        },
      }),
      invalidatesTags: [{ type: "Proudcts", id: "LIST" }],
    }),
    getMyDataUser: build.query({
      query() {
        return {
          url: "/users/me",
          headers: {
            Authorization: `Bearer ${CookiesServise.get("jwt")}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetProudctDashQuery,
  useDeleteProudctDashMutation,
  useUpdateProudctDashMutation,
  useCreateProudctDashMutation,
  useGetMyDataUserQuery,
} = apiSlice;
