import React from 'react';

function Reviews({ reviews }) {
  return (
    <div className="reviews">
      <h3>Отзывы</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>{review.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews; 