import { baseApi } from './baseApi';

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByRestaurantId: builder.query({
      query: (restaurantId) => `/reviews?restaurantId=${restaurantId}`,
      providesTags: (result, error, restaurantId) => [
        { type: 'Review', id: 'LIST' },
        { type: 'Review', id: `RESTAURANT_${restaurantId}` },
        ...(result?.map(({ id }) => ({ type: 'Review', id })) || []),
      ],
    }),
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    addReview: builder.mutation({
      query: ({ restaurantId, ...newReview }) => ({
        url: `/review/${restaurantId}`,
        method: 'POST',
        body: newReview,
      }),
      invalidatesTags: (result, error, { restaurantId }) => [
        { type: 'Review', id: 'LIST' },
        { type: 'Review', id: `RESTAURANT_${restaurantId}` },
      ],
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, ...patch }) => ({
        url: `/review/${reviewId}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { reviewId }) => [
        { type: 'Review', id: reviewId },
        { type: 'Review', id: 'LIST' },
        // Получаем restaurantId из результата, если он есть
        ...(result?.restaurantId ? [{ type: 'Review', id: `RESTAURANT_${result.restaurantId}` }] : []),
      ],
    }),
  }),
});

export const {
  useGetReviewsByRestaurantIdQuery,
  useGetUsersQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
} = reviewsApi; 