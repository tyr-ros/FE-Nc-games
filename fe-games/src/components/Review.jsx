import { useState, useEffect } from "react";
import { fetchReviewById } from "./api";
import { dateConverter } from "./utils";
import { useParams } from "react-router-dom";

export function Review() {
  const [currentReview, setCurrentReview] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { review_id } = useParams();

  useEffect(() => {
    fetchReviewById(review_id).then(({ review }) => {
      setLoading(false);
      setCurrentReview(review);
    });
  }, [review_id]);

  if (isLoading) {
    return <p className="loader">Loading...</p>;
  }
  return (
    <main className="review_list">
      <section className="review">
        <img
          className="img-container"
          src={currentReview.review_img_url}
          alt={currentReview.title}
        />
        <h1>{currentReview.title}</h1>
        <p>{currentReview.category}</p>
        <p>Designed by {currentReview.designer}</p>
        <p>{currentReview.owner}</p>
        <p>{currentReview.review_body}</p>
        <p>Upvotes are currently {currentReview.votes}</p>
        <p>{dateConverter(currentReview.created_at)}</p>
      </section>
    </main>
  );
}
