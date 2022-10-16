import Service from '../Service'

import store from '../../store'

const resource = 'students'

export default {
  get (studentId, search = '', page = 1) {
    console.info(store.getters['user/userToken'])
    console.info(store.getters)
    return Service.get(`${resource}/${studentId}/`, {
      params: {
        search: search,
        page: page,
      },
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  delete (studentId) {
    return Service.delete(`${resource}/${studentId}/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
