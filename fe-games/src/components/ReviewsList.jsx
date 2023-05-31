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

  function dateConverter(reviewDate) {
    const date = new Date(reviewDate);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
    const nameDate = `${dayName} ${monthName} ${year}`;
    return nameDate;
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
