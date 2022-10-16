import Service from '../../Service'

import store from '../../../store'

const resource = 'tutor'

export default {
  get (tutorId) {
    return Service.get(`${resource}/${tutorId}/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  post (tutorId, payload) {
    return Service.post(`${resource}/${tutorId}/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  put (tutorId, payload) {
    return Service.put(`${resource}/${tutorId}/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  delete (tutorId) {
    return Service.delete(`${resource}/${tutorId}/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
