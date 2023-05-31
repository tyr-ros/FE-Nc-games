import { useState, useEffect } from "react";
import { fetchReviewById } from "./api";
import { dateConverter } from "./utils";
import { useParams } from "react-router-dom";

export function Review() {
  const [currentReview, setCurrentReview] = useState([]);
  const [isLoading, setLoading] = useState(true)

  const { review_id } = useParams();

  console.log(review_id);

  useEffect(() => {
    fetchReviewById(review_id).then(({ review }) => {
        setLoading(false)
      setCurrentReview(review);
    });
  }, [review_id]);

  if (isLoading){
    return <span className="loader"></span>
  }
  return (
    <main>
      <img
        className="img-container"
        src={currentReview.review_img_url}
        alt={currentReview.title}
      />
      <p>{currentReview.title}</p>
      <p>{currentReview.category}</p>
      <p>{currentReview.designer}</p>
      <p>{currentReview.owner}</p>
      <p>{currentReview.review_body}</p>
      <p>{currentReview.votes}</p>
      <p>{dateConverter(currentReview.created_at)}</p>
    </main>
  );
}
