import React, { useState } from 'react';
import { createReview } from '../api/reviewApi';
import '../styles/ReviewPage.css';

const ReviewPage = ({ eventId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

 

  const handleSubmit = async (e) => {
     const userId = JSON.parse(localStorage.getItem('userId'));
     
    e.preventDefault();

    if (!rating) {
      alert('Please select a rating');
      return;
    }

    const reviewData = {
      userId,
      eventId,
      rating,
      comment,
    };

    try {
      await createReview(reviewData);
      setMessage('Review submitted successfully!');
      setRating(0);
      setComment('');
    } catch (err) {
      console.error('Review submission error:', err);
      setMessage('Failed to submit review.');
    }
  };

  return (
    <div className="review-form">
      <h2> Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                className={`star ${starValue <= (hoverRating || rating) ? 'filled' : ''}`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            );
          })}
        </div>
        <textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ReviewPage;
