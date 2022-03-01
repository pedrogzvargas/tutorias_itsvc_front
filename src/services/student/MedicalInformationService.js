import Service from '../Service'
import cookie from 'vue-cookies'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/medical-information/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/medical-information/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  put (studentId, instituteId, payload) {
    return Service.put(`${resource}/${studentId}/medical-information/${instituteId}/`, payload, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
  delete (studentId, instituteId) {
    return Service.delete(`${resource}/${studentId}/medical-information/${instituteId}/`, {
      headers: {
        Authorization: `token ${cookie.get('token')}`,
      },
    })
  },
}
