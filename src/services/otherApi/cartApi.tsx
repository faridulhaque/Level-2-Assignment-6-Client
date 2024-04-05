import { apiSlice } from "../rootApi/apiSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    wetherAdded: builder.query({
      query: (body) => {
        const url = `/api/cart/is-added?gadgetId=${body?.gadgetId}&addedBy=${body?.addedBy}`;
        const method = "GET";

        return {
          url,
          method,
        };
      },
      providesTags: ["cart"],
    }),

    getMyCart: builder.query({
      query: (id) => {
        const url = `/api/cart/${id}`;
        const method = "GET";

        return {
          url,
          method,
        };
      },
      providesTags: ["cart"],
    }),

    addToCart: builder.mutation({
      query: (body) => {
        const url = `/api/cart/create`;
        const method = "POST";

        return {
          url,
          method,
          body,
        };
      },
      invalidatesTags: ["cart"],
    }),

    manageQuantity: builder.mutation({
      query: (body) => {
        const url = `/api/cart/manage-quantity`;
        const method = "PUT";

        return {
          url,
          method,
          body,
        };
      },
      invalidatesTags: ["cart"],
    }),

    removeCart: builder.mutation({
      query: (id) => {
        const url = `/api/cart/remove/${id}`;
        const method = "PUT";

        return {
          url,
          method,
        };
      },
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useWetherAddedQuery,
  useGetMyCartQuery,
  useManageQuantityMutation,
  useRemoveCartMutation
} = cartApi;
