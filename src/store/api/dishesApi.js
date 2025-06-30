import { baseApi } from './baseApi';

export const dishesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDishesByRestaurantId: builder.query({
      query: (restaurantId) => `/dishes?restaurantId=${restaurantId}`,
      providesTags: (result, error, restaurantId) => [
        { type: 'Dish', id: 'LIST' },
        { type: 'Dish', id: `RESTAURANT_${restaurantId}` },
      ],
    }),
    getDishById: builder.query({
      query: (id) => `/dish/${id}`,
      providesTags: (result, error, id) => [{ type: 'Dish', id }],
    }),
  }),
});

export const {
  useGetDishesByRestaurantIdQuery,
  useGetDishByIdQuery,
} = dishesApi; 