import Axios from 'axios'

const axios = Axios.create(
  {
    baseURL: 'http://' + process.env.VUE_GIPHY_API_HOST
  }
)

function getTrending (resolve, reject) {
  return new Promise((resolve, reject) => {
    axios.get('/')
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
          q: keywords
        }
      })
      .then(res => resolve(res))
      .catch(err => reject(err))
  }
  )
}

export default {getTrending, search}
