
import { useState, useEffect } from "react";
import { fetchReviewById, fetchCommentsByReviewId } from "./api";
import { dateConverter } from "./utils";
import { useParams } from "react-router-dom";

export function Review() {
  const [currentReview, setCurrentReview] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentComments, setCurrentComments] = useState([]);

  const { review_id } = useParams();

  useEffect(() => {
    fetchReviewById(review_id).then(({ review }) => {
      setLoading(false);
      setCurrentReview(review);
    });
    fetchCommentsByReviewId(review_id).then(({ comments }) => {
      setCurrentComments(comments);
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
        <ul className="comment_list">
          {currentComments.map((comment) => {
            return (
              <li key={comment.comment_id} className="comment">
                <p className="comment_body">{comment.body}</p>
                <p className="comment_author">by {comment.author}</p>
                <p className="comment_votes">Votes: {comment.votes}</p>
                <p className="comment_created_at">Posted on {dateConverter(comment.created_at)}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}