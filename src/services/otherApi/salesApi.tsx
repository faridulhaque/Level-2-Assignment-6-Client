import { TSaleParam } from "../../types/salesTypes";
import { apiSlice } from "../rootApi/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (data) => {
        const url = `/api/sales/create/${data?.addedBy}`;
        const method = "POST";

        return {
          url,
          method,
          body: data?.buyer,
        };
      },
      invalidatesTags: ["sales", "cart"],
    }),

    getSales: builder.query({
      query: (param: TSaleParam) => {
        const url = `/api/sales/${param}`;
        const method = "GET";

        return {
          url,
          method,
        };
      },
      providesTags: ["sales"],
    }),
  }),
});

export const { useCreateSaleMutation, useGetSalesQuery } = authApi;
