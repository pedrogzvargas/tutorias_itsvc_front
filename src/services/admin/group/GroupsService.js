import Service from '../../Service'

import store from '../../../store'

const resource = 'tutor/group'

export default {
  get (search = '', page = 1) {
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
