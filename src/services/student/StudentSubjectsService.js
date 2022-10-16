import Service from '../Service'

import store from '../../store'

const resource = 'students'

export default {
  get (studentId, params = {}) {
    return Service.get(`${resource}/${studentId}/subject/`, {
      params: params,
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  // get (studentId, search = '', page = 1) {
  //   return Service.get(`${resource}/${studentId}/subject/`, {
  //     params: {
  //       search: search,
  //       page: page,
  //     },
  //     headers: {
  //       Authorization: `token ${store.getters['user/userToken']}`,
  //     },
  //   })
  // },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/subject/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  put (studentId, studentSubjectId, payload) {
    return Service.put(`${resource}/${studentId}/subject/${studentSubjectId}/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  delete (studentId, studentSubjectId) {
    return Service.delete(`${resource}/${studentId}/subject/${studentSubjectId}/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
