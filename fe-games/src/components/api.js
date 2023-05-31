import axios from 'axios'


const gameApi = axios.create({ baseURL: 'https://games-mqx7.onrender.com/api/' })

export function fetchReviews() {
    return gameApi
        .get(`/reviews`)
        .then((res) => {
            return res.data
        })
        .catch((err) => console.log(err, "<--- fetch all reviews"))
}