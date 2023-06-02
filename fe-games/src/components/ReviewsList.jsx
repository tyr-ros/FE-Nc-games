
import { useState, useEffect } from "react";
import { fetchReviews } from "./api";
import { dateConverter } from "./utils";
import { Link } from "react-router-dom";

export function ReviewsList() {
  const [currentReviews, setCurrentReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews().then(({ reviews }) => {
      setLoading(false);
      setCurrentReviews(reviews);
      return reviews;
    });
    
  }, []);

  if (isLoading) {
    return <p className="loader">Loading...</p>;
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
              <Link to={`/review/${review.review_id}`}>
                {" "}
                <h1 className="title"> {review.title}</h1>
              </Link>
              <p className="owner">Reviewed by {review.owner}</p>
              <p className="created_at">
                Review created on {dateConverter(review.created_at)}
              </p>
              <p className="category">{review.category}</p>
              <p className="votes">Votes: {review.votes}</p>
              <p className="comment_count">Comments {review.comment_count}</p>
              <p className="designer">Game designed by {review.designer}</p>
            </li>
          );
        })}
        
      </ul>
    </main>
  );
}

