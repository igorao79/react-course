import { baseApi } from './baseApi';

export const restaurantsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRestaurants: builder.query({
      query: () => '/restaurants',
      providesTags: ['Restaurant'],
    }),
    getRestaurantById: builder.query({
      query: (id) => `/restaurant/${id}`,
      providesTags: (result, error, id) => [{ type: 'Restaurant', id }],
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useGetRestaurantByIdQuery,
} = restaurantsApi; 