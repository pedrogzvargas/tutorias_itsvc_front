import Service from '../Service'

const resource = 'students'

export default {
  get (studentId) {
    return Service.get(`${resource}/${studentId}/income/`)
  },
  post (studentId, payload) {
    return Service.post(`${resource}/${studentId}/income/`, payload)
  },
  put (studentId, payload) {
    return Service.put(`${resource}/${studentId}/income/`, payload)
  },
}
