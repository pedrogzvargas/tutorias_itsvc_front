import Service from '../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/institute/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/institute/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  put (studentId, instituteId, payload) {
    return Service.put(`${resource}/${studentId}/institute/${instituteId}/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  delete (studentId, instituteId) {
    return Service.delete(`${resource}/${studentId}/institute/${instituteId}/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
