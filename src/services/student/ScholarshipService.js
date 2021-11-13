import Service from '../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/scholarship/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/scholarship/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/scholarship/`, payload)
  },
}
