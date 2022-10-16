import Service from '../Service'

import store from '../../store'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/medical-information/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/medical-information/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  put (studentId, instituteId, payload) {
    return Service.put(`${resource}/${studentId}/medical-information/${instituteId}/`, payload, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
  delete (studentId, instituteId) {
    return Service.delete(`${resource}/${studentId}/medical-information/${instituteId}/`, {
      headers: {
        Authorization: `token ${store.getters['user/userToken']}`,
      },
    })
  },
}
