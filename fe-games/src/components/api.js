import axios from 'axios'


const gameApi = axios.create({ baseURL: 'https://games-mqx7.onrender.com/api/' })

export function fetchReviews() {
    return gameApi
        .get(`/reviews`)
        .then((res) => {
            return res.data
        })
        .catch((err) => { console.log(err, "<--- fetch all reviews") })
}

export function fetchReviewById(id) {
    return gameApi
        .get(`/reviews/${id}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err, "<-- fetchReviewById");
        })
}

export function fetchCommentsByReviewId(id){
    return gameApi
        .get(`/reviews/${id}/comments`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            console.log(err, "<-- fetchCommentsByReviewId");
        })
}

export function changeReviewVotes(id, vote){
    const voteBody = {
        inc_votes: vote
    }
    return gameApi
    .patch(`/reviews/${id}`, voteBody)
    .then((res)=>{
        return res.data
    })
}
