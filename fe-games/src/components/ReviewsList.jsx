import { useState, useEffect } from "react";
import { fetchReviews } from "./api";

export function ReviewsList() {
  const [currentReviews, setCurrentReviews] = useState([]);

  useEffect(() => {
    fetchReviews()
      .then(({ reviews }) => {
        console.log();
        return reviews;
      })
      .then((reviews) => {
        setCurrentReviews(reviews);
      });
  }, []);

  return (
    <main className="review_list">
      <ul>
        {currentReviews.map((review) => {
          return (
            <li key={review.review_id} className="review">
              <img className ="img-container" src={review.review_img_url} alt={review.title} />
              <p className="title">{review.title}</p>
              <p className="owner">{review.owner}</p>
              <p className="created_at">{review.created_at}</p>
              <p className="category">{review.category}</p>
              <p className="votes">{review.votes}</p>
              <p className="comment_count">{review.comment_count}</p>
              <p className="designer">{review.designer}</p>
            
            </li>
          );
        })}
      </ul>
    </main>
  );
}
