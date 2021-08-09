import Service from '../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/address/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/address/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/address/`, payload)
  },
}
