import Service from '../../Service'

import store from '../../../store'

const resource = 'tutor/subject'

export default {
  get (subjectId) {
    return Service.get(`${resource}/${subjectId}/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  post (subjectId, payload) {
    return Service.post(`${resource}/${subjectId}/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  put (subjectId, payload) {
    return Service.put(`${resource}/${subjectId}/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  delete (subjectId) {
    return Service.delete(`${resource}/${subjectId}/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
