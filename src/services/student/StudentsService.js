import Service from '../Service'

import store from '../../store'

const resource = 'students'

export default {
  get (search = '', page = 1) {
    console.info(store.getters['user/userToken'])
    console.info(store.getters)
    return Service.get(`${resource}/`, {
      params: {
        search: search,
        page: page,
      },
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  post (payload) {
    return Service.post(`${resource}/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
