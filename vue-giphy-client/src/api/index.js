import Axios from 'axios'

const axios = Axios.create(
  {
    baseURL: 'http://api.giphy.com/v1/gifs/'
  }
)

function getTrending (resolve, reject) {
  return new Promise((resolve, reject) => {
    axios.get(
      'trending',
      {
        params: {
          api_key: process.env.GIPHY_API_KEY,
          limit: 5,
          fmt: 'json'
        }
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
  }
  )
}

function search (keywords) {
  return new Promise((resolve, reject) => {
    axios.get(
      'search',
      {
        params: {
          api_key: process.env.GIPHY_API_KEY,
          limit: 5,
          q: keywords,
          fmt: 'json'
        }
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
  }
  )
}

export default {getTrending, search}
