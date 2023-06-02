import { useState, useEffect } from "react";
import {
  fetchReviewById,
  fetchCommentsByReviewId,
  changeReviewVotes,
  postNewComment
} from "./api";
import { dateConverter } from "./utils";
import { useParams } from "react-router-dom";

export function Review() {
  const [currentReview, setCurrentReview] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [currentComments, setCurrentComments] = useState([]);
  const [err, setErr] = useState(null);
  const [upvoted, setHasUpVoted] = useState(false);
  const [downvoted, setHasDownVoted] = useState(false);

  const { review_id } = useParams();
  let vote = 0;
   

  useEffect(() => {
    fetchReviewById(review_id).then(({ review }) => {
      setLoading(false);
      setCurrentReview(review);
    });
    fetchCommentsByReviewId(review_id).then(({ comments }) => {
      setCurrentComments(comments);
    });
  }, [review_id]);

  const upVote = (review_id) => {
    upvoted ? (vote = -1) : (vote = 1);
    setCurrentReview((currentReview) => {
      if (!upvoted) {
        setHasUpVoted(true);
        return { ...currentReview, votes: currentReview.votes + vote };
      } else {
        setHasUpVoted(false);
        return { ...currentReview, votes: currentReview.votes + vote };
      }
    });
    setErr(null);
    changeReviewVotes(review_id, vote).catch((err) => {
      setErr("Something went wrong, please try again");
      return { ...currentReview, votes: currentReview.votes + vote };
    });
  };

  const downVote = (review_id) => {
    downvoted ? (vote = 1) : (vote = -1);
    setCurrentReview((currentReview) => {
      if (!downvoted) {
        setHasDownVoted(true);
        return { ...currentReview, votes: currentReview.votes + vote };
      } else {
        setHasDownVoted(false);
        return { ...currentReview, votes: currentReview.votes + vote };
      }
    });
    setErr(null);
    changeReviewVotes(review_id, vote).catch((err) => {
      setErr("Something went wrong, please try again");
      return { ...currentReview, votes: currentReview.votes + vote };
    });
  };

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
        {err ? <p>{err}</p> : null}
         
        <button className={upvoted ? "voted" : "notVoted"} onClick={() => upVote(currentReview.review_id)} >
          <span aria-label="upvote for this review">👍</span>
        </button>
        <button className={downvoted ? "downvoted" : "notVoted"} onClick={() => downVote(currentReview.review_id)} >
          <span aria-label="downvote for this review">👎</span>
        </button>
        <p className="review_votes"></p> Votes: {currentReview.votes}
        <p>{dateConverter(currentReview.created_at)}</p>
        <ul className="comment_list">
          {currentComments.map((comment) => {
            return (
              <li key={comment.comment_id} className="comment">
                <p className="comment_body">{comment.body}</p>
                <p className="comment_author">by {comment.author}</p>

                <p className="comment_votes">Votes: {comment.votes}</p>
                <p className="comment_created_at">
                  Posted on {dateConverter(comment.created_at)}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
