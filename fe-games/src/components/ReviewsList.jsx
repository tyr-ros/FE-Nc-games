import { useState, useEffect } from "react";
import { fetchReviews } from "./api";
import { dateConverter } from "./utils";
export function ReviewsList() {
  const [currentReviews, setCurrentReviews] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews().then(({ reviews }) => {
      setLoading(false)
      setCurrentReviews(reviews);
      return reviews;
    });
  }, []);

if (isLoading){
  return <span className="loader"></span>
}

  return (
    <main className="review_list">
      
      <ul>
        {currentReviews.map((review) => {
          return (
            <li key={review.review_id} className="review">
              <img
                className="img-container"
                src={review.review_img_url}
                alt={review.title}
              />
              <p className="title">{review.title}</p>
              <p className="owner">Reviewed by {review.owner}</p>
              <p className="created_at">
                Review created on {dateConverter(review.created_at)}
              </p>
              <p className="category">{review.category}</p>
              <p className="votes">Upvotes are currently {review.votes}</p>
              <p className="comment_count">Comments {review.comment_count}</p>
              <p className="designer">Game designed by {review.designer}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
